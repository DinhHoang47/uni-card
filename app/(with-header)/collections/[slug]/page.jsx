"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Error from "next/error";
import useSWRImmutable from "swr/immutable";
import useSWRMutation from "swr/mutation";

import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import DesktopTermTable from "./components/DesktopTermTable";
import MobileTermTable from "./components/MobileTermTable";
import { CSSTransition } from "react-transition-group";
import AddTermModal from "./components/AddTermModal";
import EditCollectionModal from "./components/EditCollectionModal";
import SettingTooltip from "@components/SettingTooltip";
import { publicCollectionServ } from "@services/Public_CollectionService";
import UserLink from "@components/UserLink";
import StarButton from "@components/StarButton/StarButton";
import useSWR from "swr";

const fetcher = (slug) => publicCollectionServ.getCollectionDetail(slug);

export default function CollectionDetail({ params }) {
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);
  const [editCardId, setEditCardId] = useState(null);
  const [isOpenPopup, setIsOpenPopup] = useState(false);

  // Handle delete collection
  const handleDelete = () => {
    window.confirm("Are you sure to delete this collection.");
  };
  // Fetch data

  const { data, error, isLoading, trigger } = useSWRImmutable(
    params.slug,
    fetcher
  );

  if (error) {
    return <div className="">Collection not found</div>;
  }
  if (isLoading) return <div className="">Loading...</div>;
  if (data) {
    const { id, title, imageUrl, tags, description, userId, likes } = data.data;
    return (
      <div className="w-full my-4 space-y-8 px-2 sm:px-8  relative">
        {/* Section */}
        <div className="w-full space-y-4">
          {/* Container */}
          <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Collection Info */}
            <div className="flex items-center space-x-2">
              {/* Collection Image */}
              <div className="relative rounded border border-gray-300 object-cover w-[72px] h-[72px]">
                <Image
                  fill
                  sizes={"72px"}
                  style={{ objectFit: "cover" }}
                  className="rounded"
                  alt="collection-img"
                  src={imageUrl || "/assets/images/collection-default-img.png"}
                />
              </div>
              {/* Title & Star & Creator */}
              <div className=" flex flex-col space-y-1 justify-between">
                {/* Title */}
                <div className="relative flex items-center space-x-2">
                  <h4 className="font-semibold">{title}</h4>
                  {/* Edit button */}
                  {/* <button
                    onClick={() => {
                      setIsCollectionModalOpen(true);
                    }}
                    className=""
                  >
                    <EditIcon className="fill-indigo-500" />
                  </button> */}
                  {/* Actions */}
                  <div className="absolute right-0 top-0 translate-x-10 -translate-y-1">
                    <button
                      className=""
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsOpenPopup((pre) => !pre);
                      }}
                    >
                      <EllipsisHorizontalIcon className="h-8 w-8 text-gray-500 hover:text-gray-700" />
                    </button>
                    {isOpenPopup && (
                      <SettingTooltip
                        setIsEditModalOpen={setIsCollectionModalOpen}
                        setIsOpenPopup={setIsOpenPopup}
                        handleDelete={handleDelete}
                      />
                    )}
                  </div>
                </div>
                {/* Star*/}
                <StarButton trigger={trigger} likes={likes} collectionId={id} />
                {/* User */}
                <UserLink id={userId} />
              </div>
            </div>
            {/* Action Button */}
            <div className="flex justify-end items-end">
              <Link
                href={`/learning/${params.slug}`}
                className="px-4 h-10 w-full sm:w-24 rounded-md bg-blue-600 text-white flex items-center justify-center"
              >
                <p>Learn</p>
              </Link>
            </div>
          </div>
        </div>
        {/* Section */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Description */}
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <p className="font-semibold">Description</p>
            </div>
            <div className="grow">
              <p>{description}</p>
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
                    <li
                      key={`tag-${tag}-${index}`}
                      className=" px-2 rounded shadow-sm bg-blue-100"
                    >
                      #{tag}
                    </li>
                  ))
                : "No tags"}
            </ul>
          </div>
        </div>
        {/* Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">Terms</h4>
          </div>
          <div className="hidden sm:block">
            <DesktopTermTable
              setEditCardId={setEditCardId}
              setIsModalOpen={setIsModalOpen}
            />
          </div>
          <div className="block sm:hidden">
            <MobileTermTable
              setEditCardId={setEditCardId}
              setIsModalOpen={setIsModalOpen}
            />
          </div>
        </div>
        {/* Add Modal */}
        <CSSTransition
          classNames={"modal"}
          in={isModalOpen}
          timeout={200}
          unmountOnExit
        >
          <AddTermModal
            editCardId={editCardId}
            setEditCardId={setEditCardId}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        </CSSTransition>
        {/* Edit collection detail modal */}
        <CSSTransition
          classNames={"modal"}
          in={isCollectionModalOpen}
          timeout={200}
          unmountOnExit
        >
          <EditCollectionModal setIsOpen={setIsCollectionModalOpen} />
        </CSSTransition>
      </div>
    );
  }
}
