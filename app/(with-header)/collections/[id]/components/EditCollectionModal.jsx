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
import { getImageUrl } from "@utils/getImageUrl";
import { handleSelectedImage } from "@lib/handleSelectedImage";
import { generateUniqueName } from "@utils/generateUniqueName";

export default function EditCollectionModal({
  setIsOpen,
  data,
  mutateCollection,
  hanger,
}) {
  // Fetched data
  const { user } = useUser();
  // Local state
  const [loadingImage, setLoadingImage] = useState(false);
  const creatorId = data.userId;
  // Input states
  const [chips, setChips] = useState(data.tags);
  const [title, setTitle] = useState(data.title);
  const [description, setDescription] = useState(data.description);
  const [imageUrl, setImageUrl] = useState(data.imageUrl);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileUrl, setSelectedFileUrl] = useState(null);
  // Loading and Error message state
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  // Handler
  // Effect
  useEffect(() => {
    setErrMsg("");
  }, [title, selectedFile, description, chips]);
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
      const preset = "collection_image";
      const trimmedTitle = title.trim();
      const imageId = generateUniqueName(trimmedTitle.slice(0, 10));
      const updatedUrl = await getImageUrl(
        imageUrl,
        selectedFile,
        preset,
        imageId
      );
      const trimmedDescription = description.trim();
      // Data to update
      const dataToSend = {
        title: trimmedTitle,
        description: trimmedDescription,
        tags: chips,
        imageUrl: updatedUrl,
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
    <PortalModalWrapper mountTarget={hanger}>
      <div className="bg-white relative rounded-md p-6">
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
            <label className="font-semibold">Title</label>
            <input
              maxLength={225}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border-b-2 px-2  resize-none focus:border-blue-300 focus:outline-none bg-transparent border-gray-300"
            ></input>
          </div>
          {/* Description max length 100 */}
          <div className="space-y-1 ">
            <label className="font-semibold">Description</label>
            <TextareaAutosize
              placeholder="No description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              maxLength={225}
              wrap="hard"
              className="w-full px-2 border-b-2 resize-none focus:border-blue-300 focus:outline-none bg-transparent border-gray-300"
            ></TextareaAutosize>
          </div>
          {/* Tags */}
          <div className="space-y-1 max-w-[380px]">
            <label className="font-semibold">Tags</label>
            <StyledChips chips={chips} setChips={setChips} />
          </div>
          {/* Image upload */}
          <div className="space-y-1 flex flex-col ">
            <label className="font-semibold">Image</label>
            {/*Show Current Image if no image selected */}
            <div className="relative w-20 h-20">
              {data.imageUrl && !selectedFileUrl && (
                <Image
                  fill
                  alt={`collection-${data.title}-image`}
                  style={{ objectFit: "contain" }}
                  sizes="80px"
                  src={data.imageUrl}
                />
              )}
              {/*Show Selected image */}
              {selectedFileUrl && (
                <Image
                  fill
                  alt={`collection-${data.title}-image`}
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
            disabled={loading || !title || loadingImage}
            className={`${
              !title || loading || loadingImage ? "bg-blue-400" : "bg-blue-600"
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
