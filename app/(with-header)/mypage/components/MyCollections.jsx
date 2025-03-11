"use client";
import SkeletionLoading from "@components/Spinner/SkeletionLoading";
import AddNew from "./AddNew";
import { useLearningCollection } from "@lib/useLearningCollection";
import CollectionCard from "@components/CollectionCard";
import useUser from "@lib/useUser";

export default function MyCollections() {
  // Handler
  const { user, userIsLoading } = useUser();
  const {
    data: learningCollections,
    isLoading,
    error,
  } = useLearningCollection();
  const myCollection = learningCollections?.filter(
    (item) => item.user_id === user?.id
  );
  const otherUsersCollection = learningCollections?.filter(
    (item) => item.user_id !== user?.id
  );
  return (
    <div className="space-y-6">
      <GridLayout>
        <AddNew />
      </GridLayout>
      <div className="space-y-6">
        <h3 className="font-semibold text-lg">My collections</h3>
        <CollectionsList data={myCollection} isLoading={isLoading} />
      </div>
      {otherUsersCollection?.length !== 0 && (
        <div className="space-y-6">
          <h3 className="font-semibold text-lg">Learning collections</h3>
          <CollectionsList data={otherUsersCollection} isLoading={isLoading} />
        </div>
      )}
    </div>
  );
}

export function CollectionsList({ data, isLoading }) {
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
        {data.map((item) => {
          return <CollectionCard key={item.id} data={item} />;
        })}
      </GridLayout>
    );
  }
}

export const GridLayout = ({ children }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 sm:gap-10">
      {children}
    </div>
  );
};
