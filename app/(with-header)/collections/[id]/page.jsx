"use client";
import { useRef, useState } from "react";

import { CSSTransition } from "react-transition-group";
import AddTermModal from "./components/AddTermModal";
import EditCollectionModal from "./components/EditCollectionModal";

import { useCollection } from "@lib/useCollection";
import XSpinner from "@components/Spinner/XSpinner";
import CollectionHeader from "./components/CollectionHeader";
import Link from "next/link";
import TermTable from "./components/TermTable";

export default function CollectionDetail({ params }) {
  // Fetch data
  const { data, error, isLoading, mutate } = useCollection(params.id);
  // Local state
  const [isTermModalOpen, setTermModalOpen] = useState(false);
  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);
  const collectionHangerRef = useRef(null);
  if (error) {
    return <div className="">Collection not found</div>;
  }
  if (isLoading)
    return (
      <div className="absolute h-full w-full flex items-center justify-center">
        <XSpinner />
      </div>
    );
  if (data) {
    const { tags, description } = data;
    return (
      <div className="w-full my-4 space-y-8 px-2 sm:px-8  relative">
        {/* Section */}
        <div className="w-full space-y-4">
          <CollectionHeader
            collectionId={params.id}
            data={data}
            setIsCollectionModalOpen={setIsCollectionModalOpen}
          />
        </div>
        {/* Section */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Description */}
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <p className="font-semibold">Description</p>
            </div>
            <div className="grow">
              <p>{description ? description : "No description"}</p>
            </div>
          </div>
          {/* Tags */}
          <div className="">
            <div className="flex items-center space-x-2">
              <p className="font-semibold">Tags</p>
            </div>
            <ul className="flex space-x-2">
              {tags?.length !== 0 && tags !== undefined
                ? tags.map((tag, index) => (
                    <Link
                      href={"#"}
                      key={`tag-${tag}-${index}`}
                      className=" px-2 rounded shadow-sm bg-blue-100 hover:text-blue-500"
                    >
                      #{tag}
                    </Link>
                  ))
                : "No tags"}
            </ul>
          </div>
        </div>
        {/* Section */}
        <div className="space-y-4">
          <TermTable
            displayExample={data.display_example}
            displayImg={data.display_img}
            displayDef2={data.display_def_2}
            collectionId={data.id}
            setTermModalOpen={setTermModalOpen}
          />
        </div>
        <div ref={collectionHangerRef} id="collectionHanger"></div>
        {/* Add Term Modal */}
        <CSSTransition
          nodeRef={collectionHangerRef}
          classNames={"modal"}
          in={isTermModalOpen}
          timeout={200}
          unmountOnExit
        >
          <AddTermModal
            hanger={"collectionHanger"}
            displayExample={data.display_example}
            displayDef2={data.display_def_2}
            displayImg={data.display_img}
            setTermModalOpen={setTermModalOpen}
            collectionId={data.id}
          />
        </CSSTransition>
        {/* Edit collection detail modal */}
        <CSSTransition
          nodeRef={collectionHangerRef}
          classNames={"modal"}
          in={isCollectionModalOpen}
          timeout={200}
          unmountOnExit
        >
          <EditCollectionModal
            hanger={"collectionHanger"}
            mutateCollection={mutate}
            data={data}
            setIsOpen={setIsCollectionModalOpen}
          />
        </CSSTransition>
      </div>
    );
  }
}
