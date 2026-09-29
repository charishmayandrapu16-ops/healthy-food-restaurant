import React, { useState } from 'react';
import { X, Plus, Minus, Check, MapPin, AlertCircle, Sparkles } from 'lucide-react';
import { MenuItem } from '../types/restaurant';

interface DishDetailModalProps {
  dish: MenuItem | null;
  onClose: () => void;
  onAddToCart: (dish: MenuItem, quantity: number, customizations?: Record<string, string>, notes?: string) => void;
}

export const DishDetailModal: React.FC<DishDetailModalProps> = ({ dish, onClose, onAddToCart }) => {
  if (!dish) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    if (dish.customOptions) {
      dish.customOptions.forEach(group => {
        if (group.options.length > 0) {
          initial[group.name] = group.options[0].id;
        }
      });
    }
    return initial;
  });
  const [specialNotes, setSpecialNotes] = useState('');
  const [isAdded, setIsAdded] = useState(false);

  // Compute calculated unit price based on selected options
  let calculatedUnitPrice = dish.price;
  if (dish.customOptions) {
    dish.customOptions.forEach(group => {
      const selectedOptionId = selectedOptions[group.name];
      const foundOption = group.options.find(opt => opt.id === selectedOptionId);
      if (foundOption?.priceDelta) {
        calculatedUnitPrice += foundOption.priceDelta;
      }
    });
  }

  const totalPrice = calculatedUnitPrice * quantity;

  const handleOptionChange = (groupName: string, optionId: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [groupName]: optionId
    }));
  };

  const handleAdd = () => {
    onAddToCart(dish, quantity, selectedOptions, specialNotes);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      
      <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-stone-700 hover:text-stone-900 shadow-md backdrop-blur-md transition-colors"
          aria-label="Close dish preview"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto">
          
          {/* Dish Image */}
          <div className="relative aspect-[16/9] w-full bg-stone-100 overflow-hidden">
            <img
              src={dish.image}
              alt={dish.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-6 right-6 text-white flex items-end justify-between">
              <div>
                <div className="text-xs uppercase tracking-wider text-emerald-300 font-semibold">
                  {dish.category}
                </div>
                <h3 className="font-display text-2xl font-bold text-white">
                  {dish.name}
                </h3>
              </div>
              <div className="text-xl font-bold font-display tabular-nums text-white">
                ${calculatedUnitPrice.toFixed(2)}
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            
            {/* Tagline & Description */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-emerald-800">
                {dish.tagline}
              </p>
              <p className="text-sm text-stone-600 leading-relaxed">
                {dish.description}
              </p>
            </div>

            {/* Farm Source */}
            {dish.farmSource && (
              <div className="flex items-center gap-2 text-xs text-stone-600 bg-stone-50 p-3 rounded-xl border border-stone-200/80">
                <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Harvest Origin: <strong className="text-stone-800">{dish.farmSource}</strong></span>
              </div>
            )}

            {/* Nutrition & Macros Grid */}
            <div className="bg-stone-50 p-4 rounded-xl border border-stone-200/80">
              <div className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">
                Nutritional Profile (per serving)
              </div>
              <div className="grid grid-cols-5 gap-2 text-center text-xs tabular-nums font-medium">
                <div className="p-2 bg-white rounded-lg border border-stone-200">
                  <div className="text-stone-400 text-[10px]">CALORIES</div>
                  <div className="font-bold text-stone-900 mt-0.5">{dish.calories}</div>
                </div>
                <div className="p-2 bg-white rounded-lg border border-stone-200">
                  <div className="text-stone-400 text-[10px]">PROTEIN</div>
                  <div className="font-bold text-emerald-700 mt-0.5">{dish.protein}g</div>
                </div>
                <div className="p-2 bg-white rounded-lg border border-stone-200">
                  <div className="text-stone-400 text-[10px]">CARBS</div>
                  <div className="font-bold text-amber-700 mt-0.5">{dish.carbs}g</div>
                </div>
                <div className="p-2 bg-white rounded-lg border border-stone-200">
                  <div className="text-stone-400 text-[10px]">FATS</div>
                  <div className="font-bold text-stone-700 mt-0.5">{dish.fat}g</div>
                </div>
                <div className="p-2 bg-white rounded-lg border border-stone-200">
                  <div className="text-stone-400 text-[10px]">FIBER</div>
                  <div className="font-bold text-stone-700 mt-0.5">{dish.fiber}g</div>
                </div>
              </div>
            </div>

            {/* Customization Options if present */}
            {dish.customOptions && dish.customOptions.length > 0 && (
              <div className="space-y-4 pt-2">
                <div className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                  Personalize Your Preparation
                </div>
                {dish.customOptions.map(group => (
                  <div key={group.name} className="space-y-2">
                    <label className="text-xs font-semibold text-stone-700">
                      {group.name}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {group.options.map(option => {
                        const isSelected = selectedOptions[group.name] === option.id;
                        return (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() => handleOptionChange(group.name, option.id)}
                            className={`p-2.5 rounded-lg border text-left text-xs transition-all flex items-center justify-between ${
                              isSelected
                                ? 'border-emerald-700 bg-emerald-50 text-stone-900 font-semibold'
                                : 'border-stone-200 text-stone-700 hover:border-stone-300'
                            }`}
                          >
                            <span>{option.label}</span>
                            {option.priceDelta ? (
                              <span className="text-stone-500 tabular-nums">
                                +${option.priceDelta.toFixed(2)}
                              </span>
                            ) : (
                              <span className="text-stone-400 text-[11px]">Included</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Special Dietary / Kitchen Note */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-700">
                Special Kitchen Notes (Allergies, Extra Dressing on the Side)
              </label>
              <input
                type="text"
                value={specialNotes}
                onChange={e => setSpecialNotes(e.target.value)}
                placeholder="e.g. Dressing on the side, no sesame seeds"
                className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
            </div>

            {/* Allergens warning */}
            {dish.allergens.length > 0 && (
              <div className="flex items-center gap-2 text-xs text-amber-800 bg-amber-50 p-2.5 rounded-lg">
                <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
                <span>Contains: {dish.allergens.join(', ')}. Kitchen is 100% peanut and seed-oil free.</span>
              </div>
            )}

          </div>
        </div>

        {/* Modal Sticky Footer Actions */}
        <div className="p-4 sm:p-6 bg-stone-50 border-t border-stone-200 flex items-center justify-between gap-4">
          
          {/* Quantity Stepper */}
          <div className="flex items-center gap-2 bg-white border border-stone-300 rounded-lg p-1">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-8 text-center text-xs font-bold tabular-nums text-stone-900">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add to Cart CTA */}
          <button
            onClick={handleAdd}
            className={`flex-1 py-3 px-4 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
              isAdded
                ? 'bg-emerald-700 text-white'
                : 'bg-emerald-900 hover:bg-emerald-800 text-white shadow-sm'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <span>Add to Bag</span>
                <span className="opacity-75">·</span>
                <span className="tabular-nums font-bold">${totalPrice.toFixed(2)}</span>
              </>
            )}
          </button>

        </div>

      </div>

    </div>
  );
};
