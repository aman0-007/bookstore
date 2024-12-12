import React from 'react';
import { BookOpen, ShoppingCart, User, Bell } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">BookMarket</span>
          </div>

          <div className="flex-1 max-w-xl px-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for books..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <nav className="flex items-center space-x-6">
            <button className="text-gray-600 hover:text-blue-600">
              <Bell className="w-6 h-6" />
            </button>
            <button className="text-gray-600 hover:text-blue-600">
              <ShoppingCart className="w-6 h-6" />
            </button>
            <button className="text-gray-600 hover:text-blue-600">
              <User className="w-6 h-6" />
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Sell a Book
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};