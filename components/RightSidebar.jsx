import { SignedIn, SignedOut, SignOutButton, useClerk } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import React from "react";
import styles from "./styles.module.css";
import Image from "next/image";

export default function RightSidebar({
  containerRef,
  bgRef,
  toggleSidebar,
  menuRef,
  currentPath,
  pathname,
}) {
  const router = useRouter();
  const { user } = useUser();
  const { openSignIn } = useClerk();
  return (
    <div className="mobile_side_bar invisible inset-0" ref={containerRef}>
      {/* Background */}
      <div
        onClick={() => {
          bgRef.current.classList.contains("opacity-50") && toggleSidebar();
        }}
        ref={bgRef}
        className="opacity-0 duration-500 ease-out transition-all  flex absolute top-0 left-0 bg-slate-400 h-screen w-screen"
      ></div>
      {/* Overlayer */}
      <div
        ref={menuRef}
        className={`${styles.sidebarContainer} -translate-x-full duration-300 ease-out transition-all max-w-xs flex flex-col space-y-8 absolute top-0 left-0 w-2/3 h-screen bg-white px-2 pt-2`}
      >
        <div className="flex justify-end">
          <button
            className="flex items-center justify-center h-10 w-10 rounded-full border border-gray-300"
            onClick={toggleSidebar}
          >
            <XMarkIcon className="h-6 w-6 text-gray-500" />
          </button>
        </div>
        <ul className="relative space-y-5 font-semibold text-gray-400">
          <li
            className={`flex items-center mobile_menu_item h-10 ${
              currentPath === "/collections" ? "active" : ""
            }`}
          >
            <button
              onClick={() => {
                toggleSidebar();
                router.push("/collections");
              }}
            >
              Collections
            </button>
          </li>
          <li
            className={`flex items-center mobile_menu_item h-10 ${
              currentPath === "/mypage" ? "active" : ""
            }`}
          >
            <button
              onClick={() => {
                toggleSidebar();
                router.push("/mypage");
              }}
            >
              My Page
            </button>
          </li>
        </ul>
        <SignedIn>
          <div className="relative flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <Image
                className="rounded-full"
                width={40}
                height={40}
                alt={"userImage"}
                src={user?.imageUrl || "/assets/images/user.png"}
              />
              <div className="">
                <p>{user?.fullName}</p>
                <p>{user?.emailAddresses[0].emailAddress}</p>
              </div>
            </div>
            <SignOutButton>
              <button
                onClick={() => {
                  toggleSidebar();
                }}
                className="w-full h-10 border border-gray-200 rounded-md font-semibold"
              >
                Sign out
              </button>
            </SignOutButton>
          </div>
        </SignedIn>
        <SignedOut>
          <button
            onClick={() => {
              toggleSidebar();
              openSignIn({ redirectUrl: pathname });
            }}
            className="w-full rounded-md h-10 font-semibold bg-amber-400"
          >
            Sign In
          </button>
        </SignedOut>
      </div>
    </div>
  );
}
