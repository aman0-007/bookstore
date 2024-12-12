import React from 'react';
import { Book } from '../../../types/book';
import { ShoppingBag, TrendingUp, DollarSign } from 'lucide-react';

interface ListingStatsProps {
  listings: Book[];
}

export const ListingStats: React.FC<ListingStatsProps> = ({ listings }) => {
  const activeListings = listings.length;
  const totalValue = listings.reduce((sum, listing) => sum + listing.price, 0);
  const auctionListings = listings.filter(listing => listing.auction).length;

  const stats = [
    {
      label: 'Active Listings',
      value: activeListings,
      icon: ShoppingBag,
      color: 'bg-blue-500',
    },
    {
      label: 'Total Value',
      value: `$${totalValue.toFixed(2)}`,
      icon: DollarSign,
      color: 'bg-green-500',
    },
    {
      label: 'Auctions',
      value: auctionListings,
      icon: TrendingUp,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="flex space-x-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="bg-white rounded-lg shadow px-4 py-2 flex items-center"
          >
            <div className={`${stat.color} p-2 rounded-lg`}>
              <Icon className="w-4 h-4 text-white" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">{stat.label}</p>
              <p className="text-lg font-semibold text-gray-900">{stat.value}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};