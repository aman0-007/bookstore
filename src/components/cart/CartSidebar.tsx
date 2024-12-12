import React from 'react';
import { useCartStore } from '../../store/cartStore';
import { CartItem } from './CartItem';
import { X } from 'lucide-react';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose }) => {
  const { items, total } = useCartStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="absolute inset-y-0 right-0 w-96 bg-white shadow-xl">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Shopping Cart</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <p className="text-center text-gray-500">Your cart is empty</p>
            ) : (
              items.map(item => (
                <CartItem
                  key={item.book.id}
                  book={item.book}
                  quantity={item.quantity}
                />
              ))
            )}
          </div>
          
          {items.length > 0 && (
            <div className="border-t p-4">
              <div className="flex justify-between mb-4">
                <span className="font-medium">Total</span>
                <span className="font-semibold">${total().toFixed(2)}</span>
              </div>
              
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};