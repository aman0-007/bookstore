import React from 'react';
import { Eye } from 'lucide-react';

export const ListingPreview: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center space-x-2 mb-4">
        <Eye className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-medium text-gray-900">Preview</h2>
      </div>
      
      <div className="aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg overflow-hidden">
        <p className="text-center text-gray-500 text-sm p-4">
          Your listing preview will appear here as you fill out the form
        </p>
      </div>
    </div>
  );
};