"use client";
import { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/outline";
import EditIcon from "@public/assets/icons/EditIcon";
import { TextareaAutosize } from "@mui/base";
import { MuiChipsInput } from "mui-chips-input";
import TermsTable from "@components/TermsTable";
import Link from "next/link";

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
  const [tags, setTags] = useState([]);
  const [chips, setChips] = useState([]);

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
            <span className="font-semibold">Back to all collections</span>
          </button>
        </div>
        {/* Container */}
        <div className="grid grid-cols-1 gap-8">
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
                <button className="">
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
          <div className="flex items-end">
            <Link
              href={`/collections/${params.id}/study`}
              className="px-4 h-9 w-full sm:w-24 rounded-md bg-blue-600 text-white flex items-center justify-center"
            >
              <p>Study</p>
            </Link>
          </div>
        </div>
      </div>
      {/* Section */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* Description */}
        <div className="flex flex-col">
          <div className="flex items-center space-x-2">
            <p className="font-semibold">Description</p>
          </div>
          <div className="grow">
            <TextareaAutosize
              maxRows={8}
              maxLength={500}
              wrap="hard"
              className="w-full border-b-2 p-2 resize-none focus:border-blue-300 focus:outline-none bg-transparent border-gray-300"
            ></TextareaAutosize>
          </div>
        </div>
        {/* Tags */}
        <div className="">
          <div className="flex items-center space-x-2">
            <p className="font-semibold">Tags</p>
          </div>
          <div className="">
            <MuiChipsInputStyled
              id="my-mui-chipsinput"
              hideClearAll={true}
              value={chips}
              validate={() => {
                return {
                  isError: chips.length >= 5,
                  textError: "Input max 5 tags",
                };
              }}
              clearInputOnBlur={true}
              onAddChip={handleAddChip}
              onDeleteChip={handleDeleteChip}
            ></MuiChipsInputStyled>
          </div>
        </div>
      </div>
      {/* Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold">Terms</h4>
          <div className="">
            <button className="px-8 rounded-md bg-blue-600 text-white h-9">
              Save
            </button>
          </div>
        </div>
        <div className=" px-0 sm:px-8">
          <TermsTable />
        </div>
      </div>
    </div>
  );
}
