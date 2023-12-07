"use client";

import Image from "next/image";
import StarButton from "@components/StarButton/StarButton";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import UserLink from "@components/UserLink";
import SettingTooltip from "./SettingTooltip";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useUser from "@lib/useUser";
import { useDispatch } from "react-redux";
import { open as openSignInModal } from "@redux/authModalSlice.js";

export default function CollectionHeader({
  data,
  collectionId,
  setIsCollectionModalOpen,
}) {
  // Fetched data
  const { user: currentUser } = useUser();
  const { imageUrl, title, userId, likes } = data;
  const isOwner = currentUser?.id === userId;
  // Local state
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  // Handler
  const router = useRouter();
  const dispatch = useDispatch();
  const navigateToLearn = () => {
    if (currentUser?.isLoggedIn) {
      router.push(`/learning/${collectionId}`);
    } else {
      dispatch(openSignInModal());
    }
  };

  return (
    <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-8">
      {/* Collection Info */}
      <div className="flex items-center space-x-2">
        {/* Collection Image */}
        <div className="relative w-20 h-20 border rounded border-gray-200 flex items-center flex-shrink-0">
          <Image
            style={{ objectFit: "contain" }}
            fill
            alt={`collection-${data.title}-image`}
            sizes="80px"
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
              {isOwner && (
                <button
                  className=""
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpenPopup((pre) => !pre);
                  }}
                >
                  <EllipsisHorizontalIcon className="h-8 w-8 text-gray-500 hover:text-gray-700" />
                </button>
              )}

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
            collectionId={collectionId}
          />
          {/* User */}
          <UserLink id={userId} />
        </div>
      </div>
      {/* Status indicator*/}
    </div>
  );
}
