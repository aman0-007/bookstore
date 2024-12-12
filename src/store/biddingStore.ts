import { create } from 'zustand';
import { Book, Bid } from '../types/book';
import { v4 as uuidv4 } from 'uuid';

interface BiddingStore {
  placeBid: (bookId: string, amount: number, userId: string) => void;
  getHighestBid: (bookId: string) => number | null;
  getBidHistory: (bookId: string) => Bid[];
  isUserHighestBidder: (bookId: string, userId: string) => boolean;
}

export const useBiddingStore = create<BiddingStore>((set, get) => ({
  placeBid: (bookId, amount, userId) => {
    const book = useBookStore.getState().books.find(b => b.id === bookId);
    if (!book?.auction) return;

    const bid: Bid = {
      id: uuidv4(),
      userId,
      amount,
      timestamp: new Date(),
    };

    useBookStore.getState().updateBook(bookId, {
      auction: {
        ...book.auction,
        currentBid: amount,
        bidHistory: [...book.auction.bidHistory, bid],
      },
    });
  },

  getHighestBid: (bookId) => {
    const book = useBookStore.getState().books.find(b => b.id === bookId);
    return book?.auction?.currentBid || null;
  },

  getBidHistory: (bookId) => {
    const book = useBookStore.getState().books.find(b => b.id === bookId);
    return book?.auction?.bidHistory || [];
  },

  isUserHighestBidder: (bookId, userId) => {
    const book = useBookStore.getState().books.find(b => b.id === bookId);
    if (!book?.auction?.bidHistory.length) return false;
    
    const lastBid = book.auction.bidHistory[book.auction.bidHistory.length - 1];
    return lastBid.userId === userId;
  },
}));