"use client";

import { useEffect, useRef, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import styled from "@emotion/styled";

import { privateCollectionServ } from "@services/PrivateCollectionService";
import { MuiChipsInput } from "mui-chips-input";
import PortalModalWrapper from "@components/PortalModalWrapper";
import { TextareaAutosize } from "@mui/base";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Spinner from "@public/assets/icons/spinner";
import { uploadImage } from "@services/CldService";
import { generateUniqueName } from "@utils/generateUniqueName";
import {
  MAX_COLLECTION_IMG_SIZE,
  MAX_COLLECTION_IMG_SIZE_TEXT,
} from "@utils/config/config";

export default function AddNewCollectionModal({ setIsOpen, router }) {
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
  // Input states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  // Loading and Error message state
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  // Handle add new collection   -------------------------------
  const { getToken } = useAuth();

  const handleFileChange = (e) => {
    setErrMsg("");
    const currentFile = e.target.files[0];
    const maxSizeInBytes = MAX_COLLECTION_IMG_SIZE;
    console.log("selectedfile", currentFile.size);
    if (currentFile && currentFile.size > maxSizeInBytes) {
      setErrMsg(`Maximum image size is ${MAX_COLLECTION_IMG_SIZE_TEXT}.`);
      e.target.value = null;
    } else {
      setSelectedFile(currentFile);
    }
  };

  const handleAddNew = async () => {
    setLoading(true);
    try {
      // Upload image if existing
      let imageUrl = null;
      if (selectedFile) {
        const imageId = generateUniqueName(title);
        const imageResult = await uploadImage(selectedFile, imageId);
        imageUrl = imageResult.data?.url;
      }
      const trimmedTitle = title.trim();
      const trimmedDescription = description.trim();
      // Create formdata
      const data = {
        title: trimmedTitle,
        description: trimmedDescription,
        tags: chips,
        imageUrl,
      };
      const token = await getToken();
      const result = await privateCollectionServ(token).create(data);
      // Check if slug exists in the result
      if (result?.data.slug) {
        const slug = result.data.slug;
        setLoading(false);
        setIsOpen(false);
        router.push(`/collections/${slug}`);
      } else {
        throw new (class customeError extends Error {
          constructor(response) {
            super();
            this.response = response;
          }
        })({ data: { message: "Something went wrong!" } });
      }
    } catch (error) {
      if (!error?.response) {
        console.log([error]);
        setErrMsg("No server response. Try later.");
      } else {
        setErrMsg(error.response?.data?.message);
        console.log(
          "error.response?.data.messsage: ",
          error.response?.data.message
        );
        console.log(error);
      }
      setLoading(false);
    }
  };
  // Clear error message
  useEffect(() => {
    setErrMsg("");
  }, [title, description, chips]);

  return (
    <PortalModalWrapper childrenHeight={childHeight} childrenWidth={childWidth}>
      <div ref={childrenRef} className="bg-white relative rounded-md p-6">
        {/* Title */}
        <h3 className="font-semibold text-xl text-center">Create new</h3>

        {/* Data Input Section */}
        <form className="space-y-2">
          {/* Collection title */}
          <div className="space-y-1 ">
            <label className="font-semibold">Title</label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              placeholder="漢字"
              className="w-full border-b-2 px-2  resize-none focus:border-blue-300 focus:outline-none bg-transparent border-gray-300"
            ></input>
          </div>
          {/* Description max length 100 */}
          <div className="space-y-1 ">
            <label className="font-semibold">Description</label>
            <TextareaAutosize
              placeholder="Example"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
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
            <label className="font-semibold">Image</label>
            <input
              onChange={(e) => {
                handleFileChange(e);
              }}
              type="file"
              name="image"
              id=""
              accept="image/*"
              multiple={false}
            />
          </div>
          {/* Error Message */}
          <div className="">
            <p className="text-red-500 text-sm">{errMsg}</p>
          </div>
          {/* Submit button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              handleAddNew();
            }}
            disabled={loading || !title}
            className={`${
              !title || loading ? "bg-blue-400" : "bg-blue-600"
            }  w-full h-10 rounded inline-flex items-center justify-center px-4 py-2 font-semibold leading-6 text-sm shadow transition ease-in-out duration-150 text-white`}
          >
            <Spinner
              className={`${
                loading ? "" : "hidden"
              } animate-spin -ml-1 mr-3 h-5 w-5 text-white`}
            />
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
