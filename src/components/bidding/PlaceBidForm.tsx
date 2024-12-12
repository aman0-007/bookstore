import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useBiddingStore } from '../../store/biddingStore';
import { Book } from '../../types/book';

const bidSchema = z.object({
  amount: z.number().min(0.01, 'Bid must be greater than 0'),
});

type BidFormData = z.infer<typeof bidSchema>;

interface PlaceBidFormProps {
  book: Book;
  onSuccess?: () => void;
}

export const PlaceBidForm: React.FC<PlaceBidFormProps> = ({ book, onSuccess }) => {
  const { placeBid } = useBiddingStore();
  
  const minBid = book.auction?.currentBid
    ? book.auction.currentBid + 0.01
    : book.auction?.minBid || 0;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BidFormData>({
    resolver: zodResolver(bidSchema),
    defaultValues: {
      amount: minBid,
    },
  });

  const onSubmit = (data: BidFormData) => {
    placeBid(book.id, data.amount, 'current-user-id'); // Replace with actual user ID
    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Your Bid (Minimum: ${minBid.toFixed(2)})
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div>
          <input
            type="number"
            step="0.01"
            min={minBid}
            {...register('amount', { valueAsNumber: true })}
            className="block w-full pl-7 pr-12 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        {errors.amount && (
          <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Place Bid
      </button>
    </form>
  );
};