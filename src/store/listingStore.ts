import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { Book } from '../types/book';
import { useAuthStore } from './authStore';

interface ListingStore {
  listings: Book[];
  createListing: (listing: Omit<Book, 'id' | 'seller'>) => Promise<string>;
  updateListing: (id: string, listing: Partial<Book>) => Promise<void>;
  deleteListing: (id: string) => Promise<void>;
  getListingsByUser: (userId: string) => Book[];
  fetchUserListings: () => Promise<void>;
}

export const useListingStore = create<ListingStore>((set, get) => ({
  listings: [],

  createListing: async (listing) => {
    const { token } = useAuthStore.getState();
    if (!token) throw new Error('Not authenticated');

    try {
      const response = await fetch('http://localhost:5000/api/listings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(listing),
      });

      if (!response.ok) throw new Error('Failed to create listing');
      const data = await response.json();
      
      set((state) => ({
        listings: [...state.listings, data],
      }));

      return data.id;
    } catch (error) {
      console.error('Error creating listing:', error);
      throw error;
    }
  },
  
  updateListing: async (id, listing) => {
    const { token } = useAuthStore.getState();
    if (!token) throw new Error('Not authenticated');

    try {
      const response = await fetch(`http://localhost:5000/api/listings/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(listing),
      });

      if (!response.ok) throw new Error('Failed to update listing');
      const data = await response.json();
      
      set((state) => ({
        listings: state.listings.map((item) => 
          item.id === id ? { ...item, ...data } : item
        ),
      }));
    } catch (error) {
      console.error('Error updating listing:', error);
      throw error;
    }
  },
  
  deleteListing: async (id) => {
    const { token } = useAuthStore.getState();
    if (!token) throw new Error('Not authenticated');

    try {
      const response = await fetch(`http://localhost:5000/api/listings/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to delete listing');
      
      set((state) => ({
        listings: state.listings.filter((item) => item.id !== id),
      }));
    } catch (error) {
      console.error('Error deleting listing:', error);
      throw error;
    }
  },
  
  getListingsByUser: (userId) => {
    return get().listings.filter(book => book.seller.id === userId);
  },

  fetchUserListings: async () => {
    const { token } = useAuthStore.getState();
    if (!token) throw new Error('Not authenticated');

    try {
      const response = await fetch('http://localhost:5000/api/listings/user', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch listings');
      const data = await response.json();
      
      set({ listings: data });
    } catch (error) {
      console.error('Error fetching listings:', error);
      throw error;
    }
  },
}));