import { updateImage, uploadImage } from "@services/CldService";

export const getImageUrl = async (
  oldImageUrl,
  selectedFile,
  preset = "collection_image",
  imageId = null
) => {
  // If no selected file and no oldImageUrl
  if (!selectedFile && !oldImageUrl) {
    return null;
    // If has oldImageUrl but no selected file
  } else if (oldImageUrl && !selectedFile) {
    return oldImageUrl;
    // If has/no imageUrl and selected file -> upload/update url
  } else {
    const match = oldImageUrl?.match(/\/([^/]+)\.png$/);
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
      const { data } = await uploadImage(selectedFile, imageId, preset);
      const updatedUrl = data.secure_url;
      return updatedUrl;
    }
  }
};
