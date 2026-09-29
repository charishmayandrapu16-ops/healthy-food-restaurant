import React from 'react';
import { TESTIMONIALS } from '../data/menuData';
import { Star, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="community" className="py-16 md:py-24 bg-stone-50 border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
            Diner Community
          </div>
          <h2 className="mt-1 font-display text-3xl sm:text-4xl text-stone-900 tracking-tight text-balance">
            Real Stories from Mindful Eaters
          </h2>
          <p className="mt-2 text-stone-600 text-sm sm:text-base leading-relaxed">
            See how nourishing whole food changes daily energy, digestive vitality, and athletic recovery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map(item => (
            <div
              key={item.id}
              className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                {/* 5-star rating */}
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-xs text-stone-700 leading-relaxed italic font-serif">
                  “{item.quote}”
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 space-y-1">
                <div className="text-xs font-bold text-stone-900">{item.name}</div>
                <div className="text-[11px] text-stone-500">{item.role}</div>
                <div className="text-[11px] text-emerald-800 font-medium">Favorite: {item.dish}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
