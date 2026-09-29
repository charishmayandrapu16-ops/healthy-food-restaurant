import React from 'react';
import { ArrowRight, Sparkles, Plus, Check } from 'lucide-react';
import { heroBowlImg, MENU_ITEMS } from '../data/menuData';
import { MenuItem } from '../types/restaurant';

interface HeroSectionProps {
  onSelectDish: (dish: MenuItem) => void;
  onQuickAdd: (dish: MenuItem) => void;
  justAddedDishId: string | null;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSelectDish,
  onQuickAdd,
  justAddedDishId
}) => {
  const spotlightDish = MENU_ITEMS[0]; // Artisan Rainbow Harvest Bowl

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-16 md:pb-24 bg-[#FAF9F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-emerald-800 uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>Autumn Harvest Menu · Salinas Valley Sourced</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-stone-900 leading-[1.12] tracking-tight text-balance">
              Eat Clean. <br />
              <span className="italic font-normal text-emerald-900">Feel Truly Alive.</span>
            </h1>

            <p className="text-base sm:text-lg text-stone-600 max-w-xl leading-relaxed">
              Every dish is thoughtfully designed with certified organic produce, sustainably caught proteins, cold-pressed dressings, and zero seed oils. Clean fuel made delicious.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#menu"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-stone-50 bg-emerald-900 hover:bg-emerald-800 rounded-lg shadow-sm hover:shadow transition-all group"
              >
                <span>Explore Seasonal Menu</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="#custom-bowl"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-stone-800 bg-white border border-stone-300 hover:bg-stone-50 rounded-lg transition-colors"
              >
                <Sparkles className="w-4 h-4 text-emerald-700" />
                <span>Build Custom Bowl Lab</span>
              </a>
            </div>

            {/* Claim-to-Proof editorial strip */}
            <div className="pt-8 border-t border-stone-200/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
              <div>
                <div className="text-xl font-bold font-display text-stone-900 tabular-nums">14 Farms</div>
                <div className="text-xs text-stone-500 mt-0.5">Certified Organic Sourcing</div>
              </div>
              <div>
                <div className="text-xl font-bold font-display text-stone-900 tabular-nums">0% Seed Oils</div>
                <div className="text-xs text-stone-500 mt-0.5">Pure EVOO & Avocado Oil</div>
              </div>
              <div>
                <div className="text-xl font-bold font-display text-stone-900 tabular-nums">100% Green</div>
                <div className="text-xs text-stone-500 mt-0.5">Plant-based Packaging</div>
              </div>
              <div>
                <div className="text-xl font-bold font-display text-stone-900 tabular-nums">4.9 ★</div>
                <div className="text-xs text-stone-500 mt-0.5">2,400+ Local Diners</div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Anchor & Interactive Spotlight */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Image Frame */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-stone-100 border border-stone-200/80 group">
                <img
                  src={spotlightDish.image}
                  alt={spotlightDish.name}
                  referrerPolicy="no-referrer"
                  className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent pointer-events-none" />

                {/* Overlay Metadata */}
                <div className="absolute bottom-0 inset-x-0 p-6 text-white space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">
                      Chef’s Harvest Feature
                    </span>
                    <span className="text-base font-bold tabular-nums text-white font-display">
                      ${spotlightDish.price.toFixed(2)}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold font-display text-white">
                    {spotlightDish.name}
                  </h2>

                  {/* Clean unboxed macro values with typographic bullet separators */}
                  <div className="flex items-center gap-2 text-xs text-stone-200 font-medium tabular-nums pt-1">
                    <span>{spotlightDish.calories} kcal</span>
                    <span aria-hidden="true">·</span>
                    <span>{spotlightDish.protein}g Protein</span>
                    <span aria-hidden="true">·</span>
                    <span>{spotlightDish.fiber}g Fiber</span>
                    <span aria-hidden="true">·</span>
                    <span>100% Non-GMO</span>
                  </div>

                  {/* Quick Action row */}
                  <div className="pt-3 flex items-center gap-3">
                    <button
                      onClick={() => onQuickAdd(spotlightDish)}
                      className="flex-1 py-2 px-3 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      {justAddedDishId === spotlightDish.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-white" />
                          <span>Added to Bag</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Quick Add to Bag</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => onSelectDish(spotlightDish)}
                      className="py-2 px-3 text-xs font-medium rounded-lg bg-white/20 hover:bg-white/30 text-white backdrop-blur-md transition-colors"
                    >
                      Customize
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating Chef Note Card */}
              <div className="hidden sm:block absolute -bottom-5 -left-6 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-stone-200 shadow-lg max-w-xs text-stone-800">
                <p className="text-xs italic text-stone-600 font-serif leading-relaxed">
                  “We dress with raw California cold-pressed tahini and harvest rainbow quinoa daily for maximum nutrient bio-availability.”
                </p>
                <div className="mt-2 text-[11px] font-semibold text-stone-900 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  <span>Chef Maya Lin · Executive Culinary Director</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
