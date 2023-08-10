"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/outline";
import { PencilIcon } from "@heroicons/react/24/outline";
import EditIcon from "@public/assets/icons/EditIcon";

export default function CollectionDetail() {
  const descRef = useRef();

  return (
    <div className="w-full mt-8 space-y-8  sm:px-8 px-6">
      {/* Section */}
      <div className="w-full space-y-4">
        {/* Title */}
        <div className="">
          <button className="flex items-center">
            <ChevronLeftIcon className="h-4 w-4 text-sm" />
            <span className="font-semibold">Back to all collections</span>
          </button>
        </div>
        {/* Container */}
        <div className="flex px-2">
          {/* Collection Info */}
          <div className="flex items-center space-x-2">
            {/* Collection Image */}
            <div className="rounded border-2 border-gray-500">
              <Image
                className="rounded"
                alt="collection-img"
                width={72}
                height={72}
                src={"/assets/images/collection-icon.jpg"}
              />
            </div>
            {/* Title & Star & Creator */}
            <div className="flex flex-col space-y-1 justify-between">
              {/* Title */}
              <div className="flex items-center space-x-2">
                <h4 className="font-semibold">Collection title here</h4>
                <button className="">
                  <EditIcon className="fill-indigo-500" />
                </button>
              </div>
              {/* Star*/}
              <button className="flex space-x-1">
                <StarIcon className="h-6 w-6" />
                <span className="font-satoshi">96</span>
              </button>
              {/* User */}
              <div className="flex items-center space-x-2">
                <p className="text-sm">User Name</p>
                <Image
                  alt="user-icon"
                  width={20}
                  height={20}
                  src={"/assets/images/user.png"}
                />
              </div>
            </div>
          </div>
          {/* Action Button */}
          <div className="flex items-end">
            <button className="px-4 h-9 rounded-md bg-blue-600 text-white">
              Study
            </button>
          </div>
        </div>
      </div>
      {/* Section */}
      <div className="w-full grid grid-cols-2">
        {/* Description */}
        <div className="">
          <div className="flex items-center space-x-2">
            <p className="font-semibold">Description</p>
          </div>
          <div className="">
            <textarea
              placeholder="About this collections"
              rows={2}
              className="resize-none p-2 border-b"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}
