import React from 'react';
import { useQuery } from '../../hooks/useQuery';
import { listingsApi } from '../../services/api/listings';
import { AuctionGrid } from '../auction/AuctionGrid';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { ErrorMessage } from '../ui/ErrorMessage';

export const ActiveAuctions: React.FC = () => {
  const { data: auctions, isLoading, error } = useQuery(
    'active-auctions',
    () => listingsApi.getAuctionListings()
  );

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Active Auctions</h2>
      <AuctionGrid auctions={auctions || []} />
    </section>
  );
};