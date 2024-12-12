import React from 'react';
import { ShoppingBag, TrendingUp, CreditCard } from 'lucide-react';

interface PurchaseStatsProps {
  userId: string;
}

export const PurchaseStats: React.FC<PurchaseStatsProps> = () => {
  const stats = [
    {
      label: 'Total Purchases',
      value: '12',
      icon: ShoppingBag,
      color: 'bg-blue-500',
    },
    {
      label: 'Active Bids',
      value: '3',
      icon: TrendingUp,
      color: 'bg-purple-500',
    },
    {
      label: 'Total Spent',
      value: '$249.99',
      icon: CreditCard,
      color: 'bg-green-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
  );
};