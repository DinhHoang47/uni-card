"use client";
import Image from "next/image";
import useUser from "@lib/useUser";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { openUserSetting } from "@redux/modalSlice";
import { useDispatch } from "react-redux";

export default function UserInfo() {
  // Fetched data
  const { user } = useUser("/auth");
  // Handler
  const dispatch = useDispatch();
  const handleUserSetting = () => {
    dispatch(openUserSetting());
  };
  return (
    <div className="flex items-center space-x-2">
      <div className="">
        <Image
          width={40}
          height={40}
          src={user?.imageUrl || "/assets/images/user.png"}
          alt="user-image"
        />
      </div>
      <div className="flex flex-col">
        <div className="font-semibold">{user?.username}</div>
        <div className="">{user?.email}</div>
      </div>
      {/* Open user button */}
      <div className="h-12">
        <button onClick={handleUserSetting}>
          <Cog6ToothIcon className="h-6 w-6 text-gray-500" />
        </button>
      </div>
    </div>
  );
}
