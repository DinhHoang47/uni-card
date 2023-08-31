import { EllipsisHorizontalIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";

export default function SettingTooltip({ setIsOpenPopup, handleDelete }) {
  useEffect(() => {
    console.log("rendered");
    const closeThisPopup = () => {
      setIsOpenPopup(false);
      console.log("clicked");
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
        className="absolute  bg-white px-2 py-2 rounded top-3/4 border"
      >
        <ul>
          <li
            onClick={() => {
              handleDelete();
            }}
            className="flex items-center space-x-1 cursor-pointer hover:text-red-500"
          >
            <span>Delete</span>
            <TrashIcon className="h-5 w-5 " />
          </li>
        </ul>
      </div>
    </>
  );
}
