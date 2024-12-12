import React from 'react';
import { Header } from '../components/layout/Header';
import { FeaturedBooks } from '../components/home/FeaturedBooks';
import { ActiveAuctions } from '../components/home/ActiveAuctions';
import { RecentListings } from '../components/home/RecentListings';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FeaturedBooks />
        <ActiveAuctions />
        <RecentListings />
      </main>
    </div>
  );
};