
import cloudinary, { ConfigOptions } from "cloudinary";
import * as dotenv from "dotenv";
import { Readable } from "stream";
dotenv.config()

interface Cloudinary {
  config(options: ConfigOptions): void;
  uploader: any; 
}

const cloudinaryInstance: Cloudinary = cloudinary.v2 as Cloudinary;

cloudinaryInstance.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key:process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});





export const uploadImageToCloud = async (buffer: any, imageName:string) => {
  try {

    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinaryInstance.uploader.upload_stream(
        {
          folder: "ProfilePicture",
          public_id: imageName,
          resource_type: "auto",
        },
        (error: any, result: any) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        }
      );

      stream.pipe(uploadStream);
    });
  } catch (error) {
    throw{error}
  }
};

