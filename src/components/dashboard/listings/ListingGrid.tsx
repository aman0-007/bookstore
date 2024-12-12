import React from 'react';
import { Book } from '../../../types/book';
import { ListingCard } from './ListingCard';

interface ListingGridProps {
  listings: Book[];
}

export const ListingGrid: React.FC<ListingGridProps> = ({ listings }) => {
  if (listings.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
        <p className="text-gray-500">You haven't created any listings yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
};