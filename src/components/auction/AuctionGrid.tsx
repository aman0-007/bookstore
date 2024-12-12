import React from 'react';
import { Book } from '../../types/book';
import { AuctionCard } from './AuctionCard';

interface AuctionGridProps {
  auctions: Book[];
}

export const AuctionGrid: React.FC<AuctionGridProps> = ({ auctions }) => {
  if (auctions.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
        <p className="text-gray-500">No active auctions at the moment.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {auctions.map((auction) => (
        <AuctionCard key={auction.id} book={auction} />
      ))}
    </div>
  );
};