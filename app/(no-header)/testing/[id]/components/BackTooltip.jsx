import {
  ChevronLeftIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useEffect } from "react";

export default function BackTooltip({ setIsOpenPopup, id, backTo }) {
  // Handler
  const router = useRouter();
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
        className="absolute top-full bg-white px-2 py-2 rounded  border !ml-0 translate-y-2 shadow-md min-w-max"
      >
        <div
          onClick={() => {}}
          className="flex flex-col items-start space-y-2 cursor-pointer "
        >
          <button
            className="flex w-full items-center space-x-2 hover:text-blue-500"
            onClick={() => {
              if (!backTo) {
                router.push(`/collections/${id}`);
              } else {
                router.push(`/${backTo}/${id}`);
              }
            }}
          >
            <ChevronLeftIcon className="h-6 w-6 hover:text-blue-500" />
            {backTo ? (
              <span>Back to {backTo}</span>
            ) : (
              <span>This collection</span>
            )}
          </button>
          <Link
            className="flex w-full items-center space-x-2 hover:text-blue-500"
            href={"/mypage"}
          >
            <UserIcon className="h-6 w-6" />
            <span>Mypage</span>
          </Link>
          <Link
            className="flex w-full items-center space-x-2 hover:text-blue-500"
            href={"/collections"}
          >
            <HomeIcon className="h-6 w-6" />
            <span>Home</span>
          </Link>
        </div>
      </div>
    </>
  );
}
