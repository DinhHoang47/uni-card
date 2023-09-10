import AddNew from "./AddNew";
import CollectionsList from "./CollectionsList";

export default function MyCollections() {
  return (
    <div className="">
      <div className="">
        <h3 className="font-semibold text-lg">My Collections</h3>
      </div>
      <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 sm:gap-10">
        <AddNew />
      </div>
      {/* Collections List */}
      <div className="mt-4 sm:mt-10">
        <CollectionsList />
      </div>
    </div>
  );
}
