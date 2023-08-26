"use client";
import CollectionsList from "@components/CollectionsList";
import Title from "./components/Title";
import { useSearchParams } from "next/navigation";

export default function page() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  // Result list ( collections )
  const data = [];
  const data1 = [
    {
      title: "100 tu vung tetedoriru",
      authorId: "123",
      start: 10,
      tag: ["tag1", "tag2"],
    },
    {
      title: "100 tu vung tetedoriru",
      authorId: "123",
      start: 10,
      tag: ["tag1", "tag2"],
    },
    {
      title: "100 tu vung tetedoriru",
      authorId: "123",
      start: 10,
      tag: ["tag1", "tag2"],
    },
    {
      title: "100 tu vung tetedoriru",
      authorId: "123",
      start: 10,
      tag: ["tag1", "tag2"],
    },
    {
      title: "100 tu vung tetedoriru",
      authorId: "123",
      start: 10,
      tag: ["tag1", "tag2"],
    },
  ];
  return (
    <div className="w-full mt-8 space-y-8  sm:px-8 px-6">
      <Title query={query} />
      {data.length !== 0 ? (
        <CollectionsList renderData={data} />
      ) : (
        <div className="">Not found</div>
      )}
    </div>
  );
}
