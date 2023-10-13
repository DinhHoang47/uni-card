"use client";

import PortalModalWrapper from "@components/PortalModalWrapper";
import { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { TextareaAutosize } from "@mui/base";
import { MuiChipsInput } from "mui-chips-input";

export default function AddNewCollectionModal({ setIsOpen, handleAddNew }) {
  // Handle dynamic size for modal start
  const childrenRef = useRef(null);
  const [childHeight, setChildHeight] = useState();
  const [childWidth, setChildWidth] = useState();
  useEffect(() => {
    setChildHeight(childrenRef.current.offsetHeight);
    setChildWidth(childrenRef.current.offsetWidth);
  }, [childHeight, childWidth]);
  //   Handle input chip
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
  const [chips, setChips] = useState([]);
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
  //    -------------------------------

  return (
    <PortalModalWrapper childrenHeight={childHeight} childrenWidth={childWidth}>
      <div ref={childrenRef} className="bg-white relative rounded-md p-6">
        {/* Title */}
        <h3 className="font-semibold text-xl text-center">
          Collection title here
        </h3>

        {/* Data Input Section */}
        <form className="space-y-2">
          {/* Collection title */}
          <div className="space-y-1 ">
            <label className="font-semibold">Title</label>
            <input
              placeholder="漢字"
              className="w-full border-b-2 px-2  resize-none focus:border-blue-300 focus:outline-none bg-transparent border-gray-300"
            ></input>
          </div>
          {/* Description max length 100 */}
          <div className="space-y-1 ">
            <label className="font-semibold">Description</label>
            <TextareaAutosize
              placeholder="Example"
              onChange={() => {}}
              maxRows={2}
              maxLength={100}
              wrap="hard"
              className="w-full px-2 border-b-2 resize-none focus:border-blue-300 focus:outline-none bg-transparent border-gray-300"
            ></TextareaAutosize>
          </div>
          {/* Tags */}
          <div className="space-y-1 ">
            <label className="font-semibold">Tags</label>
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
          {/* Image upload */}
          <div className="space-y-1 flex flex-col ">
            <label className="">Image</label>
            <input type="file" name="image" id="" />
          </div>
          {/* Submit button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              handleAddNew();
            }}
            className="!mt-8 w-full h-10 bg-blue-600 text-white font-semibold rounded-md"
            type="submit"
          >
            Create
          </button>
        </form>

        {/* Close btn */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(false);
          }}
          className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-1 border border-gray-300"
        >
          <XMarkIcon className="h-6 w-6 text-gray-500" />
        </button>
      </div>
    </PortalModalWrapper>
  );
}
