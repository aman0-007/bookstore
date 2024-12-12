import React, { useState } from 'react';
import { Header } from '../components/layout/Header';
import { FilterSidebar } from '../components/filters/FilterSidebar';
import { BookGrid } from '../components/book/BookGrid';
import { CartSidebar } from '../components/cart/CartSidebar';
import { useBookStore } from '../store/bookStore';

export const MarketplacePage: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { filteredBooks } = useBookStore();

  return (
    <div className="min-h-screen bg-gray-100">
      <Header onCartClick={() => setIsCartOpen(true)} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          <FilterSidebar />
          
          <main className="flex-1">
            <BookGrid books={filteredBooks()} />
          </main>
        </div>
      </div>

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </div>
  );
};