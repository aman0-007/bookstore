export type User = {
  id: string;
  name: string;
  email: string;
  rating: number;
  reviewCount: number;
  joinedDate: Date;
  avatar?: string;
  listings?: string[];
  wishlist?: string[];
};

export type UserProfile = User & {
  soldBooks: number;
  purchasedBooks: number;
  activeListings: number;
  totalEarnings: number;
};