const express = require("express");
const { verifyJWT, isAdmin } = require("../middlewares/authMiddleware.js");
const { createCoupon, getAllCoupons, updateCoupon, deleteCoupon, getCurrentCoupon } = require("../controller/couponController.js");
const router = express.Router();



router.post("/", verifyJWT, isAdmin, createCoupon);
router.get("/all-coupons", verifyJWT, isAdmin, getAllCoupons);
router.get("/:id", verifyJWT, isAdmin, getCurrentCoupon);
router.put("/:id", verifyJWT, isAdmin, updateCoupon);
router.delete("/:id", verifyJWT, isAdmin, deleteCoupon);



module.exports = router;