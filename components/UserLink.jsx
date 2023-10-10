import { publicUserServ } from "@services/Public_UserService";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import useSWRImmutable from "swr/immutable";

const fetcher = ([url, id]) => publicUserServ.getUserInfo(id);

export default function UserLink({ id }) {
  const { data, error, isLoading } = useSWRImmutable(["/users", id], fetcher);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className="text-sm select-none">Anonymous User</div>;
  if (data) {
    const { username, imageUrl } = data.data;
    return (
      <Link className="flex space-x-2 group" href={"#"}>
        <span className="hover:underline hover:text-blue-500">{username}</span>
        <div className="flex items-center">
          <Image
            className="rounded-full border border-gray-400 group-hover:border-blue-500"
            alt="user-icon"
            width={20}
            height={20}
            src={imageUrl || "/assets/images/user.png"}
          />
        </div>
      </Link>
    );
  }
}
