export type MenuCategory = 'all' | 'bowls' | 'salads' | 'mains' | 'juices' | 'desserts';

export type DietaryTag = 'Vegan' | 'Vegetarian' | 'Gluten-Free' | 'High Protein' | 'Keto' | 'Organic' | 'Dairy-Free';

export interface CustomOptionGroup {
  name: string;
  required?: boolean;
  options: {
    id: string;
    label: string;
    priceDelta?: number;
    calories?: number;
    protein?: number;
  }[];
}

export interface MenuItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  category: 'bowls' | 'salads' | 'mains' | 'juices' | 'desserts';
  image: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  allergens: string[];
  tags: DietaryTag[];
  farmSource?: string;
  popular?: boolean;
  chefPick?: boolean;
  customizable?: boolean;
  customOptions?: CustomOptionGroup[];
}

export interface CartItem {
  cartId: string;
  menuItem: MenuItem;
  quantity: number;
  selectedCustomizations?: Record<string, string>;
  specialInstructions?: string;
  unitPrice: number;
}

export interface ReservationData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  seatingArea: 'indoor' | 'patio' | 'greenhouse' | 'chef_counter';
  dietaryNotes: string;
}

export interface CustomBowlIngredient {
  id: string;
  name: string;
  category: 'base' | 'protein' | 'veggies' | 'crunch' | 'dressing';
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  price: number;
  dietary: DietaryTag[];
}
