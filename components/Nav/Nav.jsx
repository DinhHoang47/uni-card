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
import { openAddNewCollectionModal } from "@redux/modalSlice";
import useUser from "@lib/useUser";
import Image from "next/image";
import TooltipMenu from "@components/TooltipMenu";
import UserMenu from "./UserMenu";
import Script from "next/script";
import GoogleOneTap from "./GoogleOneTap";
import CommonMessage from "@components/CommonMessage/CommonMessage";
import unicardLogo from "@public/assets/images/unicard-logo.png";
export default function Nav() {
  // States
  const [currentPath, setCurrentPath] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const isOpen = useSelector((state) => state.authModal.isOpen);
  const isAddNewCollectionModalOpen = useSelector(
    (state) => state.modal.isAddNewCollectionModalOpen
  );
  const searchContainerRef = useRef();
  const navhangerRef = useRef(null);
  const inputRef = useRef(null);
  // Redux global state
  // Route
  const router = useRouter();
  const pathname = usePathname();

  const { user, mutateUser } = useUser();
  // Handler
  const handleChange = (e) => {
    e.preventDefault();
    setSearchValue(e.target.value);
  };

  const handleKeydown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
      if (!searchContainerRef.current.classList.contains("invisible")) {
        toggleSearchModal();
      }
      e.target.blur();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchValue.trim() !== "") {
      router.push(`/search?keyword=${searchValue.trim()}`);
    }
    setSearchValue("");
    inputRef.current.blur();
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
      <Script
        strategy="beforeInteractive"
        src="https://accounts.google.com/gsi/client"
      ></Script>
      <GoogleOneTap />
      <nav className="flex-between h-16 w-full md:px-4 lg:px-8">
        {/* Destop Menu */}
        <div className="hidden lg:flex h-full ">
          <Link href="/" className="flex gap-2 items-center">
            <Image
              style={{ width: "40px" }}
              alt="Unicard logo"
              src={unicardLogo}
            />
            <p className="logo_text font-vina text-xl">UniCard</p>
          </Link>
          <DesktopNavList currentPath={currentPath} />
        </div>
        {/* Mobile Menu */}
        <MobileMenu
          dispatch={dispatch}
          openSidebar={openSidebar}
          unicardLogo={unicardLogo}
        />
        {/* Desktop Search Bar */}
        <div className="hidden sm:flex w-1/3  md:w-1/3 ">
          <div className="flex space-x-2 items-center w-full h-10 px-4  rounded-full bg-blue-50">
            <input
              maxLength={225}
              ref={inputRef}
              value={searchValue}
              onKeyDown={handleKeydown}
              onChange={handleChange}
              id="search-input"
              className=" h-full w-full bg-transparent outline-none"
              type="search"
              placeholder="Collection, Tag ..."
            />
            <label
              className="cursor-pointer "
              onClick={handleSubmit}
              htmlFor="search-input"
            >
              <MagnifyingGlassIcon className="h-6 w-6 text-slate-700 hover:text-blue-600" />
            </label>
          </div>
        </div>
        {/* Desktop Navigation */}
        <div className="flex mr-2 sm:mr-0 space-x-2">
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
                user?.isLoggedIn
                  ? dispatch(openAddNewCollectionModal())
                  : dispatch(open());
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
        className="search_modal invisible absolute flex top-0 left-0 w-full h-screen bg-transparent-04"
        ref={searchContainerRef}
      >
        <div className="w-full h-16 bg-white flex space-x-4 px-4 shadow-md">
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="flex flex-1 items-center"
          >
            <button
              onClick={toggleSearchModal}
              className="h-10 w-10 rounded-full"
            >
              <ArrowLeftIcon className="h-6 w-6 text-gray-500" />
            </button>
            <form className="h-10 w-10 bg-blue-50 px-4 rounded-full grow">
              <input
                ref={inputRef}
                value={searchValue}
                onChange={handleChange}
                onKeyDown={handleKeydown}
                type="search"
                placeholder="Search collections, topic"
                className="w-full h-full bg-blue-50 outline-none  "
              />
            </form>
          </div>
          <button
            onClick={handleSubmit}
            className="w-8 flex items-center justify-center"
          >
            <MagnifyingGlassIcon className="h-6 w-6 stroke-2" />
          </button>
        </div>
      </div>
      {/* Hanger for modal */}
      <div id="navHanger" ref={navhangerRef} className=""></div>
      {/* Auth */}
      <CSSTransition
        nodeRef={navhangerRef}
        classNames={"modal"}
        in={isOpen}
        timeout={200}
        unmountOnExit
      >
        <AuthModal hanger={"navHanger"} isOpen={isOpen} />
      </CSSTransition>
      {/* New collection */}
      <CSSTransition
        nodeRef={navhangerRef}
        classNames={"modal"}
        in={isAddNewCollectionModalOpen}
        timeout={200}
        unmountOnExit
      >
        <AddNewCollectionModal
          hanger={"navHanger"}
          setIsOpen={setIsAddNewOpen}
          router={router}
        />
      </CSSTransition>
      <CommonMessage />
    </div>
  );
}

const MobileMenu = ({ unicardLogo, dispatch, openSidebar }) => {
  return (
    <div className="flex lg:hidden h-full items-center space-x-2">
      {/* Hidden sidebar temporarily */}
      <MobileMenuIcon dispatch={dispatch} openSidebar={openSidebar} />
      <Link href="/" className="ml-2 sm:ml-0 flex gap-2 items-center">
        <Image alt="Unicard logo" style={{ width: "40px" }} src={unicardLogo} />
        <p className="logo_text font-vina text-xl">UniCard</p>
      </Link>
    </div>
  );
};

const MobileMenuIcon = ({ dispatch, openSidebar }) => {
  return (
    <div
      className="flex items-center justify-center h-10 w-10 rounded-ful cursor-pointer"
      onClick={() => {
        dispatch(openSidebar());
      }}
    >
      <Bars4Icon className="h-6 w-6 text-gray-400" />
    </div>
  );
};

const DesktopNavList = ({ currentPath }) => {
  return (
    <div className="flex ml-5 space-x-4 font-semibold">
      {/* <Link
        className={`flex items-center menu_item ${
          currentPath === "/collections" ? "active" : ""
        }`}
        href="#"
      >
        <p className=" ">Collections</p>
      </Link> */}
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
  );
};
