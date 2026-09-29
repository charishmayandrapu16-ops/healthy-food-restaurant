import React, { useState, useMemo } from 'react';
import { CUSTOM_BOWL_INGREDIENTS, heroBowlImg } from '../data/menuData';
import { CustomBowlIngredient, MenuItem } from '../types/restaurant';
import { Plus, Check, RefreshCw, Sparkles, Flame, ShieldCheck } from 'lucide-react';

interface BowlBuilderSectionProps {
  onAddCustomBowl: (dish: MenuItem, customizations: Record<string, string>) => void;
}

export const BowlBuilderSection: React.FC<BowlBuilderSectionProps> = ({ onAddCustomBowl }) => {
  // Selections
  const [selectedBase, setSelectedBase] = useState<CustomBowlIngredient>(
    CUSTOM_BOWL_INGREDIENTS.find(i => i.id === 'b-quinoa')!
  );
  const [selectedProtein, setSelectedProtein] = useState<CustomBowlIngredient>(
    CUSTOM_BOWL_INGREDIENTS.find(i => i.id === 'p-salmon')!
  );
  const [selectedVeggies, setSelectedVeggies] = useState<CustomBowlIngredient[]>([
    CUSTOM_BOWL_INGREDIENTS.find(i => i.id === 'v-avocado')!,
    CUSTOM_BOWL_INGREDIENTS.find(i => i.id === 'v-sweetpotato')!,
    CUSTOM_BOWL_INGREDIENTS.find(i => i.id === 'v-edamame')!,
  ]);
  const [selectedCrunch, setSelectedCrunch] = useState<CustomBowlIngredient>(
    CUSTOM_BOWL_INGREDIENTS.find(i => i.id === 'c-pumpkin')!
  );
  const [selectedDressing, setSelectedDressing] = useState<CustomBowlIngredient>(
    CUSTOM_BOWL_INGREDIENTS.find(i => i.id === 'd-tahini')!
  );
  const [bowlName, setBowlName] = useState('My Custom Power Bowl');
  const [isSuccessAdded, setIsSuccessAdded] = useState(false);

  // Grouped ingredients
  const bases = useMemo(() => CUSTOM_BOWL_INGREDIENTS.filter(i => i.category === 'base'), []);
  const proteins = useMemo(() => CUSTOM_BOWL_INGREDIENTS.filter(i => i.category === 'protein'), []);
  const veggies = useMemo(() => CUSTOM_BOWL_INGREDIENTS.filter(i => i.category === 'veggies'), []);
  const crunches = useMemo(() => CUSTOM_BOWL_INGREDIENTS.filter(i => i.category === 'crunch'), []);
  const dressings = useMemo(() => CUSTOM_BOWL_INGREDIENTS.filter(i => i.category === 'dressing'), []);

  // Multi-select veggie toggle (up to 4)
  const toggleVeggie = (v: CustomBowlIngredient) => {
    if (selectedVeggies.some(item => item.id === v.id)) {
      if (selectedVeggies.length > 1) {
        setSelectedVeggies(selectedVeggies.filter(item => item.id !== v.id));
      }
    } else {
      if (selectedVeggies.length < 4) {
        setSelectedVeggies([...selectedVeggies, v]);
      }
    }
  };

  // Calculations
  const allSelected = useMemo(() => {
    return [selectedBase, selectedProtein, ...selectedVeggies, selectedCrunch, selectedDressing].filter(Boolean);
  }, [selectedBase, selectedProtein, selectedVeggies, selectedCrunch, selectedDressing]);

  const totalCalories = useMemo(() => allSelected.reduce((sum, item) => sum + item.calories, 0), [allSelected]);
  const totalProtein = useMemo(() => allSelected.reduce((sum, item) => sum + item.protein, 0), [allSelected]);
  const totalCarbs = useMemo(() => allSelected.reduce((sum, item) => sum + item.carbs, 0), [allSelected]);
  const totalFat = useMemo(() => allSelected.reduce((sum, item) => sum + item.fat, 0), [allSelected]);
  const totalPrice = useMemo(() => allSelected.reduce((sum, item) => sum + item.price, 0), [allSelected]);

  // Handle Add to cart
  const handleAddToOrder = () => {
    const veggieNames = selectedVeggies.map(v => v.name).join(', ');
    const customItem: MenuItem = {
      id: `custom-bowl-${Date.now()}`,
      name: bowlName || 'Custom Macro Bowl',
      tagline: `${selectedProtein.name} on ${selectedBase.name}`,
      description: `Custom bowl crafted with ${selectedBase.name}, ${selectedProtein.name}, ${veggieNames}, topped with ${selectedCrunch.name} and ${selectedDressing.name}.`,
      price: totalPrice,
      category: 'bowls',
      image: heroBowlImg,
      calories: totalCalories,
      protein: Math.round(totalProtein),
      carbs: Math.round(totalCarbs),
      fat: Math.round(totalFat),
      fiber: 12,
      allergens: [],
      tags: ['Organic'],
      customizable: false
    };

    const details: Record<string, string> = {
      'Base': selectedBase.name,
      'Protein': selectedProtein.name,
      'Veggies': veggieNames,
      'Crunch': selectedCrunch.name,
      'Dressing': selectedDressing.name,
    };

    onAddCustomBowl(customItem, details);
    setIsSuccessAdded(true);
    setTimeout(() => setIsSuccessAdded(false), 2200);
  };

  return (
    <section id="custom-bowl" className="py-16 md:py-24 bg-[#FAF9F5] border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Interactive Clean Kitchen Lab</span>
          </div>
          <h2 className="mt-1 font-display text-3xl sm:text-4xl text-stone-900 tracking-tight text-balance">
            Build Your Custom Macro Bowl
          </h2>
          <p className="mt-2 text-stone-600 text-sm sm:text-base leading-relaxed">
            Calibrate your meal to your exact fitness or wellness targets. Watch your calories and macronutrients update in real time with certified non-GMO ingredients.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Builder Controls (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Step 1: Base */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Step 1 · Choose Your Nutrient Base
                </span>
                <span className="text-xs text-stone-400">Select 1</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {bases.map(item => {
                  const isSelected = selectedBase?.id === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setSelectedBase(item)}
                      className={`text-left p-3.5 rounded-xl border text-xs transition-all flex items-center justify-between ${
                        isSelected
                          ? 'border-emerald-800 bg-emerald-50/50 shadow-xs'
                          : 'border-stone-200 hover:border-stone-300 bg-white'
                      }`}
                    >
                      <div>
                        <div className="font-semibold text-stone-900">{item.name}</div>
                        <div className="text-stone-500 mt-0.5 tabular-nums">
                          {item.calories} kcal · {item.protein}g protein
                        </div>
                      </div>
                      <div className="text-stone-700 font-semibold tabular-nums">
                        ${item.price.toFixed(2)}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Clean Protein */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Step 2 · Select Pasture / Wild Protein
                </span>
                <span className="text-xs text-stone-400">Select 1</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {proteins.map(item => {
                  const isSelected = selectedProtein?.id === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setSelectedProtein(item)}
                      className={`text-left p-3.5 rounded-xl border text-xs transition-all flex items-center justify-between ${
                        isSelected
                          ? 'border-emerald-800 bg-emerald-50/50 shadow-xs'
                          : 'border-stone-200 hover:border-stone-300 bg-white'
                      }`}
                    >
                      <div>
                        <div className="font-semibold text-stone-900">{item.name}</div>
                        <div className="text-stone-500 mt-0.5 tabular-nums">
                          {item.calories} kcal · {item.protein}g protein
                        </div>
                      </div>
                      <div className="text-stone-700 font-semibold tabular-nums">
                        ${item.price.toFixed(2)}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Veggies (Up to 4) */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Step 3 · Fresh Botanicals & Ferments
                </span>
                <span className="text-xs text-emerald-800 font-medium">
                  {selectedVeggies.length} / 4 Selected
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {veggies.map(item => {
                  const isSelected = selectedVeggies.some(v => v.id === item.id);
                  return (
                    <button
                      key={item.id}
                      onClick={() => toggleVeggie(item)}
                      className={`text-left p-3 rounded-xl border text-xs transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'border-emerald-700 bg-emerald-50/70 text-emerald-950 font-semibold'
                          : 'border-stone-200 hover:border-stone-300 bg-white text-stone-700'
                      }`}
                    >
                      <span>{item.name}</span>
                      <span className="text-[11px] text-stone-500 mt-1 tabular-nums">
                        +{item.calories} kcal · ${item.price.toFixed(2)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4 & 5: Crunch & Dressing */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Crunch */}
              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Step 4 · Superfood Crunch
                </span>
                <div className="space-y-2 pt-1">
                  {crunches.map(item => {
                    const isSelected = selectedCrunch?.id === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setSelectedCrunch(item)}
                        className={`w-full text-left px-3 py-2 rounded-lg border text-xs transition-all flex items-center justify-between ${
                          isSelected ? 'border-emerald-700 bg-emerald-50 font-semibold text-stone-900' : 'border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        <span>{item.name}</span>
                        <span className="text-stone-500 tabular-nums">${item.price.toFixed(2)}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dressing */}
              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Step 5 · Cold-Pressed Dressing
                </span>
                <div className="space-y-2 pt-1">
                  {dressings.map(item => {
                    const isSelected = selectedDressing?.id === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setSelectedDressing(item)}
                        className={`w-full text-left px-3 py-2 rounded-lg border text-xs transition-all flex items-center justify-between ${
                          isSelected ? 'border-emerald-700 bg-emerald-50 font-semibold text-stone-900' : 'border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        <span className="truncate pr-1">{item.name}</span>
                        <span className="text-stone-500 tabular-nums shrink-0">${item.price.toFixed(2)}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

          </div>

          {/* Real-time Macro Dashboard (4 cols, sticky) */}
          <div className="lg:col-span-4 sticky top-28 space-y-4">
            <div className="bg-stone-900 text-stone-100 p-6 rounded-2xl shadow-xl space-y-6">
              
              {/* Top info */}
              <div className="flex items-center justify-between border-b border-stone-800 pb-4">
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-emerald-400 font-semibold">
                    Live Nutrition Blueprint
                  </div>
                  <input
                    type="text"
                    value={bowlName}
                    onChange={e => setBowlName(e.target.value)}
                    className="mt-1 font-display text-lg font-bold text-white bg-transparent border-b border-stone-700 hover:border-emerald-500 focus:border-emerald-500 focus:outline-none w-full"
                    placeholder="Name your bowl..."
                  />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold font-display text-white tabular-nums">
                    ${totalPrice.toFixed(2)}
                  </div>
                  <div className="text-[11px] text-stone-400">Total Price</div>
                </div>
              </div>

              {/* Nutrition Counters */}
              <div className="space-y-4">
                
                {/* Calories Dial */}
                <div className="bg-stone-800/80 p-4 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
                      <Flame className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs text-stone-400">Energy Density</div>
                      <div className="text-lg font-bold text-white tabular-nums">{totalCalories} kcal</div>
                    </div>
                  </div>
                  <div className="text-right text-xs text-stone-400">
                    <div>Daily Goal: ~2,000</div>
                    <div className="text-emerald-400 font-semibold tabular-nums">
                      {Math.round((totalCalories / 2000) * 100)}%
                    </div>
                  </div>
                </div>

                {/* Macro breakdown bars */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-stone-800/80 p-3 rounded-xl">
                    <div className="text-[11px] text-stone-400 uppercase">Protein</div>
                    <div className="text-base font-bold text-emerald-300 tabular-nums mt-0.5">
                      {Math.round(totalProtein)}g
                    </div>
                  </div>
                  <div className="bg-stone-800/80 p-3 rounded-xl">
                    <div className="text-[11px] text-stone-400 uppercase">Carbs</div>
                    <div className="text-base font-bold text-amber-300 tabular-nums mt-0.5">
                      {Math.round(totalCarbs)}g
                    </div>
                  </div>
                  <div className="bg-stone-800/80 p-3 rounded-xl">
                    <div className="text-[11px] text-stone-400 uppercase">Fats</div>
                    <div className="text-base font-bold text-sky-300 tabular-nums mt-0.5">
                      {Math.round(totalFat)}g
                    </div>
                  </div>
                </div>

              </div>

              {/* Selected Ingredients Breakdown */}
              <div className="space-y-2 text-xs border-t border-stone-800 pt-4 text-stone-300">
                <div className="text-[11px] font-semibold uppercase text-stone-400">Composition</div>
                <div className="flex justify-between py-0.5">
                  <span className="text-stone-400">Base:</span>
                  <span className="font-medium text-stone-200">{selectedBase.name}</span>
                </div>
                <div className="flex justify-between py-0.5">
                  <span className="text-stone-400">Protein:</span>
                  <span className="font-medium text-stone-200">{selectedProtein.name}</span>
                </div>
                <div className="flex justify-between py-0.5">
                  <span className="text-stone-400">Veggies ({selectedVeggies.length}):</span>
                  <span className="font-medium text-stone-200 truncate max-w-[170px]">
                    {selectedVeggies.map(v => v.name.split(' ')[0]).join(', ')}
                  </span>
                </div>
                <div className="flex justify-between py-0.5">
                  <span className="text-stone-400">Dressing:</span>
                  <span className="font-medium text-stone-200 truncate max-w-[170px]">{selectedDressing.name}</span>
                </div>
              </div>

              {/* Add to order CTA */}
              <button
                onClick={handleAddToOrder}
                className={`w-full py-3.5 px-4 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-lg ${
                  isSuccessAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold'
                }`}
              >
                {isSuccessAdded ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>Added to Your Order!</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 text-stone-950" />
                    <span>Add Custom Bowl (${totalPrice.toFixed(2)})</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-stone-400 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Non-GMO & Organic Certified</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
