import React, { useState } from 'react';
import { X, CreditCard, ShieldCheck, CheckCircle2, Bike, Store } from 'lucide-react';
import { CartItem } from '../types/restaurant';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderSummary: {
    items: CartItem[];
    subtotal: number;
    discount: number;
    deliveryFee: number;
    tax: number;
    total: number;
    orderType: 'pickup' | 'delivery';
    notes: string;
  } | null;
  onOrderPlaced: (orderData: any) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  orderSummary,
  onOrderPlaced,
}) => {
  if (!isOpen || !orderSummary) return null;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [apt, setApt] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple_pay' | 'counter'>('card');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;
    if (orderSummary.orderType === 'delivery' && !address) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const orderId = `VRD-${Math.floor(10000 + Math.random() * 90000)}`;
      onOrderPlaced({
        orderId,
        customer: { name, email, phone, address, apt },
        orderSummary,
        paymentMethod,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        estimatedTime: orderSummary.orderType === 'pickup' ? '15–20 minutes' : '25–35 minutes',
      });
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      
      <div className="relative bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-[#FAF9F5]">
          <div>
            <h3 className="font-display text-lg font-bold text-stone-900">
              Clean Checkout
            </h3>
            <p className="text-xs text-stone-500 flex items-center gap-1.5 mt-0.5">
              {orderSummary.orderType === 'pickup' ? (
                <>
                  <Store className="w-3.5 h-3.5 text-emerald-800" />
                  <span>Express Storefront Pickup</span>
                </>
              ) : (
                <>
                  <Bike className="w-3.5 h-3.5 text-emerald-800" />
                  <span>Eco-Courier Doorstep Delivery</span>
                </>
              )}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Checkout Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          {/* Customer Details */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
              Contact Information
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-stone-700">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Taylor Vance"
                  className="w-full mt-1 px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-stone-700">Phone Number (for SMS status)</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="(415) 555-0149"
                  className="w-full mt-1 px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-stone-700">Email Address (for receipt)</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="taylor@example.com"
                className="w-full mt-1 px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
            </div>
          </div>

          {/* Delivery Address if delivery */}
          {orderSummary.orderType === 'delivery' && (
            <div className="space-y-3 pt-2 border-t border-stone-100">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
                Delivery Address
              </span>
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="text-[11px] font-semibold text-stone-700">Street Address</label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    placeholder="450 Ocean View Blvd"
                    className="w-full mt-1 px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-stone-700">Apt / Suite</label>
                  <input
                    type="text"
                    value={apt}
                    onChange={e => setApt(e.target.value)}
                    placeholder="Ste 2B"
                    className="w-full mt-1 px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Payment Method Selector */}
          <div className="space-y-2 pt-2 border-t border-stone-100">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
              Payment Method
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-xl border text-xs font-medium text-left flex flex-col justify-between ${
                  paymentMethod === 'card'
                    ? 'border-emerald-800 bg-emerald-50 text-emerald-950 font-bold'
                    : 'border-stone-200 text-stone-700 hover:border-stone-300'
                }`}
              >
                <CreditCard className="w-4 h-4 mb-2 text-stone-700" />
                <span>Credit / Debit</span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('apple_pay')}
                className={`p-3 rounded-xl border text-xs font-medium text-left flex flex-col justify-between ${
                  paymentMethod === 'apple_pay'
                    ? 'border-emerald-800 bg-emerald-50 text-emerald-950 font-bold'
                    : 'border-stone-200 text-stone-700 hover:border-stone-300'
                }`}
              >
                <div className="font-bold text-sm mb-2">Pay</div>
                <span>Apple Pay</span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('counter')}
                className={`p-3 rounded-xl border text-xs font-medium text-left flex flex-col justify-between ${
                  paymentMethod === 'counter'
                    ? 'border-emerald-800 bg-emerald-50 text-emerald-950 font-bold'
                    : 'border-stone-200 text-stone-700 hover:border-stone-300'
                }`}
              >
                <Store className="w-4 h-4 mb-2 text-stone-700" />
                <span>Pay at Counter</span>
              </button>
            </div>
          </div>

          {/* Summary Box */}
          <div className="bg-[#FAF9F5] p-4 rounded-xl border border-stone-200 text-xs space-y-1.5 tabular-nums">
            <div className="flex justify-between text-stone-600">
              <span>Items Total ({orderSummary.items.length})</span>
              <span>${orderSummary.subtotal.toFixed(2)}</span>
            </div>
            {orderSummary.discount > 0 && (
              <div className="flex justify-between text-emerald-800">
                <span>Wellness Promo Discount</span>
                <span>-${orderSummary.discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-stone-900 text-sm pt-2 border-t border-stone-200">
              <span>Total Due</span>
              <span className="text-emerald-950 font-display">${orderSummary.total.toFixed(2)}</span>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-emerald-900 hover:bg-emerald-800 transition-colors shadow-sm disabled:opacity-50"
          >
            {isSubmitting ? 'Placing Clean Order...' : `Authorize & Place Order · $${orderSummary.total.toFixed(2)}`}
          </button>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-400 text-center">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>256-Bit Encrypted Secure Checkout</span>
          </div>

        </form>

      </div>
    </div>
  );
};
