"use client";
import Link from "next/link";
import CollectionCard from "./CollectionCard";
import { useKeenSlider } from "keen-slider/react";
import { useEffect, useState } from "react";
import { useLearningCollection } from "@lib/useLearningCollection";
import SkeletionLoading from "./Spinner/SkeletionLoading";

export default function CollectionsList() {
  const {
    data: learningCollections,
    isLoading,
    error,
  } = useLearningCollection();
  if (error) return <div className="">Failed to load data.</div>;
  if (isLoading)
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 sm:gap-10">
        <SkeletionLoading />
      </div>
    );
  if (learningCollections) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 sm:gap-10">
        {learningCollections.map((item) => {
          return <CollectionCard key={item.id} data={item} />;
        })}
      </div>
    );
  }
}
