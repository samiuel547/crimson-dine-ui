import { create } from 'zustand';
import { CartItem, Restaurant, User } from '../types';

interface AppState {
  user: User | null;
  onboarded: boolean;
  cart: CartItem[];
  selectedRestaurant: Restaurant | null;
  
  setUser: (user: User | null) => void;
  setOnboarded: (value: boolean) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  setSelectedRestaurant: (restaurant: Restaurant | null) => void;
}

export const useStore = create<AppState>((set) => ({
  user: null,
  onboarded: false,
  cart: [],
  selectedRestaurant: null,

  setUser: (user) => set({ user }),
  setOnboarded: (onboarded) => set({ onboarded }),
  
  addToCart: (item) => set((state) => {
    const existing = state.cart.find((i) => i.id === item.id);
    if (existing) {
      return {
        cart: state.cart.map((i) => 
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        )
      };
    }
    return { cart: [...state.cart, item] };
  }),

  removeFromCart: (itemId) => set((state) => ({
    cart: state.cart.filter((i) => i.id !== itemId)
  })),

  updateQuantity: (itemId, quantity) => set((state) => ({
    cart: state.cart.map((i) => (i.id === itemId ? { ...i, quantity } : i))
  })),

  clearCart: () => set({ cart: [] }),
  
  setSelectedRestaurant: (restaurant) => set({ selectedRestaurant: restaurant }),
}));