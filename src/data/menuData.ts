import heroBowlImg from '../assets/images/hero_healthy_bowl_1790696218218.jpg';
import salmonImg from '../assets/images/dish_salmon_quinoa_1790696230914.jpg';
import acaiImg from '../assets/images/dish_acai_superbowl_1790696245135.jpg';
import greenSaladImg from '../assets/images/dish_green_goddess_salad_1790696256070.jpg';
import farmHarvestImg from '../assets/images/about_farm_harvest_1790696269371.jpg';
import { CustomBowlIngredient, MenuItem } from '../types/restaurant';

export { heroBowlImg, salmonImg, acaiImg, greenSaladImg, farmHarvestImg };

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'bowl-harvest',
    name: 'Artisan Rainbow Harvest Bowl',
    tagline: 'Signature superfood bowl with slow-roasted roots',
    description: 'Tricolor organic Andean quinoa, maple-roasted sweet potato cubes, crisp edamame, sliced Haas avocado, purple shredded cabbage, and fresh microgreens drizzled with sesame garlic tahini.',
    price: 16.50,
    category: 'bowls',
    image: heroBowlImg,
    calories: 520,
    protein: 19,
    carbs: 62,
    fat: 22,
    fiber: 14,
    allergens: ['Sesame', 'Soy'],
    tags: ['Vegan', 'Gluten-Free', 'Organic'],
    farmSource: 'Rooted Earth Organic Farm, Salinas Valley',
    popular: true,
    chefPick: true,
    customizable: true,
    customOptions: [
      {
        name: 'Base Grain / Greens',
        options: [
          { id: 'quinoa', label: 'Tricolor Quinoa', priceDelta: 0, calories: 140 },
          { id: 'greens', label: 'Wild Baby Arugula & Kale', priceDelta: 0, calories: 35 },
          { id: 'rice', label: 'Sprouted Black Rice', priceDelta: 1.00, calories: 160 }
        ]
      },
      {
        name: 'Extra Boost',
        options: [
          { id: 'tofu', label: 'Crisp Organic Tofu (+8g protein)', priceDelta: 2.50, protein: 8, calories: 85 },
          { id: 'avocado_extra', label: 'Extra 1/2 Haas Avocado', priceDelta: 2.00, calories: 120 },
          { id: 'hemp', label: 'Organic Hemp Hearts Sprinkle', priceDelta: 1.00, protein: 5, calories: 55 }
        ]
      }
    ]
  },
  {
    id: 'mains-salmon',
    name: 'Wild Pacific Salmon & Quinoa',
    tagline: 'Sustainably caught fillet with lemon-herb emulsion',
    description: 'Crispy skin wild-caught salmon resting on warm ancient grains, charred broccolini florets, blistered heirloom cherry tomatoes, cold-pressed olive oil, and a verdant Meyer lemon parsley drizzle.',
    price: 23.00,
    category: 'mains',
    image: salmonImg,
    calories: 580,
    protein: 42,
    carbs: 38,
    fat: 28,
    fiber: 8,
    allergens: ['Fish'],
    tags: ['High Protein', 'Gluten-Free', 'Dairy-Free'],
    farmSource: 'Wild Seafood Guild, Monterey Bay & Sun Valley Produce',
    popular: true,
    chefPick: true,
    customizable: true,
    customOptions: [
      {
        name: 'Preparation Style',
        options: [
          { id: 'pan_seared', label: 'Pan-Seared Crispy Skin', priceDelta: 0 },
          { id: 'poached', label: 'Gentle Herb Poached (Lighter)', priceDelta: 0 }
        ]
      },
      {
        name: 'Carb Swap',
        options: [
          { id: 'grain', label: 'Standard Ancient Grains', priceDelta: 0 },
          { id: 'cauli', label: 'Cauliflower & Parsnip Puree (Keto)', priceDelta: 1.50, calories: -90 }
        ]
      }
    ]
  },
  {
    id: 'salad-green-goddess',
    name: 'Verde Green Goddess Crunch',
    tagline: 'Crisp raw botanicals with crushed pistachio crumble',
    description: 'Ribboned English cucumbers, Romanesco cauliflower florets, organic dinosaur kale, diced ripe avocado, Sicilian pistachios, and fresh dill tossed in a creamy avocado-herb dressing.',
    price: 15.00,
    category: 'salads',
    image: greenSaladImg,
    calories: 380,
    protein: 14,
    carbs: 24,
    fat: 26,
    fiber: 11,
    allergens: ['Tree Nuts (Pistachio)'],
    tags: ['Vegan', 'Gluten-Free', 'Keto', 'Organic'],
    farmSource: 'Windy Hill Greens Co., Watsonville',
    popular: true,
    chefPick: false,
    customizable: true,
    customOptions: [
      {
        name: 'Protein Add-On',
        options: [
          { id: 'none', label: 'No Extra Protein', priceDelta: 0 },
          { id: 'chicken', label: 'Pasture-Raised Herbed Chicken (+32g)', priceDelta: 5.50, protein: 32, calories: 180 },
          { id: 'tempeh', label: 'Smoked Organic Tempeh (+18g)', priceDelta: 4.00, protein: 18, calories: 150 }
        ]
      }
    ]
  },
  {
    id: 'dessert-acai-superbowl',
    name: 'Amazonian Açaí Superfood Bowl',
    tagline: 'Antioxidant-dense smoothie bowl with raw nut butter swirl',
    description: 'Thick organic wild açaí blended with wild blueberries and banana, topped with golden toasted coconut ribbons, black chia seeds, raw organic almond butter, and bee-friendly local honey.',
    price: 13.50,
    category: 'desserts',
    image: acaiImg,
    calories: 420,
    protein: 11,
    carbs: 58,
    fat: 16,
    fiber: 12,
    allergens: ['Tree Nuts (Almond)'],
    tags: ['Vegetarian', 'Gluten-Free', 'Organic'],
    farmSource: 'Fair-Trade Pará Co-op & Coastal Apiaries',
    popular: true,
    chefPick: false,
    customizable: true,
    customOptions: [
      {
        name: 'Nut Butter Selection',
        options: [
          { id: 'almond', label: 'Raw Almond Butter', priceDelta: 0 },
          { id: 'peanut', label: 'Stoneground Peanut Butter', priceDelta: 0 },
          { id: 'sunflower', label: 'Sunflower Seed Butter (Nut-Free)', priceDelta: 0 }
        ]
      },
      {
        name: 'Sweetener Choice',
        options: [
          { id: 'honey', label: 'Wildflower Raw Honey', priceDelta: 0 },
          { id: 'maple', label: 'Pure Vermont Maple Syrup (100% Vegan)', priceDelta: 0 },
          { id: 'unsweetened', label: 'No Added Sweetener', priceDelta: 0 }
        ]
      }
    ]
  },
  {
    id: 'bowl-truffle-tempeh',
    name: 'Wild Mushroom & Smoked Tempeh Bowl',
    tagline: 'Earthy maitake and shiitake with sprouted brown rice',
    description: 'Pan-seared foraged maitake & king oyster mushrooms, smoky artisan tempeh, warm brown basmati, shaved rainbow carrots, sesame oil glaze, and a drizzle of black truffle tamari vinaigrette.',
    price: 17.50,
    category: 'bowls',
    image: heroBowlImg,
    calories: 490,
    protein: 26,
    carbs: 56,
    fat: 18,
    fiber: 13,
    allergens: ['Soy'],
    tags: ['Vegan', 'High Protein', 'Gluten-Free'],
    farmSource: 'Far West Fungi, Santa Cruz Mountains',
    popular: false,
    chefPick: true,
    customizable: true
  },
  {
    id: 'mains-herb-steak',
    name: 'Grass-Fed Chimichurri Skirt Steak',
    tagline: '100% pasture-raised beef with rustic herb chimichurri',
    description: 'Char-grilled grass-fed skirt steak sliced thin over roasted fingerling potatoes, sweet charred onions, grilled asparagus spears, and a piquant cold-pressed olive oil chimichurri.',
    price: 24.50,
    category: 'mains',
    image: salmonImg,
    calories: 610,
    protein: 44,
    carbs: 32,
    fat: 32,
    fiber: 6,
    allergens: [],
    tags: ['High Protein', 'Gluten-Free', 'Dairy-Free'],
    farmSource: 'Marin Sun Farms, Point Reyes',
    popular: true,
    chefPick: false,
    customizable: true
  },
  {
    id: 'salad-mediterranean-chickpea',
    name: 'Sprouted Chickpea & Za’atar Salad',
    tagline: 'Sunny herbs, Persian cucumbers & organic kalamata olives',
    description: 'Crisp sprouted chickpeas, organic sheep milk feta, heirloom cherry tomatoes, kalamata olives, radishes, and mint tossed in an unfiltered olive oil and wild za’atar lemon dressing.',
    price: 14.50,
    category: 'salads',
    image: greenSaladImg,
    calories: 410,
    protein: 16,
    carbs: 38,
    fat: 22,
    fiber: 10,
    allergens: ['Dairy'],
    tags: ['Vegetarian', 'Gluten-Free', 'High Protein'],
    farmSource: 'Cuyama Orchards & Valley Greek Dairy',
    popular: false,
    chefPick: false,
    customizable: true
  },
  {
    id: 'juice-chlorophyll-green',
    name: 'Chlorophyll Pure Detox',
    tagline: 'Cold-pressed crisp celery, cucumber, kale & green apple',
    description: '100% raw unpasteurized cold-pressed elixir featuring organic dinosaur kale, crisp celery stalks, English cucumber, granny smith apple, ginger root, and fresh lime juice.',
    price: 8.50,
    category: 'juices',
    image: greenSaladImg,
    calories: 110,
    protein: 3,
    carbs: 24,
    fat: 0,
    fiber: 2,
    allergens: [],
    tags: ['Vegan', 'Gluten-Free', 'Organic'],
    farmSource: 'Cold-pressed fresh daily at 5:00 AM',
    popular: true,
    chefPick: false,
    customizable: false
  },
  {
    id: 'juice-golden-turmeric',
    name: 'Golden Glow Turmeric Tonic',
    tagline: 'Peruvian ginger, fresh turmeric root & Valencia orange',
    description: 'Anti-inflammatory wellness tonic with cold-pressed turmeric, fiery Peruvian ginger, fresh Valencia orange, carrot nectar, lemon, and a touch of black pepper for maximum curcumin absorption.',
    price: 8.50,
    category: 'juices',
    image: heroBowlImg,
    calories: 125,
    protein: 2,
    carbs: 28,
    fat: 0.5,
    fiber: 1,
    allergens: [],
    tags: ['Vegan', 'Gluten-Free', 'Organic'],
    farmSource: 'Kauai Organic Turmeric & Local Citrus Groves',
    popular: false,
    chefPick: true,
    customizable: false
  },
  {
    id: 'dessert-cacao-mousse',
    name: 'Raw Cacao & Haas Avocado Mousse',
    tagline: 'Silky, rich, decadent yet purely plant-based',
    description: 'Velvety blend of ripe Haas avocado, cold-pressed raw Peruvian cacao, pure maple syrup, and vanilla bean, topped with flaky Maldon salt and toasted hazelnut praline.',
    price: 9.50,
    category: 'desserts',
    image: acaiImg,
    calories: 280,
    protein: 6,
    carbs: 26,
    fat: 18,
    fiber: 9,
    allergens: ['Tree Nuts (Hazelnut)'],
    tags: ['Vegan', 'Gluten-Free', 'Organic'],
    farmSource: 'Heirloom Cacao Co-op & California Avocado Orchards',
    popular: false,
    chefPick: true,
    customizable: false
  }
];

