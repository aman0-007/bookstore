import React from 'react';
import { Book } from '../../types/book';
import { BookCard } from './BookCard';
import { useCartStore } from '../../store/cartStore';
import { useBiddingStore } from '../../store/biddingStore';

interface BookGridProps {
  books: Book[];
}

export const BookGrid: React.FC<BookGridProps> = ({ books }) => {
  const { addItem } = useCartStore();
  const { placeBid } = useBiddingStore();

  const handleBuyClick = (book: Book) => {
    addItem(book);
  };

  const handleBidClick = (book: Book) => {
    // Open bid modal or handle bid action
    console.log('Bid clicked for book:', book);
  };

  if (books.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No books found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onBuyClick={handleBuyClick}
          onBidClick={handleBidClick}
        />
      ))}
    </div>
  );
};