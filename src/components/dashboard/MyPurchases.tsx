import React from 'react';
import { useAuthStore } from '../../store/authStore';
import { PurchaseHistory } from './purchases/PurchaseHistory';
import { PurchaseStats } from './purchases/PurchaseStats';

export const MyPurchases: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">My Purchases</h1>
      </div>

      <PurchaseStats userId={user?.uid || ''} />
      <PurchaseHistory userId={user?.uid || ''} />
    </div>
  );
};