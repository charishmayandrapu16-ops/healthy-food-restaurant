import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MenuSection } from './components/MenuSection';
import { BowlBuilderSection } from './components/BowlBuilderSection';
import { OurPhilosophySection } from './components/OurPhilosophySection';
import { ReservationSection } from './components/ReservationSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { Footer } from './components/Footer';
import { DishDetailModal } from './components/DishDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderReceiptModal } from './components/OrderReceiptModal';
import { N8nChatWidget, openN8nChat } from './components/N8nChatWidget';
import { MENU_ITEMS } from './data/menuData';
import { MenuItem, CartItem } from './types/restaurant';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    // Initial sample item for immediate delight
    const initialItem = MENU_ITEMS[0];
    return [
      {
        cartId: `init-${initialItem.id}`,
        menuItem: initialItem,
        quantity: 1,
        unitPrice: initialItem.price,
      }
    ];
  });

  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutSummary, setCheckoutSummary] = useState<any | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<any | null>(null);
  const [justAddedDishId, setJustAddedDishId] = useState<string | null>(null);

  // Quick Add handler
  const handleQuickAdd = (dish: MenuItem) => {
    const existingIndex = cartItems.findIndex(
      ci => ci.menuItem.id === dish.id && !ci.selectedCustomizations
    );

    if (existingIndex > -1) {
      setCartItems(prev => {
        const next = [...prev];
        next[existingIndex].quantity += 1;
        return next;
      });
    } else {
      const newItem: CartItem = {
        cartId: `${dish.id}-${Date.now()}`,
        menuItem: dish,
        quantity: 1,
        unitPrice: dish.price,
      };
      setCartItems(prev => [...prev, newItem]);
    }

    setJustAddedDishId(dish.id);
    setTimeout(() => {
      setJustAddedDishId(null);
    }, 1500);
  };

  // Detailed modal add handler
  const handleDetailedAdd = (
    dish: MenuItem,
    quantity: number,
    customizations?: Record<string, string>,
    notes?: string
  ) => {
    let unitPrice = dish.price;
    if (dish.customOptions && customizations) {
      dish.customOptions.forEach(group => {
        const selectedOptionId = customizations[group.name];
        const opt = group.options.find(o => o.id === selectedOptionId);
        if (opt?.priceDelta) {
          unitPrice += opt.priceDelta;
        }
      });
    }

    const newItem: CartItem = {
      cartId: `${dish.id}-${Date.now()}`,
      menuItem: dish,
      quantity,
      selectedCustomizations: customizations,
      specialInstructions: notes,
      unitPrice,
    };

    setCartItems(prev => [...prev, newItem]);
  };

  // Custom Bowl Lab Add Handler
  const handleAddCustomBowl = (dish: MenuItem, details: Record<string, string>) => {
    const newItem: CartItem = {
      cartId: `custom-${Date.now()}`,
      menuItem: dish,
      quantity: 1,
      selectedCustomizations: details,
      unitPrice: dish.price,
    };
    setCartItems(prev => [...prev, newItem]);
  };

  // Cart quantity adjustment
  const handleUpdateQuantity = (cartId: string, delta: number) => {
    setCartItems(prev =>
      prev
        .map(item => {
          if (item.cartId === cartId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (cartId: string) => {
    setCartItems(prev => prev.filter(i => i.cartId !== cartId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleOpenReservation = () => {
    const el = document.getElementById('reservations');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-stone-900 flex flex-col font-body selection:bg-emerald-800 selection:text-white">
      
      {/* 3-Zone Navigation Header */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={handleOpenReservation}
        onOpenChat={openN8nChat}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onSelectDish={dish => setSelectedDish(dish)}
          onQuickAdd={handleQuickAdd}
          justAddedDishId={justAddedDishId}
        />

        {/* Seasonal Menu Section */}
        <MenuSection
          items={MENU_ITEMS}
          onSelectDish={dish => setSelectedDish(dish)}
          onQuickAdd={handleQuickAdd}
          justAddedDishId={justAddedDishId}
        />

        {/* Custom Bowl Lab Section */}
        <BowlBuilderSection
          onAddCustomBowl={handleAddCustomBowl}
        />

        {/* Our Philosophy & Farms */}
        <OurPhilosophySection />

        {/* Table Reservations */}
        <ReservationSection />

        {/* Attributable Diner Testimonials */}
        <TestimonialsSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Dish Detail & Customization Modal */}
      <DishDetailModal
        dish={selectedDish}
        onClose={() => setSelectedDish(null)}
        onAddToCart={handleDetailedAdd}
      />

      {/* Shopping Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onProceedToCheckout={summary => {
          setIsCartOpen(false);
          setCheckoutSummary(summary);
        }}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={Boolean(checkoutSummary)}
        onClose={() => setCheckoutSummary(null)}
        orderSummary={checkoutSummary}
        onOrderPlaced={orderData => {
          setCheckoutSummary(null);
          setConfirmedOrder(orderData);
          setCartItems([]);
        }}
      />

      {/* Order Confirmed Receipt Modal */}
      <OrderReceiptModal
        orderData={confirmedOrder}
        onClose={() => setConfirmedOrder(null)}
      />

      {/* n8n Chatbot Integration */}
      <N8nChatWidget />

    </div>
  );
}
