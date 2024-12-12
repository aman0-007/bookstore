import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useListingStore } from '../../store/listingStore';

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
});

type ListingFormData = z.infer<typeof listingSchema>;

export const CreateListingForm: React.FC = () => {
  const { createListing } = useListingStore();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ListingFormData>({
    resolver: zodResolver(listingSchema),
  });

  const onSubmit = (data: ListingFormData) => {
    createListing(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl mx-auto">
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
          {errors.condition && (
            <p className="mt-1 text-sm text-red-600">{errors.condition.message}</p>
          )}
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
          {errors.type && (
            <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Image URL</label>
        <input
          {...register('imageUrl')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.imageUrl && (
          <p className="mt-1 text-sm text-red-600">{errors.imageUrl.message}</p>
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

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Create Listing
      </button>
    </form>
  );
};