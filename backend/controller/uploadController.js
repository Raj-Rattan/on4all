
const ApiError = require("../utils/ApiError.js");
const ApiResponse = require("../utils/ApiResponse.js");
const { asyncHandeler } = require("../utils/asyncHandeler.js");
const fs = require("fs");
const { uploadOnCloudinary, deleteFromCloudinary } = require("../utils/cloudinary.js")


const uploadImages = asyncHandeler(async (req, res) => {
    try {
        // console.log("req.files", req.files);
        // const files = req.files;
        // if (!Array.isArray(files)) {
        //     throw new ApiError(400, "No files uploaded");
        // }

        const uploader = (path) => uploadOnCloudinary(path, "images");
        const urls = [];
        const files = req.files;
        // console.log("Files", files);
        for (const file of files) {
            const { path } = file;
            const cloudUrl = await uploader(path);
            urls.push(cloudUrl);
            try {
                fs.unlinkSync(path);
            } catch (error) {
                console.error(`Error unlinking file: ${error.message}`);
            }
        }

        // console.log(urls);
        const images = urls.map((file) => {
            return file;
        })

        return res.status(200)
            .json(new ApiResponse(
                200,
                images,
                `Image uploaded successfully`
            ))

    } catch (error) {
        throw new ApiError(400, error?.message || "Error in uploading image")
    }
})

const deleteImages = asyncHandeler(async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await deleteFromCloudinary(id, "image");

        return res.status(200)
            .json(new ApiResponse(
                200,
                deleted,
                `Image deleted successfully`
            ))

    } catch (error) {
        throw new ApiError(400, error?.message || "Error in deleting image")
    }
})


module.exports = {
    uploadImages,
    deleteImages
}