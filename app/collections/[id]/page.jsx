"use client";
import { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/outline";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import EditIcon from "@public/assets/icons/EditIcon";
import { TextareaAutosize } from "@mui/base";
import { MuiChipsInput } from "mui-chips-input";
import Link from "next/link";
import DesktopTermTable from "./components/DesktopTermTable";
import MobileTermTable from "./components/MobileTermTable";
import { CSSTransition } from "react-transition-group";
import AddTermModal from "./components/AddTermModal";
import EditCollectionModal from "./components/EditCollectionModal";

const MuiChipsInputStyled = styled(MuiChipsInput)`
  & div.MuiInputBase-root {
    margin: 0;
    padding: 0;
    border-bottom: 2px solid #d1d5db;
    border-radius: 0;
    &:focus-within {
      border-bottom: 2px solid #93c5fd;
    }
  }
  padding: 0;
  margin: 0;
  width: 100%;
  & fieldset {
    border: none;
  }
`;

export default function CollectionDetail({ params }) {
  // Tags and modal state
  const [chips, setChips] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);
  const [editCardId, setEditCardId] = useState(null);

  const handleAddChip = (chipValue) => {
    if (!chips.includes(chipValue)) {
      setChips([...chips, chipValue]);
    } else {
    }
  };
  const handleDeleteChip = (chipValue) => {
    const newChips = [...chips].filter((value) => value !== chipValue);
    setChips(newChips);
  };
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return (
    <div className="w-full mt-4 space-y-8 px-2 sm:px-8  relative">
      {/* Section */}
      <div className="w-full space-y-4">
        {/* Title */}
        <div className="">
          <button className="flex items-center">
            <ChevronLeftIcon className="h-4 w-4 text-sm" />
            <span className="">All collections</span>
          </button>
        </div>
        {/* Container */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Collection Info */}
          <div className="flex items-center space-x-2">
            {/* Collection Image */}
            <div className="rounded border-2 border-gray-500">
              <Image
                className="rounded"
                alt="collection-img"
                width={72}
                height={72}
                src={"/assets/images/collection-icon.jpg"}
              />
            </div>
            {/* Title & Star & Creator */}
            <div className="flex flex-col space-y-1 justify-between">
              {/* Title */}
              <div className="flex items-center space-x-2">
                <h4 className="font-semibold">Collection title here</h4>
                <button
                  onClick={() => {
                    setIsCollectionModalOpen(true);
                  }}
                  className=""
                >
                  <EditIcon className="fill-indigo-500" />
                </button>
              </div>
              {/* Star*/}
              <button className="flex space-x-1">
                <StarIcon className="h-6 w-6" />
                <span className="font-satoshi">96</span>
              </button>
              {/* User */}
              <div className="flex items-center space-x-2">
                <p className="text-sm">User Name</p>
                <Image
                  alt="user-icon"
                  width={20}
                  height={20}
                  src={"/assets/images/user.png"}
                />
              </div>
            </div>
          </div>
          {/* Action Button */}
          <div className="flex justify-end items-end">
            <Link
              href={`/collections/${params.id}/learn`}
              className="px-4 h-10 w-full sm:w-24 rounded-md bg-blue-600 text-white flex items-center justify-center"
            >
              <p>Learn</p>
            </Link>
          </div>
          {/* Delete action */}
          <div className="absolute top-0 right-0">
            <button onClick={() => {}}>
              <EllipsisHorizontalIcon className="h-8 w-8 text-gray-500" />
            </button>
            <div className="bg-green-500 h-20 w-20 absolute bottom-0 right-0"></div>
          </div>
        </div>
      </div>
      {/* Section */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* Description */}
        <div className="flex flex-col">
          <div className="flex items-center space-x-2">
            <p className="font-semibold">Description</p>
            <button
              onClick={() => {
                setIsCollectionModalOpen(true);
              }}
              className=""
            >
              <EditIcon className="fill-indigo-500" />
            </button>
          </div>
          <div className="grow">
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Consectetur, voluptas.
            </p>
          </div>
        </div>
        {/* Tags */}
        <div className="">
          <div className="flex items-center space-x-2">
            <p className="font-semibold">Tags</p>
            <button
              onClick={() => {
                setIsCollectionModalOpen(true);
              }}
              className=""
            >
              <EditIcon className="fill-indigo-500" />
            </button>
          </div>
          <ul className="flex space-x-2">
            <li className="bg-white px-2 rounded shadow-sm bg-blue-100">
              #Tag1
            </li>
            <li className="bg-white px-2 rounded shadow-sm bg-blue-100">
              #Tag2
            </li>
          </ul>
        </div>
      </div>
      {/* Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold">Terms</h4>
        </div>
        <div className="hidden sm:block">
          <DesktopTermTable
            setEditCardId={setEditCardId}
            setIsModalOpen={setIsModalOpen}
          />
        </div>
        <div className="block sm:hidden">
          <MobileTermTable
            setEditCardId={setEditCardId}
            setIsModalOpen={setIsModalOpen}
          />
        </div>
      </div>
      {/* Add Modal */}
      <CSSTransition
        classNames={"modal"}
        in={isModalOpen}
        timeout={200}
        unmountOnExit
      >
        <AddTermModal
          editCardId={editCardId}
          setEditCardId={setEditCardId}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </CSSTransition>
      {/* Edit collection detail modal */}
      <CSSTransition
        classNames={"modal"}
        in={isCollectionModalOpen}
        timeout={200}
        unmountOnExit
      >
        <EditCollectionModal
          setIsCollectionModalOpen={setIsCollectionModalOpen}
        />
      </CSSTransition>
    </div>
  );
}
