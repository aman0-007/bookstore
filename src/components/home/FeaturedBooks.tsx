import React from 'react';
import { useQuery } from '../../hooks/useQuery';
import { listingsApi } from '../../services/api/listings';
import { BookGrid } from '../book/BookGrid';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { ErrorMessage } from '../ui/ErrorMessage';

export const FeaturedBooks: React.FC = () => {
  const { data: books, isLoading, error } = useQuery(
    'featured-books',
    () => listingsApi.getAllListings()
  );

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Books</h2>
      <BookGrid books={books || []} />
    </section>
  );
};