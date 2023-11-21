import { XMarkIcon } from "@heroicons/react/24/solid";
import React from "react";

export default function ModalCloseButton(props) {
  return (
    <button
      {...props}
      className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-1 border border-gray-300"
    >
      <XMarkIcon className="h-6 w-6 text-gray-500" />
    </button>
  );
}
