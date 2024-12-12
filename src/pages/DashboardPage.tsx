import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { DashboardOverview } from '../components/dashboard/DashboardOverview';
import { MyListings } from '../components/dashboard/MyListings';
import { MyPurchases } from '../components/dashboard/MyPurchases';
import { CreateListing } from '../components/dashboard/CreateListing';

export const DashboardPage: React.FC = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route index element={<DashboardOverview />} />
        <Route path="listings" element={<MyListings />} />
        <Route path="purchases" element={<MyPurchases />} />
        <Route path="create-listing" element={<CreateListing />} />
      </Routes>
    </DashboardLayout>
  );
};