import axios from "axios";
import { CLOUDINARY_URL } from "./config";
import { objectToFormData } from "@utils/objectToFormData";
import { privateCollectionServ } from "./Private_CollectionService";

export const uploadImage = async (
  file,
  public_id = null,
  upload_preset = "collection_image"
) => {
  const dataToSign = { upload_preset };
  if (public_id) {
    dataToSign.public_id = public_id;
  }
  try {
    const { data: paramsNSignature } =
      await privateCollectionServ.getCloudinarySignature(dataToSign);
    const uploadData = { file, ...paramsNSignature };
    const formData = objectToFormData(uploadData);
    return axios({
      method: "POST",
      url: `${CLOUDINARY_URL}/image/upload`,
      data: formData,
    });
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};

export const updateImage = async (
  file,
  public_id = null,
  upload_preset = "collection_image"
) => {
  const { data: paramsAndSignature } =
    await privateCollectionServ.getCloudinarySignature({
      public_id,
      upload_preset: upload_preset,
    });
  const formData = objectToFormData({
    file,
    ...paramsAndSignature,
  });
  return axios({
    method: "POST",
    url: `${CLOUDINARY_URL}/image/upload`,
    data: formData,
  });
};

export const uploadImageViaUrl = async (imageUrl) => {};
