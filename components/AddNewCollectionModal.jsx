"use client";
import { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";

import { privateCollectionServ } from "@services/Private_CollectionService";
import { MuiChipsInput } from "mui-chips-input";
import PortalModalWrapper from "@components/PortalModalWrapper";
import { TextareaAutosize } from "@mui/base";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Spinner from "@public/assets/icons/MySpinner";
import { uploadImage } from "@services/CldService";
import { generateUniqueName } from "@utils/generateUniqueName";
import { useSWRConfig } from "swr";
import { handleSelectedImage } from "@lib/handleSelectedImage";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { closeAddNewCollectionModal } from "@redux/modalSlice";
import { Switch } from "@mui/material";
import CardPreview from "./CardPreview";
import { useTotalCollections } from "@lib/useTotalCollections";
import useUser from "@lib/useUser";
import { FREE_USER_CODE, FREE_USER_MAX_COLLECTION_NUM } from "@utils/config";
import PremiumIcon from "@public/assets/icons/PremiumIcon";

export default function AddNewCollectionModal({ hanger, router }) {
  // Fetched data
  const { data: usersCollectionNum } = useTotalCollections();
  const { user } = useUser();
  // Input states
  const [chips, setChips] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileUrl, setSelectedFileUrl] = useState(null);
  const [displayDef2, setDisplayDef2] = useState(false);
  const [displayExample, setDisplayExample] = useState(true);
  const [displayImg, setDisplayImg] = useState(false);
  // Loading and Error message state
  const [loadingImage, setLoadingImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  let reachedMaxCollection = false;
  let allowInputImage = true;
  if (user.type === FREE_USER_CODE) {
    reachedMaxCollection = usersCollectionNum >= FREE_USER_MAX_COLLECTION_NUM;
    allowInputImage = false;
  }
  // Handler add new collection   -------------------------------
  const dispatch = useDispatch();
  const { mutate } = useSWRConfig();

  const updateMycollection = () => {
    mutate((key) => Array.isArray(key) && key[0] === "/user/id/posts");
  };
  const trimmedTitle = title.trim();

  const handleAddNew = async () => {
    setLoading(true);
    try {
      // Upload image if existing
      let imageUrl = null;
      if (selectedFile) {
        // Generate public_id with trimed length to 20 letter
        const imageId = generateUniqueName(title.slice(0, 10));
        const preset = "collection_image";
        const imageResult = await uploadImage(selectedFile, imageId, preset);
        imageUrl = imageResult.data?.secure_url;
      }
      const trimmedDescription = description.trim();
      // Create formdata
      const data = {
        title: trimmedTitle,
        description: trimmedDescription,
        tags: chips,
        imageUrl,
        displayImg,
        displayDef2,
        displayExample,
      };
      const result = await privateCollectionServ.create(data);
      // Check if id exists in the result
      if (result?.data.id) {
        const id = result.data.id;
        setLoading(false);
        dispatch(closeAddNewCollectionModal());
        updateMycollection();
        router.push(`/collections/${id}`);
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
  // Clear error message
  useEffect(() => {
    setErrMsg("");
  }, [title, description, chips]);

  return (
    <PortalModalWrapper mountTarget={hanger}>
      <div className="bg-white relative rounded-md p-6 max-w-min">
        {/* Title */}
        <h3 className="font-semibold text-xl text-center">Create new</h3>

        {/* Data Input Section */}
        <form className="space-y-2">
          {/* Collection title */}
          <div className="space-y-1 ">
            <label className="font-semibold">Title</label>
            <input
              maxLength={225}
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
          <div className="space-y-1 max-w-[340px]">
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
          {/* Layout preview*/}
          <div className="">
            <label className="font-semibold">Card layout preview</label>
            <div className="flex items-center">
              <CardPreview
                displayDef2={displayDef2}
                displayExample={displayExample}
                displayImg={displayImg}
              />
            </div>
          </div>
          {/* Switchs */}
          <div className="space-y-1 max-w-[380px]">
            <label className="">Example</label>
            <Switch
              onChange={(e) => {
                setDisplayExample((pre) => !pre);
              }}
              checked={displayExample}
            />
            <label className="">Pronunciation</label>
            <Switch
              onChange={(e) => {
                setDisplayDef2((pre) => !pre);
              }}
              checked={displayDef2}
            />
            <div className="relative max-w-max">
              <label
                className={`relative ${allowInputImage ? "" : "text-gray-400"}`}
              >
                Image
              </label>
              <div className="inline-block group">
                <Switch
                  disabled={!allowInputImage}
                  onChange={(e) => {
                    setDisplayImg((pre) => !pre);
                  }}
                  checked={displayImg}
                />
                {!allowInputImage && (
                  <span className="absolute z-10 right-0 top-1/2 -translate-y-1/2">
                    {/* <PremiumIcon className="w-5 h-5 fill-violet-500" /> */}
                    <p className=" absolute text-sm top-1/2 -translate-y-1/2 left-0 px-2 py-1 rounded invisible group-hover:visible min-w-max bg-blue-200">
                      Upload images coming soon.
                    </p>
                  </span>
                )}
              </div>
            </div>
          </div>
          {/* Error Message */}
          <div className="w-full">
            <p className="text-red-500 text-sm">{errMsg}</p>
            {reachedMaxCollection && (
              <p className="text-violet-600 text-sm">
                <span className="inline-block mr-1 translate-y-1/3">
                  <PremiumIcon className="w-5 h-5 fill-violet-500" />
                </span>
                You have reached the maximum of {FREE_USER_MAX_COLLECTION_NUM}{" "}
                collections numbers for free users.
              </p>
            )}
          </div>
          {/* Submit button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              handleAddNew();
            }}
            disabled={loading || !title || loadingImage || reachedMaxCollection}
            className={`${
              !trimmedTitle || loading || loadingImage || reachedMaxCollection
                ? "bg-blue-400"
                : "bg-blue-600"
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
            dispatch(closeAddNewCollectionModal());
          }}
          className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-1 border border-gray-300"
        >
          <XMarkIcon className="h-6 w-6 text-gray-500" />
        </button>
      </div>
    </PortalModalWrapper>
  );
}

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

const ImageInput = ({
  selectedFileUrl,
  loadingImage,
  setSelectedFile,
  setSelectedFileUrl,
  setLoadingImage,
}) => {
  return (
    <div className="space-y-1 flex flex-col ">
      <label className="font-semibold">Image</label>
      <div className="relative w-20 h-20">
        {/*Show Selected image */}
        {selectedFileUrl && (
          <Image
            fill
            alt={`Collection Image`}
            style={{ objectFit: "contain" }}
            sizes="80px"
            src={selectedFileUrl}
          />
        )}

        {loadingImage && (
          <span className="absolute-center">
            <Spinner className="w-5 h-5 text-blue-600 animate-spin" />
          </span>
        )}
      </div>
      <input
        onChange={(e) => {
          handleSelectedImage({
            selectedFile: e.target.files[0],
            inputTarget: e.target.value,
            setErrMsg,
            setSelectedFile,
            setSelectedFileUrl,
            setLoadingImage,
          });
        }}
        type="file"
        name="image"
        accept="image/*"
        multiple={false}
      />
    </div>
  );
};
