import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
import { ENV } from "../config/env.js"

cloudinary.config({
    cloud_name: ENV.CLOUDINARY_CLOUD_NAME,
    api_key: ENV.CLOUDINARY_API_KEY,
    api_secret: ENV.CLOUDINARY_API_SECRET
})

const uploadToCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null
        // upload to cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file uploaded 
        // console.log("File uploaded to cloudinary", response.url);
        fs.unlinkSync(localFilePath)
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath) // removes local saved temporary file if upload operations fails
        console.log("Error uploading to cloudinary", error);
        return null
    }
}

export {uploadToCloudinary}