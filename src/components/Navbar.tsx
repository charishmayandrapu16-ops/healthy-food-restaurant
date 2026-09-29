import React, { useState } from 'react';
import { ShoppingBag, Calendar, Menu as MenuIcon, X, Leaf, MessageSquareCode } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenReservation: () => void;
  onOpenChat?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart, onOpenReservation, onOpenChat }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF9F5]/90 backdrop-blur-md border-b border-stone-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Zone 1: Single element wordmark */}
        <a href="#" className="flex items-center gap-2 group">
          <span className="w-8 h-8 rounded-full bg-emerald-800 text-stone-100 flex items-center justify-center transition-transform group-hover:scale-105">
            <Leaf className="w-4 h-4 text-emerald-200" />
          </span>
          <span className="font-display text-2xl font-bold tracking-tight text-stone-900">
            Verde<span className="text-emerald-700">.</span>
          </span>
        </a>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-700">
          <a href="#menu" className="hover:text-emerald-800 transition-colors py-1">Seasonal Menu</a>
          <a href="#custom-bowl" className="hover:text-emerald-800 transition-colors py-1">Bowl Lab</a>
          <a href="#philosophy" className="hover:text-emerald-800 transition-colors py-1">Our Philosophy</a>
          <a href="#reservations" className="hover:text-emerald-800 transition-colors py-1">Reservations</a>
          <a href="#community" className="hover:text-emerald-800 transition-colors py-1">Diner Stories</a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          {onOpenChat && (
            <button
              onClick={onOpenChat}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-emerald-900 bg-emerald-100/80 border border-emerald-300 rounded-lg hover:bg-emerald-200/80 transition-colors whitespace-nowrap"
              title="Chat with Verde AI Concierge"
            >
              <MessageSquareCode className="w-3.5 h-3.5 text-emerald-800" />
              <span className="hidden sm:inline">Ask AI Concierge</span>
            </button>
          )}

          <button
            onClick={onOpenReservation}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-stone-800 bg-stone-100/90 border border-stone-300 rounded-lg hover:bg-stone-200/80 transition-colors whitespace-nowrap"
          >
            <Calendar className="w-3.5 h-3.5 text-stone-600" />
            Reserve Table
          </button>

          <button
            onClick={onOpenCart}
            aria-label={`Shopping bag with ${cartCount} items`}
            className="relative p-2.5 rounded-lg bg-emerald-900 text-stone-50 hover:bg-emerald-800 transition-colors flex items-center gap-2 text-xs font-semibold"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Bag</span>
            {cartCount > 0 && (
              <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-emerald-900 bg-emerald-300 rounded-full tabular-nums">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-stone-700 hover:text-stone-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF9F5] border-b border-stone-200 px-6 py-5 space-y-4 animate-in fade-in duration-150">
          <nav className="flex flex-col space-y-3 text-base font-medium text-stone-800">
            <a
              href="#menu"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-emerald-800"
            >
              Seasonal Menu
            </a>
            <a
              href="#custom-bowl"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-emerald-800"
            >
              Bowl Lab (Custom Macros)
            </a>
            <a
              href="#philosophy"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-emerald-800"
            >
              Our Philosophy & Farms
            </a>
            <a
              href="#reservations"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-emerald-800"
            >
              Reservations
            </a>
            <a
              href="#community"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-emerald-800"
            >
              Diner Stories
            </a>
          </nav>
          <div className="pt-3 border-t border-stone-200 flex flex-col gap-2">
            {onOpenChat && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenChat();
                }}
                className="w-full py-2.5 px-4 text-sm font-semibold text-emerald-900 bg-emerald-100 border border-emerald-300 rounded-lg text-center flex items-center justify-center gap-2"
              >
                <MessageSquareCode className="w-4 h-4 text-emerald-800" />
                <span>Chat with AI Concierge</span>
              </button>
            )}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReservation();
              }}
              className="w-full py-2.5 px-4 text-sm font-semibold text-stone-900 bg-stone-100 border border-stone-300 rounded-lg text-center"
            >
              Reserve a Table
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

