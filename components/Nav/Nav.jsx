"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { PlusIcon } from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Bars4Icon } from "@heroicons/react/24/solid";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import AuthModal from "../Auth/AuthModal";
import { CSSTransition } from "react-transition-group";
import RightSidebar from "../Sidebar/RightSidebar";
import AddNewCollectionModal from "../AddNewCollectionModal";
import AmberButton from "@components/Buttons/AmberButton";
import { open, close as closeAuthModal } from "../../redux/authModalSlice.js";
import { open as openSidebar } from "../../redux/rightSideBarSlice.js";
import useUser from "@lib/useUser";
import Image from "next/image";
import TooltipMenu from "@components/TooltipMenu";
import UserMenu from "./UserMenu";
import Script from "next/script";
import GoogleOneTap from "./GoogleOneTap";

export default function Nav() {
  // States
  const [currentPath, setCurrentPath] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const isOpen = useSelector((state) => state.authModal.isOpen);

  const searchContainerRef = useRef();
  // Route
  const router = useRouter();
  const pathname = usePathname();

  const { user, mutateUser } = useUser();

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
    router.push(`/search?query=${searchValue}`);
  };

  // Underline current tab base on URL
  useEffect(() => {
    const collection = "/collections";
    const mypage = "/mypage";
    const search = "/search";
    if (pathname.startsWith(collection) || pathname.startsWith(search)) {
      setCurrentPath(collection);
    } else if (pathname.startsWith(mypage)) {
      setCurrentPath(mypage);
    } else {
      setCurrentPath("");
    }
  }, [pathname]);

  // Init google account and show a prompt if user not logged in yet

  // Open Menu

  const toggleSearchModal = () => {
    searchContainerRef.current.classList.toggle("invisible");
  };

  // Add new collection

  const [isAddNewOpen, setIsAddNewOpen] = useState(false);

  // Auth modal

  const dispatch = useDispatch();

  // UserMenu state
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div
      id="primary-nav"
      className="fixed flex items-center justify-center w-full  top-0 left-0 right-0 z-10 bg-white border-b border-b-outline-primary"
    >
      <GoogleOneTap />
      <Script
        strategy="beforeInteractive"
        src="https://accounts.google.com/gsi/client"
      ></Script>
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
            {
              <>
                <Link
                  href="/mypage"
                  className={`flex items-center menu_item ${
                    currentPath === "/mypage" ? "active" : ""
                  }`}
                >
                  <p className="">My Page</p>
                </Link>
              </>
            }
          </div>
        </div>
        {/* Mobile Menu */}
        <div className="flex lg:hidden h-full items-center space-x-2">
          <div
            className="flex items-center justify-center h-10 w-10 rounded-ful cursor-pointer"
            onClick={() => {
              dispatch(openSidebar());
            }}
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
        <div className="flex mr-2 space-x-2">
          <div className="sm:hidden flex relative">
            <div
              onClick={toggleSearchModal}
              className="h-10 w-10 flex items-center justify-center border  text-gray-400 border-gray-300 rounded-full hover:border-gray-400 hover:text-gray-500  hover:transition-all hover:duration-300 cursor-pointer"
            >
              <MagnifyingGlassIcon className="h-6 w-6  " />
            </div>
            <div className="flex items-center justify-center"></div>
          </div>
          <button
            onClick={() => {
              {
                user?.isLoggedIn ? setIsAddNewOpen(true) : dispatch(open());
              }
            }}
            className="create_btn text-blue-700 hover:text-white "
          >
            <PlusIcon className="h-7 w-7 " />
          </button>
          {user?.isLoggedIn === false && (
            <AmberButton
              onClick={() => {
                dispatch(open());
              }}
            >
              Sign In
            </AmberButton>
          )}
          {user?.isLoggedIn === true && (
            <div
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen((pre) => !pre);
              }}
              className="relative cursor-pointer rounded-full w-10 h-10 flex items-center justify-center border hover:border-blue-400 transition-all"
            >
              <Image
                className="rounded-full"
                alt="user-images"
                width={36}
                height={36}
                src={user.imageUrl || "/assets/images/user.png"}
              />
              {isMenuOpen && (
                <TooltipMenu setIsOpen={setIsMenuOpen}>
                  <UserMenu
                    closeTooltip={() => {
                      setIsMenuOpen(false);
                    }}
                  />
                </TooltipMenu>
              )}
            </div>
          )}
        </div>
      </nav>
      {/* Right Sidebar */}
      <RightSidebar currentPath={currentPath} pathname={pathname} />
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
      <CSSTransition
        classNames={"modal"}
        in={isOpen}
        timeout={200}
        unmountOnExit
      >
        <AuthModal isOpen={isOpen} />
      </CSSTransition>
      {/* New collection */}
      <CSSTransition
        classNames={"modal"}
        in={isAddNewOpen}
        timeout={200}
        unmountOnExit
      >
        <AddNewCollectionModal setIsOpen={setIsAddNewOpen} router={router} />
      </CSSTransition>
    </div>
  );
}
