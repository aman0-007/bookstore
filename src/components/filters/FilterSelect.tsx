import React from 'react';

interface FilterSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string; }[];
}

export const FilterSelect: React.FC<FilterSelectProps> = ({
  label,
  value,
  onChange,
  options,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">{label}</label>
      <select
        className="w-full p-2 border rounded-lg"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">All {label}s</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};