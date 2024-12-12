import React from 'react';
import { Search } from 'lucide-react';

export const ListingFilters: React.FC = () => {
  return (
    <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow">
      <div className="relative flex-1">
        <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search your listings..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <select className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
        <option value="">All Types</option>
        <option value="new">New</option>
        <option value="used">Used</option>
        <option value="auction">Auction</option>
      </select>

      <select className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
        <option value="">Sort By</option>
        <option value="date-new">Newest First</option>
        <option value="date-old">Oldest First</option>
        <option value="price-high">Price: High to Low</option>
        <option value="price-low">Price: Low to High</option>
      </select>
    </div>
  );
};