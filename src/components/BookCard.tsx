import React from 'react';
import { Book } from '../types';
import { formatDistanceToNow } from 'date-fns';
import { Star, Clock } from 'lucide-react';

interface BookCardProps {
  book: Book;
}

export const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const isAuction = !!book.auction;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img
        src={book.imageUrl}
        alt={book.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-500">{book.type}</span>
          <span className={`px-2 py-1 rounded-full text-xs ${
            book.condition === 'new' ? 'bg-green-100 text-green-800' :
            book.condition === 'like-new' ? 'bg-blue-100 text-blue-800' :
            'bg-yellow-100 text-yellow-800'
          }`}>
            {book.condition}
          </span>
        </div>
        
        <h3 className="text-lg font-semibold mb-1">{book.title}</h3>
        <p className="text-gray-600 text-sm mb-2">{book.author}</p>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 mr-1" />
            <span className="text-sm text-gray-600">
              {book.seller.rating} ({book.seller.reviewCount})
            </span>
          </div>
          {isAuction ? (
            <div className="flex items-center text-red-600">
              <Clock className="w-4 h-4 mr-1" />
              <span className="text-sm">
                {formatDistanceToNow(book.auction.endTime, { addSuffix: true })}
              </span>
            </div>
          ) : null}
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold">
            ${isAuction ? book.auction.currentBid : book.price}
          </span>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            {isAuction ? 'Place Bid' : 'Buy Now'}
          </button>
        </div>
      </div>
    </div>
  );
};