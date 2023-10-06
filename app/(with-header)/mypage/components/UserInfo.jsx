"use client";
import Image from "next/image";
import useUser from "@lib/useUser";

export default function UserInfo() {
  const { user, mutateUser } = useUser("/collections");
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
    </div>
  );
}
