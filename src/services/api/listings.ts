import { Book } from '../../types/book';

const API_URL = 'http://localhost:5000/api';

export const listingsApi = {
  getAllListings: async (): Promise<Book[]> => {
    const response = await fetch(`${API_URL}/listings/all`);
    if (!response.ok) throw new Error('Failed to fetch listings');
    return response.json();
  },

  getAuctionListings: async (): Promise<Book[]> => {
    const response = await fetch(`${API_URL}/listings/auctions`);
    if (!response.ok) throw new Error('Failed to fetch auctions');
    return response.json();
  },

  placeBid: async (listingId: string, amount: number, token: string): Promise<void> => {
    const response = await fetch(`${API_URL}/listings/${listingId}/bid`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ amount }),
    });
    if (!response.ok) throw new Error('Failed to place bid');
  },
};