import React from 'react';
import { farmHarvestImg, FARM_PARTNERS } from '../data/menuData';
import { ShieldCheck, HeartHandshake, Leaf, Sprout } from 'lucide-react';

export const OurPhilosophySection: React.FC = () => {
  return (
    <section id="philosophy" className="py-16 md:py-24 bg-[#FAF9F5] border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Lead */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-6 space-y-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
              <Sprout className="w-3.5 h-3.5 text-emerald-700" />
              <span>Ethical Farm-to-Table Standard</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl text-stone-900 tracking-tight text-balance">
              Nutrition Begins in Living, Regenerative Soil
            </h2>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              We reject the industrial food model of chemical shortcuts and seed oils. Instead, we collaborate with small-scale biodynamic growers along the central coast whose nutrient-dense harvests arrive in our kitchen within 24 hours of cutting.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-xl relative aspect-[16/9] bg-stone-100">
              <img
                src={farmHarvestImg}
                alt="Organic farm produce harvest"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-medium">
                Fresh morning harvest arriving from Rooted Earth Farms in Salinas Valley
              </div>
            </div>
          </div>
        </div>

        {/* 3 Core Editorial Pillars (Human editorial numbering) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="p-6 bg-white rounded-2xl border border-stone-200/90 shadow-xs space-y-3">
            <div className="text-xs font-bold text-emerald-800 tracking-wider">01. THE ZERO SEED OIL PLEDGE</div>
            <h3 className="font-display text-lg font-bold text-stone-900">
              Strictly Cold-Pressed Fats
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              You will never find canola, soy, corn, or cottonseed oils in our kitchen. We sauté and emulsify exclusively with single-origin Greek extra virgin olive oil and cold-pressed avocado oil.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-stone-200/90 shadow-xs space-y-3">
            <div className="text-xs font-bold text-emerald-800 tracking-wider">02. MICRO-NUTRIENT DENSITY</div>
            <h3 className="font-display text-lg font-bold text-stone-900">
              Living Polyphenols & Ferments
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Every power bowl includes living ferments, raw microgreens, and active digestive botanicals designed to foster a flourishing gut microbiome and eliminate post-meal sluggishness.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-stone-200/90 shadow-xs space-y-3">
            <div className="text-xs font-bold text-emerald-800 tracking-wider">03. CIRCULAR RESTORATION</div>
            <h3 className="font-display text-lg font-bold text-stone-900">
              100% Compostable Packaging
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              From our sugarcane takeout bowls to our wood-fiber utensils and cornstarch cold cups, all packaging decomposes in commercial compost in under 60 days.
            </p>
          </div>
        </div>

        {/* Local Farm Partners Showcase */}
        <div className="bg-white p-8 rounded-2xl border border-stone-200/90 shadow-xs">
          <div className="max-w-xl mb-6">
            <div className="text-xs font-bold uppercase tracking-wider text-stone-500">Traceable Regional Network</div>
            <h3 className="font-display text-xl font-bold text-stone-900 mt-1">Our Partner Growers & Fishermen</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FARM_PARTNERS.map(farm => (
              <div key={farm.name} className="border-l-2 border-emerald-700 pl-4 py-1 space-y-1">
                <div className="text-xs font-bold text-stone-900">{farm.name}</div>
                <div className="text-[11px] text-emerald-800 font-medium">{farm.location}</div>
                <div className="text-xs text-stone-500">{farm.focus}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
