import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import Link from "next/link";
export default function CollectionCard() {
  return (
    <Link href={"/collections/id"}>
      <div className="h-40 p-4 flex flex-col justify-between bg-white rounded-lg border-gray-300 border hover:shadow-[0px_2px_5px_1px_#90cdf4] transition-all duration-300">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <h5 className="font-semibold">Collections title here</h5>
            <p className="text_secondary">101 terms</p>
          </div>
          <Image
            alt="collection-icon"
            width={56}
            height={56}
            src={"/assets/images/collection-icon.jpg"}
          />
        </div>
        <div className="flex justify-between">
          {/* User */}
          <div className="flex space-x-2 items-center">
            <Image
              alt="user-icon"
              className="rounded-full"
              width={24}
              height={24}
              src={"/assets/images/user.png"}
            />
            <span className="font-semibold text-sm">User Name</span>
          </div>
          {/* Actions */}
          <div className="flex space-x-4">
            <button className="flex items-center ">
              <StarIcon className="h-7 w-7" />
              {/* <StarIconSolid className="h-7 w-7 text-yellow-300" /> */}
              <span className="ml-1 font-satoshi leading-7">96</span>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
