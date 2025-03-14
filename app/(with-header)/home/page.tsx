"use client";

import CollectionsList from "@components/Collections/CollectionsList";
import { useHomesectionsCollections } from "@lib/useHomesectionsCollections";

export default function HomePage() {
  const { data } = useHomesectionsCollections();
  console.log("data: ", data);
  return (
    <div>
      Home
      {/* <CollectionsList data isLoading /> */}
    </div>
  );
}
