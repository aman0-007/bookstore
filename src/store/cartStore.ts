import { create } from 'zustand';
import { Book } from '../types/book';

interface CartItem {
  book: Book;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (book: Book) => void;
  removeItem: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  clearCart: () => void;
  total: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  
  addItem: (book) => set((state) => {
    const existingItem = state.items.find(item => item.book.id === book.id);
    if (existingItem) {
      return {
        items: state.items.map(item =>
          item.book.id === book.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    }
    return { items: [...state.items, { book, quantity: 1 }] };
  }),
  
  removeItem: (bookId) => set((state) => ({
    items: state.items.filter(item => item.book.id !== bookId),
  })),
  
  updateQuantity: (bookId, quantity) => set((state) => ({
    items: state.items.map(item =>
      item.book.id === bookId ? { ...item, quantity } : item
    ),
  })),
  
  clearCart: () => set({ items: [] }),
  
  total: () => {
    const { items } = get();
    return items.reduce((total, item) => total + item.book.price * item.quantity, 0);
  },
}));