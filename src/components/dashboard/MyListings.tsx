import React, { useEffect } from 'react';
import { useListingStore } from '../../store/listingStore';
import { useAuthStore } from '../../store/authStore';
import { ListingGrid } from './listings/ListingGrid';
import { ListingStats } from './listings/ListingStats';
import { ListingFilters } from './listings/ListingFilters';

export const MyListings: React.FC = () => {
  const { user } = useAuthStore();
  const { getListingsByUser, fetchUserListings } = useListingStore();
  const userListings = getListingsByUser(user?.id || '');

  useEffect(() => {
    fetchUserListings().catch(console.error);
  }, [fetchUserListings]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">My Listings</h1>
        <ListingStats listings={userListings} />
      </div>

      <ListingFilters />
      <ListingGrid listings={userListings} />
    </div>
  );
};