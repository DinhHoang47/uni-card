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
import useUser from "@lib/useUser";
import ImportCardModal from "./components/ImportCardModal";
import { useCard } from "@lib/useCard";
import { open as openSignInModal } from "@redux/authModalSlice.js";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

export default function CollectionDetail({ params }) {
  // Fetch data
  const { user: currentUser } = useUser();
  const { data, error, isLoading, mutate } = useCollection(params.id);
  const { data: cardData } = useCard(params.id);
  // Local state
  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);
  const [isTermModalOpen, setTermModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const collectionHangerRef = useRef(null);
  const totalCard = cardData?.length;
  // Handler
  const router = useRouter();
  const dispatch = useDispatch();
  const navigateToLearn = () => {
    if (currentUser?.isLoggedIn) {
      router.push(`/learning/${params.id}`);
    } else {
      dispatch(openSignInModal());
    }
  };
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
    const { tags, description, userId } = data;
    const isOwner = currentUser?.id === userId;
    return (
      <div className="w-full my-6 space-y-8 px-2 sm:px-8  relative">
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
          <div className="grid grid-cols-2">
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
              <ul className="overflow-auto">
                {tags?.length !== 0 && tags !== undefined
                  ? tags.map((tag, index) => (
                      <Link
                        href={"#"}
                        key={`tag-${tag}-${index}`}
                        className="ml-2 px-2 rounded shadow-sm bg-blue-100 hover:text-blue-500 line-clamp-3 flex-shrink-0 inline-block"
                      >
                        #{tag}
                      </Link>
                    ))
                  : "No tags"}
              </ul>
            </div>
          </div>
          <div className="flex items-center justify-end">
            <button
              onClick={navigateToLearn}
              className="px-4 h-10 w-full sm:w-24 rounded-md bg-blue-600 text-white flex items-center justify-center"
            >
              <p>Learn</p>
            </button>
          </div>
        </div>
        {/* Section */}
        <div className="space-y-4">
          <TermTable
            currentUser={currentUser}
            isOwner={isOwner}
            displayExample={data.display_example}
            displayImg={data.display_img}
            displayDef2={data.display_def_2}
            collectionId={data.id}
            languageRef={data.language_ref}
            setTermModalOpen={setTermModalOpen}
            setIsImportModalOpen={setIsImportModalOpen}
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
            totalCard={totalCard}
            userType={currentUser?.type}
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
        <CSSTransition
          nodeRef={collectionHangerRef}
          classNames={"modal"}
          in={isImportModalOpen}
          timeout={200}
          unmountOnExit
        >
          <ImportCardModal
            hanger={"collectionHanger"}
            collectionId={params.id}
            mutateCollection={mutate}
            setIsOpen={setIsImportModalOpen}
            displayExample={data.display_example}
            displayDef2={data.display_def_2}
            totalCard={totalCard}
            userType={currentUser?.type}
          />
        </CSSTransition>
      </div>
    );
  }
}
