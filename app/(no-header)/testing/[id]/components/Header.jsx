import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import BackTooltip from "./BackTooltip";
import { useCollection } from "@lib/useCollection";
export default function Header({ handleSubmit, collectionId, section }) {
  const { data: collectionData } = useCollection(collectionId);
  // Local state
  const [isOpenPopup1, setIsOpenPopup1] = useState();
  return (
    <div
      id="testing-header"
      className="fixed flex items-center justify-between top-0 left-0 right-0 h-14 z-10 px-2 sm:px-8 bg-white border-b border-b-outline-primary space-x-2"
    >
      {/* Title */}
      <div className="flex space-x-2 relative">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsOpenPopup1((pre) => !pre);
          }}
        >
          <ArrowLeftOnRectangleIcon
            className={`h-8 w-8  ${isOpenPopup1 ? "text-blue-500" : ""} `}
          />
        </button>
        {isOpenPopup1 && (
          <BackTooltip id={collectionId} setIsOpenPopup={setIsOpenPopup1} />
        )}
        <div className="flex items-center">
          <span className="font-semibold line-clamp-1">
            {collectionData?.title}
            <span className="ml-2">{`(${section})`}</span>
          </span>
        </div>
      </div>
      {/* Actions */}
      <div className="flex space-x-4 relative">
        {/* Timer */}
        <div className="flex items-center space-x-2">
          <p className="hidden sm:inline-block">Time remaining</p>
          <span className="text-2xl">4:59</span>
        </div>
        <button
          onClick={() => {
            handleSubmit();
          }}
          className="px-5 bg-teal-500 text-white h-9 rounded-md"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
