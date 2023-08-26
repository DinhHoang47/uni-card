import { PlusIcon } from "@heroicons/react/24/outline";

export default function AddNew() {
  return (
    <div className="relative w-full h-40 bg-white rounded-md border border-gray-300 flex flex-col items-center justify-center space-y-2 cursor-pointer ">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-9 rounded-full bg-blue-50">
        <PlusIcon className="h-14 w-14 text-blue-600" />
      </div>
      <div className="text-gray-400 absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-6 max-w-max">
        <p className="w-40">Create new collection</p>
      </div>
    </div>
  );
}
