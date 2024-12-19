const express = require("express");
const { uploadImages, deleteImages } = require("../controller/uploadController.js");
const { verifyJWT, isAdmin } = require("../middlewares/authMiddleware.js");
const { uploadImage, productImgResize } = require("../middlewares/multerMiddleware.js");
const router = express.Router();


router.post("/", verifyJWT, isAdmin, uploadImage.array("images", 10), productImgResize, uploadImages);

router.delete("/delete-image/:id", verifyJWT, isAdmin, deleteImages);

module.exports = router;