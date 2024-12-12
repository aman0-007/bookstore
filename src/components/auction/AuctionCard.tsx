import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Book } from '../../types/book';
import { useAuthStore } from '../../store/authStore';
import { listingsApi } from '../../services/api/listings';
import { BookImage } from '../book/BookImage';
import { Clock, TrendingUp } from 'lucide-react';
import { BidModal } from './BidModal';

interface AuctionCardProps {
  book: Book;
}

export const AuctionCard: React.FC<AuctionCardProps> = ({ book }) => {
  const [showBidModal, setShowBidModal] = useState(false);
  const { user, token } = useAuthStore();

  if (!book.auction) return null;

  const handlePlaceBid = async (amount: number) => {
    if (!token) return;
    
    try {
      await listingsApi.placeBid(book.id, amount, token);
      setShowBidModal(false);
      // Optionally refresh the auction data
    } catch (error) {
      console.error('Failed to place bid:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <BookImage
        src={book.imageUrl}
        alt={book.title}
        className="w-full h-48 object-cover"
      />
      
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">{book.title}</h3>
        <p className="text-gray-600 text-sm mb-2">{book.author}</p>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center text-blue-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span className="font-semibold">${book.auction.currentBid}</span>
          </div>
          <div className="flex items-center text-red-600">
            <Clock className="w-4 h-4 mr-1" />
            <span className="text-sm">
              {formatDistanceToNow(new Date(book.auction.endTime), { addSuffix: true })}
            </span>
          </div>
        </div>
        
        <button
          onClick={() => setShowBidModal(true)}
          disabled={!user}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {user ? 'Place Bid' : 'Sign in to Bid'}
        </button>
      </div>

      <BidModal
        book={book}
        isOpen={showBidModal}
        onClose={() => setShowBidModal(false)}
        onSubmit={handlePlaceBid}
      />
    </div>
  );
};