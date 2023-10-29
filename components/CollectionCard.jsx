import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import Link from "next/link";
import StarButton from "./StarButton/StarButton";
export default function CollectionCard({ user, data }) {
  if (data) {
    return (
      <Link href={`/collections/${data?.id}`}>
        <div className="h-40 p-4 flex flex-col justify-between bg-white rounded-lg border-gray-300 border hover:shadow-[0px_2px_5px_1px_#90cdf4] transition-all duration-300">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <h5 className="font-semibold line-clamp-2">{data?.title}</h5>
              <p className="text_secondary">{`${data?.totalCard} terms`}</p>
            </div>
            <div className="">
              <div className="relative w-14 h-14 rounded border border-gray-200">
                <Image
                  fill
                  alt={`collection-default-img`}
                  style={{ objectFit: "contain" }}
                  sizes="56px"
                  src={
                    data?.imageUrl ||
                    `/assets/images/collection-default-img.png`
                  }
                />
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            {/* User */}
            <div className="flex space-x-2 items-center">
              <Image
                alt="user-icon"
                className="rounded-full"
                width={24}
                height={24}
                src={user?.imageUrl || "/assets/images/user.png"}
              />
              <span className="font-semibold text-sm">{user?.username}</span>
            </div>
            {/* Actions */}
            <div
              onClick={(e) => {
                e.preventDefault();
              }}
              className="px-2"
            >
              <StarButton collectionId={data?.id} likes={data.totalLike} />
            </div>
          </div>
        </div>
      </Link>
    );
  }
}
