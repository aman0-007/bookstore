import React from 'react';
import { Filter } from '../../types/filter';
import { useBookStore } from '../../store/bookStore';
import { Search, SlidersHorizontal } from 'lucide-react';
import { FilterSelect } from './FilterSelect';
import { PriceRangeFilter } from './PriceRangeFilter';

const CONDITION_OPTIONS = [
  { value: 'new', label: 'New' },
  { value: 'like-new', label: 'Like New' },
  { value: 'very-good', label: 'Very Good' },
  { value: 'good', label: 'Good' },
  { value: 'acceptable', label: 'Acceptable' },
];

const TYPE_OPTIONS = [
  { value: 'new', label: 'New' },
  { value: 'used', label: 'Used' },
  { value: 'auction', label: 'Auction' },
];

const SORT_OPTIONS = [
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'date-new', label: 'Newest First' },
  { value: 'date-old', label: 'Oldest First' },
  { value: 'rating', label: 'Best Rating' },
];

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
            value={filters.author || ''}
          />
        </div>
      </div>

      <div className="space-y-4">
        <FilterSelect
          label="Sort By"
          value={filters.sortBy || ''}
          onChange={(value) => handleFilterChange('sortBy', value)}
          options={SORT_OPTIONS}
        />

        <FilterSelect
          label="Book Type"
          value={filters.type || ''}
          onChange={(value) => handleFilterChange('type', value)}
          options={TYPE_OPTIONS}
        />

        <FilterSelect
          label="Condition"
          value={filters.condition || ''}
          onChange={(value) => handleFilterChange('condition', value)}
          options={CONDITION_OPTIONS}
        />

        <PriceRangeFilter
          minPrice={filters.minPrice}
          maxPrice={filters.maxPrice}
          onMinPriceChange={(value) => handleFilterChange('minPrice', value)}
          onMaxPriceChange={(value) => handleFilterChange('maxPrice', value)}
        />
      </div>
    </div>
  );
};