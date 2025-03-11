// Define the type for a collection item
export interface CollectionItem {
  id: number;
  title: string;
  imageUrl?: string;
  description?: string;
}

// Define the props for the CollectionsList component
export interface CollectionsListProps {
  data: CollectionItem[];
  isLoading: boolean;
}
