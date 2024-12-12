import React from 'react';
import { useAuthStore } from '../../store/authStore';
import { useListingStore } from '../../store/listingStore';
import { BookOpen, DollarSign, ShoppingCart, TrendingUp } from 'lucide-react';

export const DashboardOverview: React.FC = () => {
  const { user } = useAuthStore();
  const { getListingsByUser } = useListingStore();
  const userListings = getListingsByUser(user?.uid || '');

  const stats = [
    {
      label: 'Active Listings',
      value: userListings.length,
      icon: BookOpen,
      color: 'bg-blue-500',
    },
    {
      label: 'Total Sales',
      value: '$1,234',
      icon: DollarSign,
      color: 'bg-green-500',
    },
    {
      label: 'Books Purchased',
      value: '5',
      icon: ShoppingCart,
      color: 'bg-purple-500',
    },
    {
      label: 'Bids Placed',
      value: '12',
      icon: TrendingUp,
      color: 'bg-yellow-500',
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-lg shadow p-6 flex items-center"
            >
              <div className={`${stat.color} p-3 rounded-lg`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
          {/* Add recent activity list here */}
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Active Bids</h2>
          {/* Add active bids list here */}
        </div>
      </div>
    </div>
  );
};