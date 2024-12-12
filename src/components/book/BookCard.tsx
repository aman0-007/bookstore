import React from 'react';
import { Book } from '../../types/book';
import { formatDistanceToNow } from 'date-fns';
import { Star, Clock } from 'lucide-react';
import { BookImage } from './BookImage';
import { BookConditionBadge } from './BookConditionBadge';
import { BookPrice } from './BookPrice';

interface BookCardProps {
  book: Book;
  onBuyClick?: (book: Book) => void;
  onBidClick?: (book: Book) => void;
}

export const BookCard: React.FC<BookCardProps> = ({ 
  book, 
  onBuyClick,
  onBidClick 
}) => {
  const isAuction = !!book.auction;

  const handleActionClick = () => {
    if (isAuction) {
      onBidClick?.(book);
    } else {
      onBuyClick?.(book);
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
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-500">{book.type}</span>
          <BookConditionBadge condition={book.condition} />
        </div>
        
        <h3 className="text-lg font-semibold mb-1 line-clamp-1">{book.title}</h3>
        <p className="text-gray-600 text-sm mb-2 line-clamp-1">{book.author}</p>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 mr-1" />
            <span className="text-sm text-gray-600">
              {book.seller.rating} ({book.seller.reviewCount})
            </span>
          </div>
          {isAuction && book.auction && (
            <div className="flex items-center text-red-600">
              <Clock className="w-4 h-4 mr-1" />
              <span className="text-sm">
                {formatDistanceToNow(book.auction.endTime, { addSuffix: true })}
              </span>
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <BookPrice book={book} />
          <button 
            onClick={handleActionClick}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {isAuction ? 'Place Bid' : 'Buy Now'}
          </button>
        </div>
      </div>
    </div>
  );
};