import React, { useState, useMemo } from 'react';
import { Search, Plus, Check, SlidersHorizontal, Info, Sparkles } from 'lucide-react';
import { MenuItem, MenuCategory, DietaryTag } from '../types/restaurant';

interface MenuSectionProps {
  items: MenuItem[];
  onSelectDish: (dish: MenuItem) => void;
  onQuickAdd: (dish: MenuItem) => void;
  justAddedDishId: string | null;
}

const CATEGORIES: { id: MenuCategory; label: string }[] = [
  { id: 'all', label: 'All Seasonal Offerings' },
  { id: 'bowls', label: 'Power Bowls' },
  { id: 'mains', label: 'Protein Mains' },
  { id: 'salads', label: 'Super Salads' },
  { id: 'juices', label: 'Cold-Pressed Juices' },
  { id: 'desserts', label: 'Clean Sweets' },
];

const DIETARY_FILTERS: DietaryTag[] = ['Vegan', 'Gluten-Free', 'High Protein', 'Keto', 'Organic'];

export const MenuSection: React.FC<MenuSectionProps> = ({
  items,
  onSelectDish,
  onQuickAdd,
  justAddedDishId
}) => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('all');
  const [selectedDietary, setSelectedDietary] = useState<DietaryTag[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'recommended' | 'calories_asc' | 'protein_desc' | 'price_asc'>('recommended');

  const toggleDietary = (tag: DietaryTag) => {
    setSelectedDietary(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const filteredItems = useMemo(() => {
    let result = items;

    // Category filter
    if (activeCategory !== 'all') {
      result = result.filter(item => item.category === activeCategory);
    }

    // Dietary tags
    if (selectedDietary.length > 0) {
      result = result.filter(item =>
        selectedDietary.every(tag => item.tags.includes(tag))
      );
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        item =>
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.tagline.toLowerCase().includes(q)
      );
    }

    // Sorting
    return [...result].sort((a, b) => {
      if (sortBy === 'calories_asc') return a.calories - b.calories;
      if (sortBy === 'protein_desc') return b.protein - a.protein;
      if (sortBy === 'price_asc') return a.price - b.price;
      return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
    });
  }, [items, activeCategory, selectedDietary, searchQuery, sortBy]);

  return (
    <section id="menu" className="py-16 md:py-24 bg-stone-50/60 border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-10">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
            Certified Organic & Local Harvest
          </div>
          <h2 className="mt-1 font-display text-3xl sm:text-4xl text-stone-900 tracking-tight text-balance">
            Seasonal Nourishment Menu
          </h2>
          <p className="mt-2 text-stone-600 text-sm sm:text-base leading-relaxed">
            Every recipe is nutritionist-calibrated with transparent calorie counts, macronutrient ratios, and verified regional origins.
          </p>
        </div>

        {/* Filter Bar Controls */}
        <div className="space-y-4 mb-10">
          
          {/* Categories Tab Strip */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-stone-200/60">
            {CATEGORIES.map(cat => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                    isActive
                      ? 'bg-emerald-900 text-white shadow-sm'
                      : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search, Dietary Tags, and Sorting Row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search ingredients, salmon, quinoa, açaí..."
                className="w-full pl-10 pr-4 py-2 text-xs bg-white border border-stone-300 rounded-lg text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700 transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Dietary Tags & Sort Dropdown */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1.5 overflow-x-auto">
                {DIETARY_FILTERS.map(tag => {
                  const isSelected = selectedDietary.includes(tag);
                  return (
                    <button
                      key={tag}
                      onClick={() => toggleDietary(tag)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                        isSelected
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-300 font-semibold'
                          : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>

              {/* Sort Selector */}
              <div className="flex items-center gap-1.5 text-xs font-medium text-stone-700 pl-2">
                <SlidersHorizontal className="w-3.5 h-3.5 text-stone-500" />
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as any)}
                  className="bg-white border border-stone-300 rounded-lg px-2.5 py-1.5 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                >
                  <option value="recommended">Curated / Popular</option>
                  <option value="calories_asc">Lowest Calories</option>
                  <option value="protein_desc">Highest Protein</option>
                  <option value="price_asc">Price: Low to High</option>
                </select>
              </div>

            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 p-8">
            <Info className="w-8 h-8 text-stone-400 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-stone-900">No dishes match your active filter criteria</h3>
            <p className="text-xs text-stone-500 mt-1">Try clearing dietary filters or searching for another ingredient.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSelectedDietary([]);
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 text-xs font-medium text-emerald-800 bg-emerald-50 rounded-lg hover:bg-emerald-100"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map(dish => {
              const isJustAdded = justAddedDishId === dish.id;

              return (
                <div
                  key={dish.id}
                  className="group bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
                >
                  {/* Lead with 65-75% imagery height container */}
                  <div
                    onClick={() => onSelectDish(dish)}
                    className="relative aspect-[4/3] bg-stone-100 overflow-hidden cursor-pointer"
                  >
                    <img
                      src={dish.image}
                      alt={dish.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Subtle text tag in corner (never pill clusters) */}
                    {dish.chefPick && (
                      <div className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-sm text-stone-100 text-[11px] font-medium px-2 py-0.5 rounded">
                        Chef’s Pick
                      </div>
                    )}
                    {dish.popular && !dish.chefPick && (
                      <div className="absolute top-3 left-3 bg-emerald-950/80 backdrop-blur-sm text-emerald-200 text-[11px] font-medium px-2 py-0.5 rounded">
                        Guest Favorite
                      </div>
                    )}

                    <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-md text-xs font-bold text-stone-900 font-display tabular-nums shadow-sm">
                      ${dish.price.toFixed(2)}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      {/* Clean unboxed category metadata with separator */}
                      <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
                        <span>{dish.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{dish.tags.slice(0, 2).join(' · ')}</span>
                      </div>

                      <h3
                        onClick={() => onSelectDish(dish)}
                        className="text-base font-semibold text-stone-900 group-hover:text-emerald-900 transition-colors cursor-pointer"
                      >
                        {dish.name}
                      </h3>

                      <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                        {dish.description}
                      </p>
                    </div>

                    {/* Macros & Action Footer */}
                    <div className="pt-3 border-t border-stone-100 space-y-3">
                      
                      {/* Tabular macro values with typographic bullet separators */}
                      <div className="flex items-center justify-between text-xs text-stone-500 tabular-nums font-medium">
                        <span>{dish.calories} kcal</span>
                        <span aria-hidden="true">·</span>
                        <span>{dish.protein}g Protein</span>
                        <span aria-hidden="true">·</span>
                        <span>{dish.carbs}g Carbs</span>
                        <span aria-hidden="true">·</span>
                        <span>{dish.fat}g Fat</span>
                      </div>

                      {/* Interactive Buttons */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onQuickAdd(dish)}
                          className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap ${
                            isJustAdded
                              ? 'bg-emerald-700 text-white'
                              : 'bg-emerald-900 hover:bg-emerald-800 text-white shadow-sm'
                          }`}
                        >
                          {isJustAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Added</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              <span>Add to Bag</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => onSelectDish(dish)}
                          className="py-2 px-3 text-xs font-medium rounded-lg text-stone-700 bg-stone-100 hover:bg-stone-200 transition-colors whitespace-nowrap"
                        >
                          Details
                        </button>
                      </div>

                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
