import axios from "axios";
import { CLOUDINARY_URL } from "./config";

export const uploadImage = (file, public_id = null) => {
  const formData = new FormData();
  formData.append("upload_preset", "collection_image");
  if (public_id) {
    formData.append("public_id", public_id);
  }
  formData.append("file", file);
  return axios({
    method: "POST",
    url: `${CLOUDINARY_URL}/image/upload`,
    data: formData,
  })
    .then((res) => res)
    .catch(() => {
      throw new Error();
    });
};
