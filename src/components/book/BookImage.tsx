import React from 'react';
import { ImageOff } from 'lucide-react';

interface BookImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const BookImage: React.FC<BookImageProps> = ({ src, alt, className = '' }) => {
  const [error, setError] = React.useState(false);

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 ${className}`}>
        <ImageOff className="w-12 h-12 text-gray-400" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
    />
  );
};