export type Book = {
  id: string;
  title: string;
  author: string;
  isbn: string;
  price: number;
  condition: 'new' | 'like-new' | 'very-good' | 'good' | 'acceptable';
  type: 'new' | 'used';
  genre: string;
  description: string;
  imageUrl: string;
  seller: User;
  edition?: string;
  publishYear?: number;
  auction?: {
    endTime: Date;
    currentBid: number;
    minBid: number;
    reservePrice?: number;
  };
};

export type User = {
  id: string;
  name: string;
  email: string;
  rating: number;
  reviewCount: number;
  joinedDate: Date;
};

export type Filter = {
  genre?: string;
  condition?: string;
  type?: 'new' | 'used' | 'auction';
  minPrice?: number;
  maxPrice?: number;
  author?: string;
};