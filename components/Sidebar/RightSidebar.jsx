import { XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  close as closeSidebar,
  open as openSidebar,
} from "../../redux/rightSideBarSlice.js";
import { open as openAuthModal } from "../../redux/authModalSlice.js";
import { CSSTransition } from "react-transition-group";
import { useRef, useState } from "react";
import useUser from "@lib/useUser.js";
import * as api from "../../app/api/index.js";
import { useSWRConfig } from "swr";
import { useLike } from "@lib/useLike.js";

export default function RightSidebar({ currentPath, pathname }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.rightSidebar.isOpen);
  // Store a callback to execute on modal existed
  const [callBackOnExisted, setCallBackOnExisted] = useState(() => () => {});
  const nodeRef = useRef(null);
  const { user, mutateUser } = useUser();
  const { mutate } = useSWRConfig();
  const handleLogout = async () => {
    const { data: user } = await api.LogOut();
    mutateUser(user, false);
    mutate((key) => true, undefined, {
      revalidate: true,
    });
    dispatch(closeSidebar());
  };
  const handleSignIn = () => {
    dispatch(closeSidebar());
    // open AuthModal after close the sidebar
    setCallBackOnExisted(() => () => {
      dispatch(openAuthModal());
    });
  };
  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={isOpen}
      timeout={200}
      classNames="right-sidebar"
      unmountOnExit
      onExited={callBackOnExisted}
    >
      <div ref={nodeRef} className="mobile_side_bar">
        {/* Background */}
        <div
          onClick={() => {
            dispatch(closeSidebar());
          }}
          className="sidebarBackground flex absolute bg-slate-400 opacity-50 top-0 left-0 h-screen w-screen"
        ></div>
        {/* Overlayer */}
        <div
          className={`sidebarContainer max-w-xs flex flex-col space-y-8 absolute top-0 left-0 -translate-x-full w-2/3 h-screen bg-white px-2 pt-2 transition-all duration-500`}
        >
          <div className="flex justify-end">
            <button
              onClick={() => {
                dispatch(closeSidebar());
              }}
              className="flex items-center justify-center h-10 w-10 rounded-full border border-gray-300"
            >
              <XMarkIcon className="h-6 w-6 text-gray-500" />
            </button>
          </div>
          <ul className="relative space-y-5 font-semibold text-gray-400">
            <li
              onClick={() => {
                router.push("/collections");
                dispatch(closeSidebar());
              }}
              className={`flex items-center mobile_menu_item h-10 ${
                currentPath === "/collections" ? "active" : ""
              }`}
            >
              <button>Collections</button>
            </li>
            <li
              onClick={() => {
                router.push("/mypage");
                dispatch(closeSidebar());
              }}
              className={`flex items-center mobile_menu_item h-10 ${
                currentPath === "/mypage" ? "active" : ""
              }`}
            >
              <button>My Page</button>
            </li>
          </ul>
          {user?.isLoggedIn && (
            <div className="relative flex flex-col space-y-4">
              <div className="flex items-center space-x-2">
                <Image
                  className="rounded-full border "
                  width={40}
                  height={40}
                  alt={"userImage"}
                  src={user.imageUrl || `/assets/images/user.png`}
                />
                <div className="select-none">
                  <p>{user.username}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full h-10 border border-gray-200 rounded-md font-semibold"
              >
                Sign out
              </button>
            </div>
          )}

          {!user?.isLoggedIn && (
            <button
              onClick={handleSignIn}
              className="w-full rounded-md h-10 font-semibold bg-amber-400"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </CSSTransition>
  );
}
