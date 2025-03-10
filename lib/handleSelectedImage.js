import {
  MAX_COLLECTION_IMG_SIZE,
  MAX_COLLECTION_IMG_SIZE_TEXT as MAX_IMG_SIZE_TEXT,
} from "@utils/config";
import { compressImage } from "./imageCompressor";

export const handleSelectedImage = async ({
  selectedFile,
  inputTarget,
  setErrMsg,
  setSelectedFile,
  setSelectedFileUrl,
  setLoadingImage,
}) => {
  // Set selected file
  setErrMsg("");
  if (!selectedFile) return;
  const currentFile = selectedFile;
  const maxSizeInBytes = MAX_COLLECTION_IMG_SIZE;
  if (currentFile && currentFile.size > maxSizeInBytes) {
    setErrMsg(`Maximum image size is ${MAX_IMG_SIZE_TEXT}.Try again`);
    inputTarget = null;
    setSelectedFile(null);
    setSelectedFileUrl(null);
  } else {
    setLoadingImage(true);
    const compressedImage = await compressImage(selectedFile)
      .then((res) => res)
      .catch((err) => null);

    setSelectedFile(compressedImage);
    // Get and set selected file local url
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedFileUrl(e.target.result);
    };
    reader.readAsDataURL(compressedImage);
    setLoadingImage(false);
  }
};

export const handleGeneratedImageUrl = async () => {};
