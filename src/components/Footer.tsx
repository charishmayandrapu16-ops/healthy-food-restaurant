import React, { useState } from 'react';
import { Leaf, ArrowRight, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 2000);
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Brand & Purpose (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-emerald-700 text-stone-100 flex items-center justify-center">
                <Leaf className="w-4 h-4 text-emerald-200" />
              </span>
              <span className="font-display text-2xl font-bold tracking-tight text-white">
                Verde<span className="text-emerald-500">.</span>
              </span>
            </div>
            
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Artisan organic restaurant and clean wellness kitchen. Certified organic grains, local farm harvests, zero seed oils, and chef-calibrated nutrition.
            </p>

            <div className="text-xs text-stone-400 space-y-1 pt-2">
              <div>742 Evergreen Way, Pacific Grove, CA 93950</div>
              <div>Table Inquiries: (831) 555-0144</div>
              <div>Kitchen Hours: 8:00 AM – 9:30 PM Daily</div>
            </div>
          </div>

          {/* Quick Navigation (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-stone-200">
              Kitchen & Menu
            </div>
            <ul className="text-xs text-stone-400 space-y-2">
              <li><a href="#menu" className="hover:text-emerald-400 transition-colors">Seasonal Bowls & Salads</a></li>
              <li><a href="#custom-bowl" className="hover:text-emerald-400 transition-colors">Custom Bowl Lab</a></li>
              <li><a href="#philosophy" className="hover:text-emerald-400 transition-colors">The Zero Seed Oil Pledge</a></li>
              <li><a href="#reservations" className="hover:text-emerald-400 transition-colors">Table Reservations</a></li>
              <li><a href="#community" className="hover:text-emerald-400 transition-colors">Diner Reviews</a></li>
            </ul>
          </div>

          {/* Seasonal Harvest Dispatch (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-stone-200">
              The Harvest Dispatch
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Receive weekly seasonal farm menus, executive chef recipes, and nutrient density guides straight to your inbox.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2 pt-1">
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email..."
                  className="flex-1 px-3 py-2 text-xs bg-stone-800 border border-stone-700 rounded-lg text-white placeholder:text-stone-500 focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 text-xs font-semibold bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg transition-colors flex items-center justify-center gap-1 shrink-0"
                >
                  {subscribed ? <Check className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                </button>
              </div>
              {subscribed && (
                <div className="text-[11px] text-emerald-400">
                  ✓ Welcome to the harvest community!
                </div>
              )}
            </form>
          </div>

        </div>

        {/* Quiet Bottom Legal */}
        <div className="pt-8 border-t border-stone-800 text-xs text-stone-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} Verde Organic Kitchen. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-stone-300">Privacy Policy</a>
            <a href="#" className="hover:text-stone-300">Allergen Protocol</a>
            <a href="#" className="hover:text-stone-300">Accessibility Statement</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
