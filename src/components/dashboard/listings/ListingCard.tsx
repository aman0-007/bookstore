import React from 'react';
import { Book } from '../../../types/book';
import { useListingStore } from '../../../store/listingStore';
import { BookImage } from '../../book/BookImage';
import { BookPrice } from '../../book/BookPrice';
import { BookConditionBadge } from '../../book/BookConditionBadge';
import { Edit2, Trash2 } from 'lucide-react';

interface ListingCardProps {
  listing: Book;
}

export const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  const { deleteListing } = useListingStore();

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      deleteListing(listing.id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <BookImage
        src={listing.imageUrl}
        alt={listing.title}
        className="w-full h-48 object-cover"
      />
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-500">{listing.type}</span>
          <BookConditionBadge condition={listing.condition} />
        </div>
        
        <h3 className="text-lg font-semibold mb-1 line-clamp-1">{listing.title}</h3>
        <p className="text-gray-600 text-sm mb-2 line-clamp-1">{listing.author}</p>
        
        <div className="flex items-center justify-between mt-4">
          <BookPrice book={listing} />
          
          <div className="flex space-x-2">
            <button 
              onClick={() => console.log('Edit listing:', listing.id)}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded"
            >
              <Edit2 className="w-5 h-5" />
            </button>
            <button
              onClick={handleDelete}
              className="p-2 text-red-600 hover:bg-red-50 rounded"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};