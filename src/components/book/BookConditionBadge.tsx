import React from 'react';
import { Book } from '../../types/book';

interface BookConditionBadgeProps {
  condition: Book['condition'];
}

export const BookConditionBadge: React.FC<BookConditionBadgeProps> = ({ condition }) => {
  const getConditionStyle = () => {
    switch (condition) {
      case 'new':
        return 'bg-green-100 text-green-800';
      case 'like-new':
        return 'bg-blue-100 text-blue-800';
      case 'very-good':
        return 'bg-indigo-100 text-indigo-800';
      case 'good':
        return 'bg-yellow-100 text-yellow-800';
      case 'acceptable':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConditionStyle()}`}>
      {condition}
    </span>
  );
};