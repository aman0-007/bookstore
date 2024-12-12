import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useListingStore } from '../../../store/listingStore';
import { Switch } from '../../ui/Switch';
import { ImageUpload } from './ImageUpload';

const listingSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  author: z.string().min(1, 'Author is required'),
  isbn: z.string().min(1, 'ISBN is required'),
  price: z.number().min(0.01, 'Price must be greater than 0'),
  condition: z.enum(['new', 'like-new', 'very-good', 'good', 'acceptable']),
  type: z.enum(['new', 'used']),
  genre: z.string().min(1, 'Genre is required'),
  description: z.string().min(1, 'Description is required'),
  imageUrl: z.string().url('Must be a valid URL'),
  isAuction: z.boolean().optional(),
  minBid: z.number().optional(),
  auctionDuration: z.number().optional(),
});

type ListingFormData = z.infer<typeof listingSchema>;

interface CreateListingFormProps {
  onSuccess?: () => void;
}

export const CreateListingForm: React.FC<CreateListingFormProps> = ({ onSuccess }) => {
  const { createListing } = useListingStore();
  const [isAuction, setIsAuction] = useState(false);
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ListingFormData>({
    resolver: zodResolver(listingSchema),
    defaultValues: {
      isAuction: false,
      type: 'used',
      condition: 'good',
    },
  });

  const onSubmit = (data: ListingFormData) => {
    const listing = {
      ...data,
      auction: isAuction ? {
        endTime: new Date(Date.now() + (data.auctionDuration || 7) * 24 * 60 * 60 * 1000),
        currentBid: 0,
        minBid: data.minBid || data.price,
        bidHistory: [],
      } : undefined,
    };

    createListing(listing);
    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-lg shadow">
      <div className="space-y-4">
        <ImageUpload
          onImageSelected={(url) => register('imageUrl').onChange({ target: { value: url } })}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            {...register('title')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Author</label>
            <input
              {...register('author')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.author && (
              <p className="mt-1 text-sm text-red-600">{errors.author.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">ISBN</label>
            <input
              {...register('isbn')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.isbn && (
              <p className="mt-1 text-sm text-red-600">{errors.isbn.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Condition</label>
            <select
              {...register('condition')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="new">New</option>
              <option value="like-new">Like New</option>
              <option value="very-good">Very Good</option>
              <option value="good">Good</option>
              <option value="acceptable">Acceptable</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <select
              {...register('type')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="new">New</option>
              <option value="used">Used</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Genre</label>
          <input
            {...register('genre')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.genre && (
            <p className="mt-1 text-sm text-red-600">{errors.genre.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            {...register('description')}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>

        <div className="flex items-center justify-between py-4 border-t border-b">
          <div>
            <h3 className="text-sm font-medium text-gray-900">Enable Auction</h3>
            <p className="text-sm text-gray-500">Allow buyers to bid on your book</p>
          </div>
          <Switch
            checked={isAuction}
            onChange={setIsAuction}
          />
        </div>

        {isAuction ? (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Starting Price</label>
              <input
                type="number"
                step="0.01"
                {...register('minBid', { valueAsNumber: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Duration (days)</label>
              <select
                {...register('auctionDuration', { valueAsNumber: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value={3}>3 days</option>
                <option value={5}>5 days</option>
                <option value={7}>7 days</option>
                <option value={10}>10 days</option>
              </select>
            </div>
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              step="0.01"
              {...register('price', { valueAsNumber: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.price && (
              <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          Create Listing
        </button>
      </div>
    </form>
  );
};