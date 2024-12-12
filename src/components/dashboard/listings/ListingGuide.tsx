import React from 'react';
import { Info } from 'lucide-react';

export const ListingGuide: React.FC = () => {
  const tips = [
    'Use high-quality images of your book',
    'Be honest about the book\'s condition',
    'Include any notable defects or damage',
    'Price competitively by checking similar listings',
    'Provide accurate ISBN numbers',
    'Describe special features or editions',
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center space-x-2 mb-4">
        <Info className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-medium text-gray-900">Listing Tips</h2>
      </div>
      
      <ul className="space-y-3">
        {tips.map((tip, index) => (
          <li key={index} className="flex items-start">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">
              {index + 1}
            </span>
            <span className="ml-3 text-sm text-gray-600">{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};