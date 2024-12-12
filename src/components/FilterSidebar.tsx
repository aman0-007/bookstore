import React from 'react';
import { Filter } from '../types';
import { useBookStore } from '../store/bookStore';
import { Search, SlidersHorizontal } from 'lucide-react';

export const FilterSidebar: React.FC = () => {
  const { filters, setFilters } = useBookStore();

  const handleFilterChange = (key: keyof Filter, value: string | number) => {
    setFilters({ ...filters, [key]: value });
  };

  return (
    <div className="w-64 bg-white p-4 shadow-md rounded-lg">
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <SlidersHorizontal className="w-5 h-5 mr-2" />
          <h2 className="text-lg font-semibold">Filters</h2>
        </div>
        
        <div className="relative mb-4">
          <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search by author..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onChange={(e) => handleFilterChange('author', e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Book Type</label>
          <select
            className="w-full p-2 border rounded-lg"
            onChange={(e) => handleFilterChange('type', e.target.value)}
            value={filters.type || ''}
          >
            <option value="">All Types</option>
            <option value="new">New</option>
            <option value="used">Used</option>
            <option value="auction">Auction</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Condition</label>
          <select
            className="w-full p-2 border rounded-lg"
            onChange={(e) => handleFilterChange('condition', e.target.value)}
            value={filters.condition || ''}
          >
            <option value="">All Conditions</option>
            <option value="new">New</option>
            <option value="like-new">Like New</option>
            <option value="very-good">Very Good</option>
            <option value="good">Good</option>
            <option value="acceptable">Acceptable</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Price Range</label>
          <div className="flex space-x-2">
            <input
              type="number"
              placeholder="Min"
              className="w-1/2 p-2 border rounded-lg"
              onChange={(e) => handleFilterChange('minPrice', Number(e.target.value))}
            />
            <input
              type="number"
              placeholder="Max"
              className="w-1/2 p-2 border rounded-lg"
              onChange={(e) => handleFilterChange('maxPrice', Number(e.target.value))}
            />
          </div>
        </div>
      </div>
    </div>
  );
};