export const CUSTOM_BOWL_INGREDIENTS: CustomBowlIngredient[] = [
  // Bases
  { id: 'b-quinoa', name: 'Organic Tricolor Quinoa', category: 'base', calories: 140, protein: 5, carbs: 26, fat: 2.5, price: 3.50, dietary: ['Vegan', 'Gluten-Free'] },
  { id: 'b-cauli', name: 'Riced Cauliflower & Herbs', category: 'base', calories: 45, protein: 3, carbs: 7, fat: 0.5, price: 3.50, dietary: ['Vegan', 'Gluten-Free', 'Keto'] },
  { id: 'b-wildrice', name: 'Sprouted Forbidden Black Rice', category: 'base', calories: 160, protein: 4, carbs: 34, fat: 1.5, price: 4.00, dietary: ['Vegan', 'Gluten-Free'] },
  { id: 'b-greens', name: 'Baby Dinosaur Kale & Arugula', category: 'base', calories: 30, protein: 3, carbs: 4, fat: 0.5, price: 3.00, dietary: ['Vegan', 'Gluten-Free', 'Keto'] },

  // Proteins
  { id: 'p-salmon', name: 'Pan-Seared Wild Salmon (4oz)', category: 'protein', calories: 210, protein: 28, carbs: 0, fat: 11, price: 7.00, dietary: ['Gluten-Free', 'High Protein'] },
  { id: 'p-chicken', name: 'Pasture Herb Chicken (5oz)', category: 'protein', calories: 190, protein: 34, carbs: 0, fat: 5, price: 5.50, dietary: ['Gluten-Free', 'High Protein'] },
  { id: 'p-tempeh', name: 'Smoked Artisan Tempeh (4oz)', category: 'protein', calories: 160, protein: 18, carbs: 9, fat: 7, price: 4.50, dietary: ['Vegan', 'Gluten-Free', 'High Protein'] },
  { id: 'p-tofu', name: 'Golden Turmeric Baked Tofu', category: 'protein', calories: 140, protein: 15, carbs: 4, fat: 8, price: 4.00, dietary: ['Vegan', 'Gluten-Free'] },

  // Veggies
  { id: 'v-avocado', name: 'Fresh Haas Avocado (1/2)', category: 'veggies', calories: 120, protein: 1.5, carbs: 6, fat: 11, price: 2.00, dietary: ['Vegan', 'Gluten-Free', 'Keto'] },
  { id: 'v-sweetpotato', name: 'Roasted Spiced Sweet Potato', category: 'veggies', calories: 90, protein: 1.5, carbs: 21, fat: 0.5, price: 1.50, dietary: ['Vegan', 'Gluten-Free'] },
  { id: 'v-edamame', name: 'Steamed Organic Edamame', category: 'veggies', calories: 80, protein: 8, carbs: 6, fat: 3.5, price: 1.50, dietary: ['Vegan', 'Gluten-Free', 'High Protein'] },
  { id: 'v-tomatoes', name: 'Blistered Cherry Tomatoes', category: 'veggies', calories: 40, protein: 1, carbs: 7, fat: 1, price: 1.25, dietary: ['Vegan', 'Gluten-Free'] },
  { id: 'v-mushrooms', name: 'Roasted Shiitake & Maitake', category: 'veggies', calories: 50, protein: 3, carbs: 8, fat: 0.5, price: 2.50, dietary: ['Vegan', 'Gluten-Free'] },
  { id: 'v-cabbage', name: 'Fermented Pickled Red Cabbage', category: 'veggies', calories: 25, protein: 1, carbs: 5, fat: 0, price: 1.00, dietary: ['Vegan', 'Gluten-Free'] },

  // Crunch
  { id: 'c-pumpkin', name: 'Toasted Spiced Pumpkin Seeds', category: 'crunch', calories: 60, protein: 3, carbs: 2, fat: 5, price: 1.00, dietary: ['Vegan', 'Gluten-Free', 'Keto'] },
  { id: 'c-hemp', name: 'Shelled Hemp Hearts', category: 'crunch', calories: 55, protein: 3.5, carbs: 1, fat: 4.5, price: 1.00, dietary: ['Vegan', 'Gluten-Free', 'Keto'] },
  { id: 'c-pistachio', name: 'Crushed Roasted Pistachios', category: 'crunch', calories: 75, protein: 2.5, carbs: 3.5, fat: 6, price: 1.50, dietary: ['Vegan', 'Gluten-Free'] },

  // Dressing
  { id: 'd-tahini', name: 'Creamy Garlic Miso Tahini', category: 'dressing', calories: 95, protein: 2, carbs: 4, fat: 8.5, price: 0.75, dietary: ['Vegan', 'Gluten-Free'] },
  { id: 'd-greengoddess', name: 'Avocado Herb Green Goddess', category: 'dressing', calories: 80, protein: 1, carbs: 3, fat: 7.5, price: 0.75, dietary: ['Vegan', 'Gluten-Free'] },
  { id: 'd-chimichurri', name: 'Fresh Herb Extra Virgin Chimichurri', category: 'dressing', calories: 90, protein: 0.5, carbs: 1, fat: 10, price: 0.75, dietary: ['Vegan', 'Gluten-Free', 'Keto'] },
  { id: 'd-lemonolive', name: 'Unfiltered Meyer Lemon & Cold-Pressed Olive Oil', category: 'dressing', calories: 85, protein: 0, carbs: 1, fat: 9, price: 0.50, dietary: ['Vegan', 'Gluten-Free', 'Keto'] }
];

