import React from 'react';
import { Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import {
  BookOpen,
  LayoutDashboard,
  ListOrdered,
  ShoppingBag,
  PlusCircle,
  LogOut,
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, token, signOut } = useAuthStore();

  // Redirect to login if not authenticated
  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  const handleSignOut = async () => {
    signOut();
    navigate('/login');
  };

  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Overview' },
    { path: '/dashboard/listings', icon: ListOrdered, label: 'My Listings' },
    { path: '/dashboard/purchases', icon: ShoppingBag, label: 'My Purchases' },
    { path: '/dashboard/create-listing', icon: PlusCircle, label: 'Create Listing' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex items-center">
                <BookOpen className="w-8 h-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">BookMarket</span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-600">Welcome, {user.name}</span>
              <button
                onClick={handleSignOut}
                className="flex items-center text-gray-600 hover:text-blue-600"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          <aside className="w-64">
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                      isActive
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </aside>

          <main className="flex-1 bg-white rounded-lg shadow">
            <div className="p-6">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
};