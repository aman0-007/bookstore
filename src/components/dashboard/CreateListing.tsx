import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateListingForm } from './listings/CreateListingForm';
import { ListingGuide } from './listings/ListingGuide';
import { ListingPreview } from './listings/ListingPreview';

export const CreateListing: React.FC = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/dashboard/listings');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Create New Listing</h1>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <CreateListingForm onSuccess={handleSuccess} />
        </div>
        <div className="space-y-6">
          <ListingPreview />
          <ListingGuide />
        </div>
      </div>
    </div>
  );
};