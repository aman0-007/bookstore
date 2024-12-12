import React from 'react';
import { Book } from '../../types/book';

interface BookPriceProps {
  book: Book;
  className?: string;
}

export const BookPrice: React.FC<BookPriceProps> = ({ book, className = '' }) => {
  const isAuction = !!book.auction;
  const price = isAuction ? book.auction.currentBid : book.price;

  return (
    <div className={`flex flex-col ${className}`}>
      <span className="text-xl font-bold">${price.toFixed(2)}</span>
      {isAuction && (
        <span className="text-xs text-gray-500">
          Min bid: ${book.auction.minBid.toFixed(2)}
        </span>
      )}
    </div>
  );
};