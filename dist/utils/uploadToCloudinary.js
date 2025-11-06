"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadToCloudinary = void 0;
const cloudinary_1 = require("cloudinary");
const envConfig_1 = require("../config/envConfig");
// Configure Cloudinary
cloudinary_1.v2.config({
    cloud_name: envConfig_1.envVars.CLOUDINARY_CLOUD_NAME,
    api_key: envConfig_1.envVars.CLOUDINARY_API_KEY,
    api_secret: envConfig_1.envVars.CLOUDINARY_API_SECRET,
});
const uploadToCloudinary = (fileBuffer, options = {}) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary_1.v2.uploader.upload_stream(Object.assign({ folder: "user_images" }, options), (error, result) => {
            if (error)
                return reject(error);
            resolve(result);
        });
        uploadStream.end(fileBuffer);
    });
};
exports.uploadToCloudinary = uploadToCloudinary;
