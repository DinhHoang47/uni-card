"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { publicCollectionServ } from "@services/Public_CollectionService";
import useSWR from "swr";
import XSpinner from "@components/Spinner/XSpinner";
import { InboxIcon } from "@heroicons/react/24/outline";
import NoResultIcon from "@public/assets/icons/NoResult";
import { GridLayout } from "@components/GridLayout";
import CollectionCard from "@components/CollectionCard";

const fetcher = async ([keyword, page]) => {
  return publicCollectionServ
    .searchCollection(keyword, page)
    .then((res) => res.data);
};

export default function page({ params }) {
  // Fetched data
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword");
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useSWR(
    keyword !== "" ? [keyword, page] : null,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnReconnect: false,
      revalidateOnFocus: false,
    }
  );
  // Local state
  // Loading
  if (isLoading)
    return (
      <div className="w-full mt-4 space-y-8  px-4 lg:px-8 flex items-center justify-center flex-1">
        <XSpinner />
      </div>
    );
  // No result
  if (data?.collections.length === 0 || data === undefined)
    return <NoResult keyword={keyword} />;
  // Error
  if (error) return <Error />;
  if (data) {
    const { collections, next, previous, totalPage } = data;
    return (
      <div className="w-full mt-4 space-y-4  px-4 lg:px-8">
        <p className="break-all line-clamp-2 text-xl">
          Result for <span className="font-semibold ">{keyword}</span>
        </p>
        <PaginationButton
          nextPage={next?.page}
          previousPage={previous?.page}
          totalPage={totalPage}
          currentPage={page}
          setCurrentPage={setPage}
        />
        <ResultList data={collections} />
      </div>
    );
  }
}

const NoResult = ({ keyword }) => {
  return (
    <div className="flex flex-col w-full h-full mt-4 space-y-8  px-4 lg:px-8 ">
      <p className="break-all line-clamp-2 text-xl">
        Result for <span className="font-semibold">{keyword}</span>
      </p>
      <div className="flex flex-col items-center justify-center space-y-4">
        <NoResultIcon className="fill-blue-400" />
        <p className="">No results</p>
      </div>
    </div>
  );
};

const Error = () => {
  return (
    <div className="flex flex-col w-full h-full mt-4 space-y-8  px-4 lg:px-8 ">
      <p className="break-all line-clamp-2 ">
        Result for <span className="font-semibold">{keyword}</span>
      </p>
      <div className="flex flex-col items-center justify-center space-y-4">
        <NoResultIcon className="fill-blue-400" />
        <p className="">Server error</p>
      </div>
    </div>
  );
};

const ResultList = ({ data }) => {
  return (
    <GridLayout>
      {data.map((item) => (
        <CollectionCard key={item.id} data={item} />
      ))}
    </GridLayout>
  );
};

const PaginationButton = ({
  totalPage,
  nextPage,
  previousPage,
  currentPage,
  setCurrentPage,
}) => {
  const buttonArr = Array.from({ length: totalPage }, (_, index) => index + 1);
  if (totalPage > 1) {
    return (
      <div className="flex gap-2 flex-wrap items-center">
        {buttonArr.map((number, index) => {
          let selected = false;
          if (number === currentPage) {
            selected = true;
          }
          return (
            <Button
              key={index}
              number={number}
              selected={selected}
              setCurrentPage={setCurrentPage}
            />
          );
        })}
      </div>
    );
  }
};

const Button = ({ number, selected, setCurrentPage, next, previous }) => {
  let text = number;
  if (next) {
    text = ">";
  } else if (previous) {
    text = "<";
  }
  return (
    <div
      onClick={() => {
        setCurrentPage(number);
      }}
      className={`w-7 h-7 border border-slate-400 rounded flex items-center justify-center select-none cursor-pointer ${
        selected ? "bg-blue-500 text-white" : ""
      }`}
    >
      {text}
    </div>
  );
};
