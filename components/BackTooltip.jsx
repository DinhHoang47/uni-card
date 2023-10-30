import {
  ChevronLeftIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

import { useEffect } from "react";

export default function BackTooltip({ setIsOpenPopup, id }) {
  useEffect(() => {
    const closeThisPopup = () => {
      setIsOpenPopup(false);
    };
    window.addEventListener("click", closeThisPopup, false);
    return () => window.removeEventListener("click", closeThisPopup);
  }, []);
  return (
    <>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="absolute top-full bg-white px-2 py-2 rounded  border !ml-0 translate-y-2 shadow-lg z-20"
      >
        <div
          onClick={() => {}}
          className="flex flex-col items-start space-y-2 cursor-pointer "
        >
          <Link
            className="flex w-full items-center space-x-2 hover:text-blue-500"
            href={`/collections/${id}`}
          >
            <ChevronLeftIcon className="h-6 w-6 hover:text-blue-500" />
            <p className="w-28">This collection</p>
          </Link>
          <Link
            className="flex w-full items-center space-x-2 hover:text-blue-500"
            href={"/mypage"}
          >
            <UserIcon className="h-6 w-6" />
            <span>Mypage</span>
          </Link>
          {/* <Link
            className="flex w-full items-center space-x-2 hover:text-blue-500"
            href={"/collections"}
          >
            <HomeIcon className="h-6 w-6" />
            <span>Home</span>
          </Link> */}
        </div>
      </div>
    </>
  );
}
