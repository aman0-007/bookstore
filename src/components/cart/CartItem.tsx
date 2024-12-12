import React from 'react';
import { Book } from '../../types/book';
import { useCartStore } from '../../store/cartStore';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { BookImage } from '../book/BookImage';

interface CartItemProps {
  book: Book;
  quantity: number;
}

export const CartItem: React.FC<CartItemProps> = ({ book, quantity }) => {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <div className="flex items-center gap-4 py-4 border-b">
      <BookImage
        src={book.imageUrl}
        alt={book.title}
        className="w-20 h-20 object-cover rounded"
      />
      
      <div className="flex-1">
        <h3 className="font-medium">{book.title}</h3>
        <p className="text-sm text-gray-600">{book.author}</p>
        <p className="text-sm font-medium">${book.price}</p>
      </div>
      
      <div className="flex items-center gap-2">
        <button
          onClick={() => updateQuantity(book.id, Math.max(0, quantity - 1))}
          className="p-1 rounded hover:bg-gray-100"
        >
          <Minus className="w-4 h-4" />
        </button>
        
        <span className="w-8 text-center">{quantity}</span>
        
        <button
          onClick={() => updateQuantity(book.id, quantity + 1)}
          className="p-1 rounded hover:bg-gray-100"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      
      <button
        onClick={() => removeItem(book.id)}
        className="p-2 text-red-600 hover:bg-red-50 rounded"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
};