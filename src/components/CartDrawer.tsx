import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Bike, Store, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types/restaurant';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartId: string, delta: number) => void;
  onRemoveItem: (cartId: string) => void;
  onClearCart: () => void;
  onProceedToCheckout: (orderSummary: {
    items: CartItem[];
    subtotal: number;
    discount: number;
    deliveryFee: number;
    tax: number;
    total: number;
    orderType: 'pickup' | 'delivery';
    notes: string;
  }) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout
}) => {
  const [orderType, setOrderType] = useState<'pickup' | 'delivery'>('pickup');
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [orderNotes, setOrderNotes] = useState('');

  if (!isOpen) return null;

  // Pricing math
  const subtotal = cartItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const discount = promoApplied ? subtotal * 0.20 : 0;
  const deliveryFee = orderType === 'delivery' ? (subtotal >= 45 ? 0 : 4.50) : 0;
  const tax = (subtotal - discount) * 0.0825; // standard California local tax
  const compostFee = cartItems.length > 0 ? 0.50 : 0;
  const finalTotal = Math.max(0, subtotal - discount + deliveryFee + tax + compostFee);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'CLEAN20') {
      setPromoApplied(true);
      setPromoError('');
    } else {
      setPromoError('Invalid code. Try "CLEAN20" for 20% off.');
    }
  };

  const handleCheckoutClick = () => {
    onProceedToCheckout({
      items: cartItems,
      subtotal,
      discount,
      deliveryFee,
      tax,
      total: finalTotal,
      orderType,
      notes: orderNotes
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      
      {/* Backdrop click to dismiss */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10">
        
        {/* Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-[#FAF9F5]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-emerald-800" />
            <h2 className="font-display text-lg font-bold text-stone-900">Your Harvest Bag</h2>
            <span className="text-xs text-stone-500 tabular-nums">({cartItems.length} items)</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200/50 transition-colors"
            aria-label="Close bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pickup vs Delivery Selector */}
        <div className="p-4 border-b border-stone-100 bg-stone-50/50">
          <div className="grid grid-cols-2 gap-2 p-1 bg-stone-200/70 rounded-xl">
            <button
              onClick={() => setOrderType('pickup')}
              className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                orderType === 'pickup'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Store className="w-3.5 h-3.5 text-emerald-800" />
              <span>Express Pickup (15m)</span>
            </button>
            <button
              onClick={() => setOrderType('delivery')}
              className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                orderType === 'delivery'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Bike className="w-3.5 h-3.5 text-emerald-800" />
              <span>Eco-Courier (30m)</span>
            </button>
          </div>

          {orderType === 'delivery' && (
            <div className="mt-2 text-[11px] text-stone-600 flex items-center justify-between">
              <span>{subtotal >= 45 ? '🎉 Free delivery unlocked!' : 'Add $' + (45 - subtotal).toFixed(2) + ' for free delivery'}</span>
              <span className="font-bold text-emerald-800 tabular-nums">{subtotal >= 45 ? 'FREE' : '$4.50'}</span>
            </div>
          )}
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <ShoppingBag className="w-10 h-10 text-stone-300 mx-auto" />
              <p className="text-sm font-semibold text-stone-800">Your bag is currently empty</p>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Explore our seasonal bowls, crisp salads, and cold-pressed juices to begin.
              </p>
              <button
                onClick={onClose}
                className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 rounded-lg hover:bg-emerald-100"
              >
                Start Ordering
              </button>
            </div>
          ) : (
            cartItems.map(item => (
              <div
                key={item.cartId}
                className="p-3.5 rounded-xl border border-stone-200/90 bg-white space-y-3 shadow-xs"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h3 className="text-xs font-bold text-stone-900">{item.menuItem.name}</h3>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      {item.menuItem.calories * item.quantity} kcal total
                    </p>

                    {/* Customization specs */}
                    {item.selectedCustomizations && Object.keys(item.selectedCustomizations).length > 0 && (
                      <div className="mt-1 text-[11px] text-emerald-800 bg-emerald-50/70 p-1.5 rounded space-y-0.5">
                        {Object.entries(item.selectedCustomizations).map(([key, val]) => (
                          <div key={key} className="truncate">
                            <span className="font-medium text-stone-600">{key}:</span> {val}
                          </div>
                        ))}
                      </div>
                    )}

                    {item.specialInstructions && (
                      <div className="mt-1 text-[11px] text-stone-500 italic">
                        Note: {item.specialInstructions}
                      </div>
                    )}
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-bold font-display text-stone-900 tabular-nums">
                      ${(item.unitPrice * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Counter & delete */}
                <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                  <div className="flex items-center gap-2 bg-stone-100 rounded-lg p-0.5 border border-stone-200">
                    <button
                      onClick={() => onUpdateQuantity(item.cartId, -1)}
                      className="p-1 text-stone-600 hover:text-stone-900 rounded"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-6 text-center text-xs font-bold tabular-nums text-stone-800">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.cartId, 1)}
                      className="p-1 text-stone-600 hover:text-stone-900 rounded"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.cartId)}
                    className="text-stone-400 hover:text-rose-600 p-1 rounded transition-colors text-xs flex items-center gap-1"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span className="text-[11px]">Remove</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer calculation & checkout */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-stone-200 bg-[#FAF9F5] space-y-4">
            
            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} className="space-y-1">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400" />
                  <input
                    type="text"
                    value={promoCode}
                    onChange={e => setPromoCode(e.target.value)}
                    placeholder="Promo code (e.g. CLEAN20)"
                    disabled={promoApplied}
                    className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg text-stone-900 uppercase placeholder:normal-case focus:outline-none focus:ring-1 focus:ring-emerald-700"
                  />
                </div>
                <button
                  type="submit"
                  disabled={promoApplied || !promoCode.trim()}
                  className="px-3 py-1.5 text-xs font-semibold text-stone-800 bg-stone-200 hover:bg-stone-300 disabled:opacity-50 rounded-lg transition-colors whitespace-nowrap"
                >
                  {promoApplied ? 'Applied' : 'Apply'}
                </button>
              </div>
              {promoApplied && (
                <div className="text-[11px] text-emerald-800 font-medium">
                  ✓ 20% Clean Wellness discount applied!
                </div>
              )}
              {promoError && (
                <div className="text-[11px] text-rose-600">
                  {promoError}
                </div>
              )}
            </form>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-stone-600 tabular-nums">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-stone-900">${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-800">
                  <span>Promo Discount (20%)</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              {orderType === 'delivery' && (
                <div className="flex justify-between">
                  <span>Eco-Courier Delivery</span>
                  <span>{deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Local Tax (8.25%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>100% Plant Compost Packaging</span>
                <span>${compostFee.toFixed(2)}</span>
              </div>
              <div className="pt-2 border-t border-stone-200 flex justify-between text-sm font-bold text-stone-900">
                <span>Total Amount</span>
                <span className="font-display text-base text-emerald-950">${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Kitchen Notes */}
            <input
              type="text"
              value={orderNotes}
              onChange={e => setOrderNotes(e.target.value)}
              placeholder="Delivery door code or cutlery preference..."
              className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg text-stone-900 placeholder:text-stone-400"
            />

            {/* Checkout Button */}
            <button
              onClick={handleCheckoutClick}
              className="w-full py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-emerald-900 hover:bg-emerald-800 transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Proceed to Checkout</span>
              <span className="opacity-75">·</span>
              <span className="tabular-nums">${finalTotal.toFixed(2)}</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-400 text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>Zero-Contact Fresh Hand-off & Carbon Neutral</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
