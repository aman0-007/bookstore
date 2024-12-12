import { create } from 'zustand';
import type { Book } from '../types/book';
import type { Filter } from '../types/filter';

interface BookStore {
  books: Book[];
  filters: Filter;
  setFilters: (filters: Filter) => void;
  filteredBooks: () => Book[];
  addBook: (book: Book) => void;
  updateBook: (id: string, book: Partial<Book>) => void;
  removeBook: (id: string) => void;
}

const sortBooks = (books: Book[], sortBy?: string) => {
  if (!sortBy) return books;

  return [...books].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'rating':
        return b.seller.rating - a.seller.rating;
      default:
        return 0;
    }
  });
};

export const useBookStore = create<BookStore>((set, get) => ({
  books: [
    {
      id: '1',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      isbn: '9780743273565',
      price: 14.99,
      condition: 'new',
      type: 'new',
      genre: 'Classic Literature',
      description: 'A classic novel of the Jazz Age',
      imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800',
      seller: {
        id: '1',
        name: 'Official Bookstore',
        email: 'store@example.com',
        rating: 4.9,
        reviewCount: 2547,
        joinedDate: new Date('2020-01-01'),
      },
    },
    // Add more sample books here
  ],
  filters: {},
  setFilters: (filters) => set({ filters }),
  filteredBooks: () => {
    const { books, filters } = get();
    return books.filter((book) => {
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        if (!book.title.toLowerCase().includes(query) &&
            !book.author.toLowerCase().includes(query)) {
          return false;
        }
      }
      if (filters.genre && book.genre !== filters.genre) return false;
      if (filters.condition && book.condition !== filters.condition) return false;
      if (filters.type && book.type !== filters.type) return false;
      if (filters.minPrice && book.price < filters.minPrice) return false;
      if (filters.maxPrice && book.price > filters.maxPrice) return false;
      if (filters.author && !book.author.toLowerCase().includes(filters.author.toLowerCase())) return false;
      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.price - b.price;
      if (filters.sortBy === 'price-desc') return b.price - a.price;
      return 0;
    });
  },
  addBook: (book) => set((state) => ({ books: [...state.books, book] })),
  updateBook: (id, bookUpdate) => set((state) => ({
    books: state.books.map((book) =>
      book.id === id ? { ...book, ...bookUpdate } : book
    ),
  })),
  removeBook: (id) => set((state) => ({
    books: state.books.filter((book) => book.id !== id),
  })),
}));