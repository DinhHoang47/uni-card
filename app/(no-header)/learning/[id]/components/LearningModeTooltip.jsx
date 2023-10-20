import { RocketLaunchIcon } from "@heroicons/react/24/outline";

import { useEffect } from "react";

export default function LearningModeTooltip({ setIsOpenPopup }) {
  useEffect(() => {
    const closeThisPopup = () => {
      setIsOpenPopup(false);
    };
    window.addEventListener("click", closeThisPopup, false);
    return () => window.removeEventListener("click", closeThisPopup);
  }, []);
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className="absolute top-full bg-white px-2 py-2 rounded  border  !ml-0 translate-y-2 shadow-md"
    >
      <div className="flex relative">
        <span className="">
          <RocketLaunchIcon className="h-4 w-4 text-green-600 animate-pulse inline mr-1" />
          More learning mode will be released soon.
        </span>
        <span className="flex items-center "></span>
      </div>
    </div>
  );
}
