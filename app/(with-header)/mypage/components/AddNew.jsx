"use client";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { openAddNewCollectionModal } from "@redux/modalSlice";

export default function AddNew() {
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => {
        dispatch(openAddNewCollectionModal());
      }}
      className="group relative w-full h-40 bg-white rounded-md border border-gray-300 flex flex-col items-center justify-center space-y-2 cursor-pointer hover:shadow-[0px_2px_5px_1px_#90cdf4] transition-all"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-9 rounded-full bg-blue-50 ">
        <PlusIcon className=" h-14 w-14 group-hover:text-blue-600 text-blue-500" />
      </div>
      <div className="text-gray-400 group-hover:text-gray-500 absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-6 max-w-max">
        <p className="w-40">Create new collection</p>
      </div>
    </div>
  );
}
