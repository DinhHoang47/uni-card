// Define the type for a collection item
export interface CollectionItem {
  id: number;
  title: string;
  imageUrl?: string;
  description?: string;
  total_card: number;
  total_like: number;
  user: User;
}

// Define the props for the CollectionsList component
export interface CollectionsListProps {
  data: CollectionItem[];
  isLoading: boolean;
}

export interface User {
  id: number;
  username: string;
  imageUrl?: string;
}
