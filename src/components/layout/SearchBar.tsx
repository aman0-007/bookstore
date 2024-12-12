import React from 'react';
import { Search } from 'lucide-react';
import { useBookStore } from '../../store/bookStore';

export const SearchBar: React.FC = () => {
  const { filters, setFilters } = useBookStore();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, searchQuery: e.target.value });
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search for books..."
        value={filters.searchQuery || ''}
        onChange={handleSearch}
        className="w-full px-10 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
    </div>
  );
};