import cloudinary from "@/services/cloudinary";

export const uploadProductImage = async (Buffer) => {
  const uploadResult = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { resource_type: "image", overwrite: true },
        (error, uploadResult) => {
          if (error) return reject(error);
          resolve(uploadResult);
        }
      )
      .end(Buffer);
  });
  return uploadResult.public_id;
};
