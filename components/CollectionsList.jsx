"use client";
import Link from "next/link";
import CollectionCard from "./CollectionCard";
import { useKeenSlider } from "keen-slider/react";
import { useEffect, useState } from "react";

export default function CollectionsList() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 sm:gap-10">
      <CollectionCard />
      <CollectionCard />
      <CollectionCard />
      <CollectionCard />
    </div>
  );
}
