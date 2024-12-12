import React, { useState } from 'react';
import { Upload } from 'lucide-react';

interface ImageUploadProps {
  onImageSelected: (url: string) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelected }) => {
  const [preview, setPreview] = useState<string | null>(null);

  // In a real app, this would upload to a storage service
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // For demo, we'll use a placeholder image
      const imageUrl = 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800';
      setPreview(imageUrl);
      onImageSelected(imageUrl);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Book Image</label>
      
      <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
        <div className="space-y-1 text-center">
          {preview ? (
            <img src={preview} alt="Preview" className="mx-auto h-32 w-32 object-cover rounded" />
          ) : (
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
          )}
          
          <div className="flex text-sm text-gray-600">
            <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
              <span>Upload a file</span>
              <input
                type="file"
                className="sr-only"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
        </div>
      </div>
    </div>
  );
};