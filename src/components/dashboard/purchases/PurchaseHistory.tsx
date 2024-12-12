import React from 'react';
import { format } from 'date-fns';
import { Book } from '../../../types/book';
import { BookImage } from '../../book/BookImage';

interface PurchaseHistoryProps {
  userId: string;
}

// This would typically come from a purchases store
const mockPurchases = [
  {
    id: '1',
    book: {
      id: '1',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800',
      price: 14.99,
    } as Book,
    purchaseDate: new Date(),
    status: 'Delivered',
  },
];

export const PurchaseHistory: React.FC<PurchaseHistoryProps> = () => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="divide-y divide-gray-200">
        {mockPurchases.map((purchase) => (
          <div key={purchase.id} className="p-6 flex items-center">
            <BookImage
              src={purchase.book.imageUrl}
              alt={purchase.book.title}
              className="w-20 h-20 object-cover rounded"
            />
            
            <div className="ml-6 flex-1">
              <h3 className="text-lg font-medium text-gray-900">
                {purchase.book.title}
              </h3>
              <p className="text-sm text-gray-500">{purchase.book.author}</p>
              <p className="text-sm text-gray-500">
                Purchased on {format(purchase.purchaseDate, 'MMM d, yyyy')}
              </p>
            </div>
            
            <div className="ml-6 text-right">
              <p className="text-lg font-medium text-gray-900">
                ${purchase.book.price}
              </p>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {purchase.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};