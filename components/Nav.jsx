"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

export default function Nav() {
  const { data: session, status } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [currentPath, setCurrentPath] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  // Underline current tab base on URL
  useEffect(() => {
    const collection = "/collections";
    const mypage = "/mypage";
    if (pathname.startsWith(collection)) {
      setCurrentPath(collection);
    } else if (pathname.startsWith(mypage)) {
      setCurrentPath(mypage);
    } else {
      setCurrentPath("");
    }
  }, [pathname]);

  useEffect(() => {
    const setupProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setupProviders();
  }, []);

  return (
    <div className="flex items-center justify-center fixed top-0 left-0 right-0 z-10 bg-white border-b border-b-outline-primary">
      <nav className="flex-between w-full h-16  container ">
        <div className=" flex h-full ">
          <Link href="/" className="flex gap-2 flex-center">
            <p className="logo_text">Uni Card</p>
          </Link>
          <div className="flex ml-5 space-x-4 font-semibold">
            <Link
              className={`flex items-center menu_item ${
                currentPath === "/collections" ? "active" : ""
              }`}
              href="/collections"
            >
              <p className=" ">Collections</p>
            </Link>
            <Link
              href="/mypage"
              className={`flex items-center menu_item ${
                currentPath === "/mypage" ? "active" : ""
              }`}
            >
              <p className="">My Page</p>
            </Link>
          </div>
        </div>
        {/* Desktop Navigation */}
        <div className="hidden sm:flex ">
          {session?.user ? (
            <div className="flex gap-3 md:gap-5">
              <Link href="/create-prompt" className="black_btn">
                Create Post
              </Link>
              <button type="button" className="outline_btn" onClick={signOut}>
                Sign Out
              </button>
              <Link href={"/profile"}>
                <Image
                  alt="profile"
                  src={session?.user?.image}
                  width={37}
                  height={37}
                  className="rounded-full"
                />
              </Link>
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={() => {
                  signIn();
                }}
                className="gray_btn"
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  signIn();
                }}
                className="amber_btn"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
        {/* Mobile Navigation */}
        <div className="sm:hidden flex relative ">
          {session?.user ? (
            <div className="flex">
              <Image
                alt="profile"
                src={session?.user?.image}
                width={37}
                height={37}
                className="rounded-full"
                onClick={() => {
                  setToggleDropdown((prev) => !prev);
                }}
              />
              {toggleDropdown && (
                <div className="dropdown">
                  <Link
                    href="/profile"
                    className="dropdown_link"
                    onClick={() => setToggleDropdown(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    href="/create-prompt"
                    className="dropdown_link"
                    onClick={() => setToggleDropdown(false)}
                  >
                    Create Prompt
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setToggleDropdown(false);
                      signOut();
                    }}
                    className="mt-5 w-full black_btn"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              {providers && (
                <button
                  type="button"
                  onClick={() => {
                    signIn();
                  }}
                  className="black_btn"
                >
                  Sign In
                </button>
              )}
            </>
          )}
        </div>
      </nav>
    </div>
  );
}
