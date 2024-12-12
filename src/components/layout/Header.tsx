import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ShoppingCart, User, Bell } from 'lucide-react';
import { SearchBar } from './SearchBar';
import { useAuthStore } from '../../store/authStore';

interface HeaderProps {
  onCartClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onCartClick }) => {
  const { user } = useAuthStore();

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">BookMarket</span>
          </Link>

          <div className="flex-1 max-w-xl px-8">
            <SearchBar />
          </div>

          <nav className="flex items-center space-x-6">
            <button className="text-gray-600 hover:text-blue-600">
              <Bell className="w-6 h-6" />
            </button>
            <button 
              onClick={onCartClick}
              className="text-gray-600 hover:text-blue-600"
            >
              <ShoppingCart className="w-6 h-6" />
            </button>
            <Link 
              to="/dashboard" 
              className="text-gray-600 hover:text-blue-600"
            >
              <User className="w-6 h-6" />
            </Link>
            {!user ? (
              <Link
                to="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Sign In
              </Link>
            ) : (
              <Link
                to="/dashboard/create-listing"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Sell a Book
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};