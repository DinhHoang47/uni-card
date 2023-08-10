"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { PlusIcon } from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Bars4Icon } from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { BellIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { open, close } from "@redux/authModalSlice";
import Auth from "./Auth";

export default function Nav() {
  // States
  const { data: session, status } = useSession();
  const [providers, setProviders] = useState(null);
  const [mobileNotiDropdown, setMobileNotiDropdown] = useState(false);
  const [currentPath, setCurrentPath] = useState("");
  const [searchValue, setSearchValue] = useState("");
  // Redux store
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.authModal.isOpen);

  // Ref for menu sidebar
  const containerRef = useRef();
  const bgRef = useRef();
  const menuRef = useRef();
  // Ref for searchbar
  const searchContainerRef = useRef();
  // Ref for auth modal
  const authContainerRef = useRef();
  const authBgRef = useRef();
  const authRef = useRef();
  // Route
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (e) => {
    e.preventDefault();
    setSearchValue(e.target.value);
  };

  const handleKeydown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/search?${searchValue}`);
  };

  const toggleMobileNotification = () => {
    setMobileNotiDropdown((pre) => !pre);
  };
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

  // Open Menu

  const toggleSidebar = () => {
    containerRef.current.classList.toggle("invisible");
    bgRef.current.classList.toggle("opacity-0");
    bgRef.current.classList.toggle("opacity-50");
    menuRef.current.classList.toggle("-translate-x-full");
  };
  const toggleSearchModal = () => {
    searchContainerRef.current.classList.toggle("invisible");
  };

  const toggleAuthModal = () => {
    authContainerRef.current.classList.toggle("invisible");
    authBgRef.current.classList.toggle("opacity-0");
    authBgRef.current.classList.toggle("opacity-50");
    authRef.current.classList.toggle("scale-0");
  };

  return (
    <div className="fixed flex items-center justify-center w-full  top-0 left-0 right-0 z-10 bg-white border-b border-b-outline-primary">
      <nav className="flex-between h-16 w-full md:px-8">
        {/* Destop Menu */}
        <div className="hidden lg:flex h-full ">
          <Link href="/" className="flex gap-2 items-center">
            <p className="logo_text font-vina text-xl">UniCard</p>
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
        {/* Mobile Menu */}
        <div className="flex lg:hidden h-full items-center space-x-2">
          <div
            className="flex items-center justify-center h-10 w-10 rounded-ful cursor-pointer"
            onClick={toggleSidebar}
          >
            <Bars4Icon className="h-6 w-6 text-gray-400" />
          </div>
          <Link href="/" className="flex gap-2 items-center">
            <p className="logo_text font-vina text-xl">UniCard</p>
          </Link>
        </div>
        {/* Desktop Search Bar */}
        <div className="hidden sm:flex w-1/3  md:w-1/3 ">
          <div className="flex space-x-2 items-center w-full h-10 px-4  rounded-full bg-blue-50">
            <label htmlFor="search-input">
              <MagnifyingGlassIcon className="h-6 w-6 text-slate-700 " />
            </label>
            <input
              value={searchValue}
              onKeyDown={handleKeydown}
              onChange={handleChange}
              id="search-input"
              className=" h-full w-full bg-transparent outline-none"
              type="search"
              placeholder="Collections, Terms"
            />
          </div>
        </div>
        {/* Desktop Navigation */}
        <div className="hidden sm:flex mr-2 ">
          {session?.user ? (
            <div className="flex space-x-2">
              <button className="create_btn text-blue-700 hover:text-white ">
                <PlusIcon className="h-7 w-7 " />
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
              <button className="gray_btn" onClick={signOut}>
                Log out
              </button>
            </div>
          ) : (
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => {
                  // signIn();
                  dispatch(open());
                }}
                className="amber_btn"
              >
                Sign In
              </button>
            </div>
          )}
        </div>
        {/* Mobile Navigation */}
        <div className="sm:hidden flex relative space-x-2 mr-2">
          <div
            onClick={toggleSearchModal}
            className="h-10 w-10 flex items-center justify-center border  text-gray-400 border-gray-300 rounded-full hover:border-gray-400 hover:text-gray-500  hover:transition-all hover:duration-300 cursor-pointer"
          >
            <MagnifyingGlassIcon className="h-6 w-6  " />
          </div>
          {session?.user ? (
            <div className="flex space-x-2 relative">
              <button className="create_btn text-blue-700 hover:text-white">
                <PlusIcon className="h-7 w-7" />
              </button>
              <button
                onClick={toggleMobileNotification}
                className="create_btn text-blue-700 hover:text-white"
              >
                <BellIcon className="h-6 w-6" />
              </button>
              {/* Mobile Notification */}
              {/* Background */}
              {mobileNotiDropdown && (
                <div
                  onClick={toggleMobileNotification}
                  className="fixed top-16 left-0 w-screen h-screen bg-transparent"
                ></div>
              )}
              {mobileNotiDropdown && (
                <div className="absolute top-14 -left-64 rounded w-80 px-4 pt-2 pb-4  bg-white drop-shadow">
                  {/* Triangle */}
                  <div className="absolute -top-3 right-0  border-b-white w-0 h-0  border-l-[8px] border-l-transparent border-r-transparent border-r-[8px] border-b-[16px] "></div>
                  <ul className="">
                    <li className="py-2 text-center">No notifications yet </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <>
              {providers && (
                <button
                  type="button"
                  onClick={() => {
                    dispatch(open());
                  }}
                  className="amber_btn"
                >
                  Sign In
                </button>
              )}
            </>
          )}
        </div>
      </nav>
      {/* Right Sidebar */}
      <div className="mobile_side_bar invisible inset-0" ref={containerRef}>
        {/* Background */}
        <div
          onClick={toggleSidebar}
          ref={bgRef}
          className="opacity-0 duration-500 ease-out transition-all  flex absolute top-0 left-0 bg-slate-400 h-screen w-screen"
        ></div>
        {/* Overlayer */}
        <div
          ref={menuRef}
          className="-translate-x-full duration-300 ease-out transition-all max-w-xs flex flex-col divide-y space-y-4 absolute top-0 left-0 w-2/3 h-screen bg-white px-2 pt-2"
        >
          <div className="flex justify-end">
            <button
              className="flex items-center justify-center h-10 w-10 rounded-full border border-gray-300"
              onClick={toggleSidebar}
            >
              <XMarkIcon className="h-6 w-6 text-gray-500" />
            </button>
          </div>
          {session?.user ? (
            <>
              <ul className="space-y-5 font-semibold text-gray-400">
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
              <div className="">
                <div className="user_profile w-full mt-4 flex items-center space-x-2 ">
                  <Image
                    alt="profile-picture"
                    width={40}
                    height={40}
                    className="rounded-full"
                    src={session?.user?.image}
                  />
                  <div className="w-full">
                    <p className="break-words w-full">{session?.user?.email}</p>
                    <p className="break-words w-full text-gray-400">
                      {session?.user?.name}
                    </p>
                  </div>
                </div>
                <button
                  className="mt-4 w-full h-10 border rounded font-semibold text-gray-400"
                  onClick={signOut}
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <ul className=" space-y-5 font-semibold text-gray-400">
                <li
                  className={`mt-4 flex items-center mobile_menu_item h-10 ${
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
              <div className="">
                <button
                  onClick={() => {
                    toggleSidebar();
                    dispatch(open());
                  }}
                  className="w-full h-10 mt-4 rounded bg-amber-400 border-gray-300 font-semibold"
                >
                  Sign In
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      {/* Search Modal*/}
      <div
        onClick={toggleSearchModal}
        className="search_modal invisible absolute flex flex-col top-0 left-0 w-screen h-screen bg-white px-4 pt-2"
        ref={searchContainerRef}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="flex "
        >
          <button
            onClick={toggleSearchModal}
            className="h-10 w-10 rounded-full"
          >
            <ArrowLeftIcon className="h-6 w-6 text-gray-500" />
          </button>
          <form className="h-10 w-10 bg-blue-50 px-4 rounded-full grow">
            <input
              value={searchValue}
              onChange={handleChange}
              onKeyDown={handleKeydown}
              type="search"
              placeholder="Search collections, topic"
              className="w-full h-full bg-blue-50 outline-none  "
            />
          </form>
        </div>
      </div>
      {/* Auth */}
      <div className={isOpen ? `` : "invisible"} ref={authContainerRef}>
        <div
          onClick={() => dispatch(close())}
          className={`${
            isOpen ? "opacity-50" : "opacity-0"
          } absolute top-0 left-0 w-screen bg-slate-400 h-screen flex items-center justify-center transition-opacity duration-200 ease-in `}
          ref={authBgRef}
        ></div>
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className={`${
            isOpen ? "" : "scale-0"
          } fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-in`}
          ref={authRef}
        >
          <Auth />
        </div>
      </div>
    </div>
  );
}
