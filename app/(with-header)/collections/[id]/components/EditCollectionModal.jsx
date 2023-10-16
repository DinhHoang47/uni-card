"use client";

import PortalModalWrapper from "@components/PortalModalWrapper";
import { useEffect, useRef, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { TextareaAutosize } from "@mui/base";
import { Switch } from "@mui/material";
import Image from "next/image";
import {
  MAX_COLLECTION_IMG_SIZE,
  MAX_COLLECTION_IMG_SIZE_TEXT,
} from "@utils/config";
import { updateImage, uploadImage } from "@services/CldService";
import { privateCollectionServ } from "@services/Private_CollectionService";
import Spinner from "@public/assets/icons/spinner";
import useUser from "@lib/useUser";
import StyledChips from "./StyledChips";

export default function EditCollectionModal({
  setIsOpen,
  data,
  mutateCollection,
}) {
  const { user } = useUser();
  // Handle dynamic size for modal start
  const childrenRef = useRef(null);
  const [childHeight, setChildHeight] = useState();
  const [childWidth, setChildWidth] = useState();
  useEffect(() => {
    setChildHeight(childrenRef.current.offsetHeight);
    setChildWidth(childrenRef.current.offsetWidth);
  }, [childHeight, childWidth]);
  // Disable scrollbar after render modal
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);
  // Chips state
  const [chips, setChips] = useState(data.tags);
  // Handle file selection
  const handleFileChange = (e) => {
    // Set selected file
    setErrMsg("");
    if (!e.target.files[0]) return;
    const currentFile = e.target.files[0];
    const maxSizeInBytes = MAX_COLLECTION_IMG_SIZE;
    if (currentFile && currentFile.size > maxSizeInBytes) {
      setErrMsg(`Maximum image size is ${MAX_COLLECTION_IMG_SIZE_TEXT}.`);
      e.target.value = null;
    } else {
      setSelectedFile(currentFile);
      // Get and set selected file local url
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedFileUrl(e.target.result);
      };
      reader.readAsDataURL(currentFile);
    }
  };
  // Get userId
  const creatorId = data.userId;
  // Input states
  const [title, setTitle] = useState(data.title);
  const [description, setDescription] = useState(data.description);
  const [displayDef2, setDisplayDef2] = useState(data.display_def_2);
  const [displayImg, setDisplayImg] = useState(data.display_img);
  const [imageUrl, setImageUrl] = useState(data.imageUrl);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileUrl, setSelectedFileUrl] = useState(null);
  // Loading and Error message state
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  // Clear error message
  useEffect(() => {
    setErrMsg("");
  }, [title, selectedFile, description, chips]);
  // Handle update collection
  // const { mutate: mutateCollection } = useCollection(data.id);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      // Check if user have the right to edit
      if (user.id !== creatorId) {
        setErrMsg("Unauthorized.");
        setLoading(false);
        setIsOpen(false);
        return;
      }
      const updatedUrl = await getImageUrl(imageUrl, selectedFile);
      const trimmedTitle = title.trim();
      const trimmedDescription = description.trim();
      // Data to update
      const dataToSend = {
        title: trimmedTitle,
        description: trimmedDescription,
        tags: chips,
        imageUrl: updatedUrl,
        display_def_2: displayDef2,
        display_img: displayImg,
      };
      const optimizeUIData = {
        id: data.id,
        imageUrl: updatedUrl,
        likes: data.likes,
        tags: chips,
        slug: data.slug,
        title: trimmedTitle,
        updatedAt: data.updatedAt,
        description: trimmedDescription,
        userId: data.userId,
        display_def_2: displayDef2,
        display_img: displayImg,
      };
      const mutateOptions = {
        optimisticData: optimizeUIData,
        rollbackOnError(error) {
          // If it's timeout abort error, don't rollback
          return error.name !== "AbortError";
        },
        revalidate: false,
      };
      const updateFn = privateCollectionServ
        .update(data.id, dataToSend)
        .then((res) => res.data);
      mutateCollection(updateFn, mutateOptions);
      setLoading(false);
      setIsOpen(false);
    } catch (error) {
      console.log("error: ", error);
      if (!error.response) {
        setErrMsg("No server response or unauthorized request.");
      } else {
        setErrMsg(
          error.response.data?.message || error.message || "Update failed."
        );
      }
      setLoading(false);
    }
  };
  return (
    <PortalModalWrapper childrenHeight={childHeight} childrenWidth={childWidth}>
      <div ref={childrenRef} className="bg-white relative rounded-md p-6">
        {/* Title */}
        <h3 className="font-semibold text-xl text-center">Edit collection</h3>

        {/* Data Input Section */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdate(e);
          }}
          className="space-y-2"
        >
          {/* Collection title */}
          <div className="space-y-1 ">
            <label className="">Title</label>
            <input
              maxLength={225}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border-b-2 px-2  resize-none focus:border-blue-300 focus:outline-none bg-transparent border-gray-300"
            ></input>
          </div>
          {/* Description max length 100 */}
          <div className="space-y-1 ">
            <label className="">Description</label>
            <TextareaAutosize
              placeholder="No description"
              value={description}
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
          <div className="space-y-1 max-w-[380px]">
            <label className="">Tags</label>
            <StyledChips chips={chips} setChips={setChips} />
          </div>
          {/* Image upload */}
          <div className="space-y-1 flex flex-col ">
            <label className="">Image</label>
            {/*Show Current Image if no image selected */}
            {data.imageUrl && !selectedFileUrl && (
              <div className="w-20 h-20">
                <Image
                  alt={`collection-${data.title}-image`}
                  style={{ width: "100%", height: "auto" }}
                  width={0}
                  height={0}
                  sizes="100vw"
                  src={data.imageUrl}
                />
              </div>
            )}
            {/*Show Selected image */}
            {selectedFileUrl && (
              <div className="w-20 h-20">
                <Image
                  alt={`collection-${data.title}-image`}
                  style={{ width: "100%", height: "auto" }}
                  width={0}
                  height={0}
                  sizes="100vw"
                  src={selectedFileUrl}
                />
              </div>
            )}
            <input
              onChange={(e) => {
                handleFileChange(e);
              }}
              type="file"
              name="image"
              accept="image/*"
              multiple={false}
            />
          </div>
          {/* Switchs */}
          <div className="space-y-1 max-w-[380px]">
            <p>Card display setting</p>
            <label className="">Definition 2</label>
            <Switch
              onChange={(e) => {
                if (e.target.checked) {
                  setDisplayDef2(true);
                } else {
                  setDisplayDef2(false);
                }
              }}
              checked={displayDef2}
            />
            <label className="">Image</label>
            <Switch
              onChange={(e) => {
                setDisplayImg((pre) => !pre);
              }}
              checked={displayImg}
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
              handleUpdate(e);
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
            Save
          </button>
        </form>

        {/* Close btn */}
        <button
          onClick={() => {
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

const getImageUrl = async (oldImageUrl, selectedFile) => {
  // If no selected file and no oldImageUrl
  if (!selectedFile && !oldImageUrl) {
    return null;
    // If has oldImageUrl but no selected file
  } else if (oldImageUrl && !selectedFile) {
    return oldImageUrl;
    // If has/no imageUrl and selected file -> upload/update url
  } else {
    const match = oldImageUrl?.match(/\/([^/]+)\.png$/);
    const preset = "collection_image";
    // If found a publicId on oldImageUrl
    if (match) {
      const publicId = match[1];
      try {
        const { data } = await updateImage(selectedFile, publicId, preset);
        const updatedUrl = data.secure_url;
        return updatedUrl;
      } catch (error) {
        console.log("error: ", error);
        // Can not update image return old image temporary Url
        return oldImageUrl;
      }
      // If can't get publicId then upload image as new image
    } else {
      const { data } = await uploadImage(selectedFile, null, preset);
      const updatedUrl = data.secure_url;
      return updatedUrl;
    }
  }
};
