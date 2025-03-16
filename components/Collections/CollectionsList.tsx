"use client";
import SkeletionLoading from "@components/Spinner/SkeletionLoading";
import CollectionCard from "@components/CollectionCard";
import { CollectionsListProps, CollectionItem } from "../../types";

export default function CollectionsList({
  data,
  isLoading,
}: CollectionsListProps) {
  if (data?.length === 0) {
    return <p className="text-gray-400">No items</p>;
  }
  if (isLoading)
    return (
      <GridLayout>
        <SkeletionLoading />
        <SkeletionLoading />
      </GridLayout>
    );
  if (data) {
    return (
      <GridLayout>
        {data.map((item: CollectionItem) => {
          return <CollectionCard key={item.id} data={item} />;
        })}
      </GridLayout>
    );
  }
  return null; // Add a return statement to handle the case when data is undefined
}

const GridLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 sm:gap-10">
      {children}
    </div>
  );
};
