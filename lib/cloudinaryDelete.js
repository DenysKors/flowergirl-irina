import cloudinary from "@/services/cloudinary";

export const deleteImage = async (publicID) => {
  try {
    const result = await cloudinary.api.delete_resources(publicID);
    return result;
  } catch (error) {
    console.error(error);
  }
};
