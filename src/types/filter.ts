export type Filter = {
  genre?: string;
  condition?: string;
  type?: 'new' | 'used' | 'auction';
  minPrice?: number;
  maxPrice?: number;
  author?: string;
  searchQuery?: string;
  sortBy?: 'price-asc' | 'price-desc' | 'date-new' | 'date-old' | 'rating';
};