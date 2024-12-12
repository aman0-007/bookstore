import React, { useState } from 'react';
import { Book } from '../../types/book';
import { X } from 'lucide-react';

interface BidModalProps {
  book: Book;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (amount: number) => Promise<void>;
}

export const BidModal: React.FC<BidModalProps> = ({
  book,
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [amount, setAmount] = useState(book.auction?.currentBid || 0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await onSubmit(amount);
      onClose();
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black opacity-30" onClick={onClose} />
        
        <div className="relative bg-white rounded-lg max-w-md w-full p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
          >
            <X className="w-6 h-6" />
          </button>

          <h3 className="text-lg font-medium mb-4">Place a Bid</h3>
          
          <div className="mb-4">
            <p className="text-sm text-gray-500">
              Current bid: ${book.auction?.currentBid}
            </p>
            <p className="text-sm text-gray-500">
              Minimum bid: ${(book.auction?.currentBid || 0) + 0.01}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Your Bid
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  step="0.01"
                  min={(book.auction?.currentBid || 0) + 0.01}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="block w-full pl-7 pr-12 border-gray-300 rounded-md"
                />
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-600 mb-4">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Placing Bid...' : 'Place Bid'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};