import React from 'react';

interface PriceRangeFilterProps {
  minPrice: number | undefined;
  maxPrice: number | undefined;
  onMinPriceChange: (value: number) => void;
  onMaxPriceChange: (value: number) => void;
}

export const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">Price Range</label>
      <div className="flex space-x-2">
        <input
          type="number"
          placeholder="Min"
          value={minPrice || ''}
          onChange={(e) => onMinPriceChange(Number(e.target.value))}
          className="w-1/2 p-2 border rounded-lg"
          min={0}
        />
        <input
          type="number"
          placeholder="Max"
          value={maxPrice || ''}
          onChange={(e) => onMaxPriceChange(Number(e.target.value))}
          className="w-1/2 p-2 border rounded-lg"
          min={minPrice || 0}
        />
      </div>
    </div>
  );
};