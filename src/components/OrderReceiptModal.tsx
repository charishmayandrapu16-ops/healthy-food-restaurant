import React from 'react';
import { CheckCircle2, Clock, MapPin, Receipt, ChefHat } from 'lucide-react';

interface OrderReceiptModalProps {
  orderData: any | null;
  onClose: () => void;
}

export const OrderReceiptModal: React.FC<OrderReceiptModalProps> = ({ orderData, onClose }) => {
  if (!orderData) return null;

  const { orderId, customer, orderSummary, paymentMethod, estimatedTime } = orderData;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in zoom-in-95 duration-200">
      
      <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-emerald-200 overflow-hidden flex flex-col">
        
        {/* Header Ribbon */}
        <div className="bg-emerald-900 text-stone-100 p-6 text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-emerald-800 text-emerald-300 flex items-center justify-center mx-auto mb-2">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h2 className="font-display text-2xl font-bold text-white">Order Confirmed!</h2>
          <p className="text-xs text-emerald-200">
            Order Reference: <strong className="text-white font-mono">{orderId}</strong>
          </p>
        </div>

        {/* Live Prep Status */}
        <div className="p-6 space-y-6">
          
          <div className="bg-[#FAF9F5] p-4 rounded-xl border border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ChefHat className="w-6 h-6 text-emerald-800" />
              <div>
                <div className="text-xs font-bold text-stone-900">Kitchen Status: Prepping Fresh</div>
                <div className="text-[11px] text-stone-500">
                  {orderSummary.orderType === 'pickup' ? 'Ready for Counter Pickup' : 'Assigned to Eco-Courier'}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-stone-400">Est. Time</div>
              <div className="text-sm font-bold text-emerald-900 font-display tabular-nums">
                {estimatedTime}
              </div>
            </div>
          </div>

          {/* Itemized summary */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
              <Receipt className="w-3.5 h-3.5 text-stone-400" />
              <span>Harvest Receipt</span>
            </div>

            <div className="divide-y divide-stone-100 text-xs">
              {orderSummary.items.map((item: any) => (
                <div key={item.cartId} className="py-2 flex justify-between items-start">
                  <div>
                    <span className="font-semibold text-stone-900">
                      {item.quantity}× {item.menuItem.name}
                    </span>
                    {item.selectedCustomizations && (
                      <div className="text-[11px] text-stone-500 mt-0.5">
                        {Object.values(item.selectedCustomizations).join(', ')}
                      </div>
                    )}
                  </div>
                  <span className="font-medium text-stone-800 tabular-nums">
                    ${(item.unitPrice * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-stone-200 space-y-1 text-xs text-stone-600 tabular-nums">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${orderSummary.subtotal.toFixed(2)}</span>
              </div>
              {orderSummary.discount > 0 && (
                <div className="flex justify-between text-emerald-800">
                  <span>Promo Discount</span>
                  <span>-${orderSummary.discount.toFixed(2)}</span>
                </div>
              )}
              {orderSummary.deliveryFee > 0 && (
                <div className="flex justify-between">
                  <span>Eco-Courier Delivery</span>
                  <span>${orderSummary.deliveryFee.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-stone-900 text-sm pt-2 border-t border-stone-200">
                <span>Total Paid</span>
                <span className="font-display text-emerald-950">${orderSummary.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Contact summary */}
          <div className="text-xs text-stone-500 bg-stone-50 p-3 rounded-lg border border-stone-200 space-y-1">
            <div>Receipt dispatched to: <strong className="text-stone-800">{customer.email}</strong></div>
            <div>SMS updates sending to: <strong className="text-stone-800">{customer.phone}</strong></div>
            {customer.address && (
              <div>Destination: <strong className="text-stone-800">{customer.address} {customer.apt}</strong></div>
            )}
          </div>

          {/* Action button */}
          <button
            onClick={onClose}
            className="w-full py-3 px-4 rounded-xl text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 transition-colors"
          >
            Done · Return to Home
          </button>

        </div>

      </div>
    </div>
  );
};
