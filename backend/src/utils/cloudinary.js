import {v2 as cloudinary} from "cloudinary"
import { log } from "console"
import { response } from "express"
import fs from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadToCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null
        // upload to cloudinary
        response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file uploaded 
        console.log("File uploaded to cloudinary", response.url);
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath) // removes local saved temporary file if upload operations fails
        console.log("Error uploading to cloudinary", error);
        return null
    }
}

export {uploadToCloudinary}