export const TESTIMONIALS = [
  {
    id: 't-1',
    name: 'Elena Rostova',
    role: 'Ultra-Endurance Athlete & Nutritionist',
    quote: 'Finding restaurant food cooked with zero canola oil and verified local organic produce is almost impossible. Verde is my sanctuary before long training blocks. The Wild Salmon Bowl gives me steady clean energy with zero inflammation.',
    dish: 'Wild Pacific Salmon & Quinoa',
    rating: 5
  },
  {
    id: 't-2',
    name: 'Marcus Thorne',
    role: 'Software Architect & Father',
    quote: 'The Custom Bowl Builder is addictive. My kids adore the roasted sweet potato harvest bowls, and I can track my exact macros to the gram. The quality of their seasonal greens tastes like it was picked an hour ago.',
    dish: 'Rainbow Harvest Bowl',
    rating: 5
  },
  {
    id: 't-3',
    name: 'Dr. Sarah Lin',
    role: 'Integrative Medicine Physician',
    quote: 'I prescribe lifestyle medicine, and I send my patients directly to Verde. The diversity of polyphenols, fermented toppings, and healthy fats is genuinely restorative. A clinic on a plate.',
    dish: 'Verde Green Goddess Crunch',
    rating: 5
  }
];

export const FARM_PARTNERS = [
  { name: 'Rooted Earth Farms', location: 'Salinas Valley, CA', focus: 'Biodynamic heirloom root vegetables & greens' },
  { name: 'Far West Fungi', location: 'Santa Cruz, CA', focus: 'Organic specialty culinary & medicinal mushrooms' },
  { name: 'Marin Sun Farms', location: 'Point Reyes, CA', focus: '100% grass-fed and finished pasture livestock' },
  { name: 'Sun Valley Apiaries', location: 'Carmel Valley, CA', focus: 'Raw unpasteurized cold-harvest wildflower honey' }
];
