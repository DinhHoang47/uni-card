"use client";

import Image from "next/image";
import StarButton from "@components/StarButton/StarButton";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import UserLink from "@components/UserLink";
import Link from "next/link";
import SettingTooltip from "./SettingTooltip";
import { useState } from "react";

export default function CollectionHeader({
  data,
  collectionId,
  setIsCollectionModalOpen,
}) {
  const { imageUrl, title, userId, likes } = data;
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  return (
    <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-8">
      {/* Collection Info */}
      <div className="flex items-center space-x-2">
        {/* Collection Image */}
        <div className="w-20 h-20 border rounded border-gray-200 flex items-center flex-shrink-0">
          <Image
            alt={`collection-${data.title}-image`}
            style={{ width: "100%", height: "auto" }}
            width={0}
            height={0}
            sizes="100vw"
            src={
              imageUrl
                ? `${imageUrl}`
                : "/assets/images/collection-default-img.png"
            }
          />
        </div>
        {/* Title & Star & Creator */}
        <div className=" flex flex-col space-y-1 justify-between pr-5 sm:pr-0">
          {/* Title */}
          <div className="relative flex items-center space-x-2">
            <h4 className="font-semibold line-clamp-3">{title}</h4>
            {/* Actions */}
            <div className="absolute  top-full right-0 -translate-x-10 sm:right-0 sm:top-0 sm:translate-x-10 sm:-translate-y-1">
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
                  collectionData={data}
                  setIsEditModalOpen={setIsCollectionModalOpen}
                  setIsOpenPopup={setIsOpenPopup}
                />
              )}
            </div>
          </div>
          {/* Star*/}
          <StarButton
            userId={userId}
            likes={likes}
            collectionId={parseInt(collectionId)}
          />
          {/* User */}
          <UserLink id={userId} />
        </div>
      </div>
      {/* Action Button */}
      <div className="flex justify-end items-end">
        <Link
          href={`/learning/${collectionId}`}
          className="px-4 h-10 w-full sm:w-24 rounded-md bg-blue-600 text-white flex items-center justify-center"
        >
          <p>Learn</p>
        </Link>
      </div>
    </div>
  );
}
