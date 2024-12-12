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
  auction?: Auction;
};

export type Auction = {
  endTime: Date;
  currentBid: number;
  minBid: number;
  reservePrice?: number;
  bidHistory: Bid[];
};

export type Bid = {
  id: string;
  userId: string;
  amount: number;
  timestamp: Date;
};