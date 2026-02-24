import cloudinary from "@/services/cloudinary";

export const uploadImage = async (fileUri) => {
  try {
    const result = await cloudinary.uploader.upload(fileUri, {
      resource_type: "image",
      overwrite: true,
    });
    return result.public_id;
  } catch (error) {
    console.error(error);
  }
};
