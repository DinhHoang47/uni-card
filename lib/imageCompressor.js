import imageCompression from "browser-image-compression";

const options = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1920,
  useWebWorker: true,
};

export const compressImage = async (imageFile) => {
  const compressedFile = await imageCompression(imageFile, options);
  return compressedFile;
};
