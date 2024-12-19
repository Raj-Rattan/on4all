const User = require("../models/userModel.js");
const Cart = require("../models/cartModel.js");
const Product = require("../models/productModel.js");
const Coupon = require("../models/couponModel.js");
const Order = require("../models/orderModel.js");
const ApiError = require("../utils/ApiError.js");
const ApiResponse = require("../utils/ApiResponse.js");
const { asyncHandeler } = require("../utils/asyncHandeler.js");
const validateMongoDbId = require("../utils/validateMongodbId.js");
const jwt = require("jsonwebtoken");
const sendEmail = require("./emailController.js");
const uniqid = require('uniqid');

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken

        await user.save({ validateBeforeSave: false })
        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(500, "something went wrong while generating access and refresh token")
    }
}

const registerUser = asyncHandeler(async (req, res) => {

    // 1. get user details from frontend
    const { firstName, lastName, email, mobile, password, role, cart, address, wishlist } = req.body

    // 2. validation - not empty
    if (
        [firstName, email, mobile, password, role, cart, address, wishlist].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "Some fields are required")
    }

    // 3. check if user already exist: email
    const existedUser = await User.findOne({ email })

    if (existedUser) {
        throw new ApiError(409, "User with this email already exist")
    }

    // 4. create user object - create entry in db
    const user = await User.create({
        firstName,
        lastName,
        email,
        mobile,
        password,
        role,
        cart,
        address,
        wishlist
    })

    // 5. remove password field from response
    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    // 6. check for user creation
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    // 7. return res
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )

})

const loginUser = asyncHandeler(async (req, res) => {

    // 1. req body -> data (request body se data le aao)
    const { email, password } = req.body

    // 2. validation - not empty
    if (!(email || password)) {
        throw ApiError(400, "username and password is required")
    }

    // 3. find the user
    const user = await User.findOne({ email })

    // console.log(user)

    if (!user) {
        throw new ApiError(404, "User does not exist")
    }

    // 4. password check
    const isPasswordValid = await user.isPasswordCorrect(password)
    // console.log(isPasswordValid)

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials")
    }

    // 5. generate token

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(
            200,
            {
                user: loggedInUser, accessToken
            },
            "User logged in successfully"
        ))

})

// login Admin

const loginAdmin = asyncHandeler(async (req, res) => {
    // 1. req body -> data (request body se data le aao)
    const { email, password } = req.body

    // 2. validation - not empty
    if (!(email || password)) {
        throw ApiError(400, "username and password is required")
    }

    // 3. find the user
    const admin = await User.findOne({ email })

    // console.log(user)

    if (!admin) {
        throw new ApiError(404, "User does not exist")
    }

    if (admin.role !== "admin") {
        throw new ApiError(403, 'You are not authorized to perform this action')
    }

    // 4. password check
    const isPasswordValid = await admin.isPasswordCorrect(password)
    // console.log(isPasswordValid)

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials")
    }

    // 5. generate token

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(admin._id)

    const loggedInAdmin = await User.findById(admin._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(
            200,
            {
                user: loggedInAdmin, accessToken, refreshToken
            },
            "User logged in successfully"
        ))
})

const logoutUser = asyncHandeler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        { new: true }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User Logged Out successfully"))
})

const refreshAccessToken = asyncHandeler(async (req, res) => {
    const incommingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    // console.log(incommingRefreshToken)

    if (!incommingRefreshToken) {
        throw new ApiError(401, "Unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(incommingRefreshToken, process.env.REFRESH_TOKEN_SECRET)

        // console.log(decodedToken)

        const user = await User.findById(decodedToken._id)

        // console.log(user);

        if (!user) {
            throw new ApiError(401, "Invalid refresh token")
        }

        if (incommingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")
        }

        // Generate a new access token and save the new refresh token to the database
        const { accessToken, newRefreshToken } = generateAccessAndRefreshToken(user._id)

        const options = {
            httpOnly: true,
            secure: true
        }

        return res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(new ApiResponse(
                200,
                { accessToken, refreshToken: newRefreshToken },
                "New Access Token generated"
            ))


    } catch (error) {
        throw new ApiError(401, error?.message || "Something went wrong while trying to verify your tokens")
    }
})

const saveUserAddress = asyncHandeler(async (req, res) => {
    const { address } = req.body
    const { _id } = req.user;
    validateMongoDbId(_id);

    try {
        const updatedUser = await User.findByIdAndUpdate(
            _id,
            {
                $set: {
                    address
                }
            },
            { new: true }
        )

        return res.status(200)
            .json(new ApiResponse(200, updatedUser, 'Adress saved successfully'))

    } catch (error) {
        throw new ApiError(400, error?.message || 'Invalid data provided')
    }



})

const getAllUsers = asyncHandeler(async (req, res) => {
    try {
        const allUsers = await User.find().select("-password")
        return res.status(200)
            .json(new ApiResponse(
                200,
                allUsers,
                "Users fetched successfully"
            ))
    } catch (error) {
        throw new ApiError(500, "Server error while fetching users")
    }
})

const getCurrentUser = asyncHandeler(async (req, res) => {
    const { _id } = req.user;
    validateMongoDbId(_id)

    try {
        const currentUser = await User.findById(_id).select("-password")

        if (!currentUser) {
            // If currentUser is null, the user doesn't exist
            return res.status(404).json(new ApiError(404, "User not found"));
        }

        return res.status(200)
            .json(new ApiResponse(
                200,
                currentUser,
                "User fetched successfully"
            ))
    } catch (error) {
        throw new ApiError(500, "Server error while fetching the user")
    }
})

const updateUserDetails = asyncHandeler(async (req, res) => {
    // console.log(req.user)
    const { firstName, lastName, email, mobile } = req.body
    const { _id } = req.user
    validateMongoDbId(_id)
    try {
        // console.log(res.user._id)
        const userDetails = await User.findByIdAndUpdate(
            _id,
            {
                $set: {
                    firstName,
                    lastName,
                    email,
                    mobile
                }
            },
            { new: true }
        ).select("-password")
        // console.log(userDetails)

        return res.status(200)
            .json(new ApiResponse(200, userDetails, "Account details updated successfullly"))
    } catch (error) {
        throw new ApiError(500, "Error while updating the user")
    }
})

const deleteCurrentUser = asyncHandeler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id)
    try {
        const currentUser = await User.findByIdAndDelete(id).select("-password")

        if (!currentUser) {
            // If currentUser is null, the user doesn't exist
            return res.status(404).json(new ApiError(404, "User not found"));
        }

        return res.status(200)
            .json(new ApiResponse(
                200,
                currentUser,
                "User deleted successfully"
            ))
    } catch (error) {
        throw new ApiError(500, "Server error while deleting the user")
    }
})

const blockUser = asyncHandeler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id)

    try {
        const blockUser = await User.findByIdAndUpdate(
            id,
            {
                $set: {
                    isBlocked: true
                }
            },
            { new: true }
        )

        if (!blockUser) {
            throw new ApiError(404, "user does not exist")
        }

        return res.status(200)
            .json(new ApiResponse(200, {}, "user blocked successfully"))

    } catch (error) {
        throw new ApiError(404, "error while blocking the user")
    }

})

const unBlockUser = asyncHandeler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id)

    try {
        const unBlockUser = await User.findByIdAndUpdate(
            id,
            {
                $set: {
                    isBlocked: false
                }
            },
            { new: true }
        )

        if (!unBlockUser) {
            throw new ApiError(404, "user does not exist")
        }

        return res.status(200)
            .json(new ApiResponse(200, {}, "user unblocked successfully"))

    } catch (error) {
        throw new ApiError(404, "error while unblocking the user")
    }
})

const updatePassword = asyncHandeler(async (req, res) => {
    const { accessToken } = req.params;
    const { password } = req.body;
    const hashedAccessToken = crypto.createHash('sha256').update(accessToken).digest('hex');
    const user = await User.findOne(
        {
            passwordResetToken: hashedAccessToken,
            passwordResetExpires: { $gt: Date.now() }
        }
    )
    if (!user) {
        throw new ApiError(404, "user not found or token expired")
    }
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    const updatePassword = await user.save();
    return res.status(201)
        .json(new ApiResponse(201, updatePassword, "password updated successfully"));

})

const forgotPasswordToken = asyncHandeler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, 'user not found or email is not registered');
    }

    try {
        const token = await user.createPasswordResetToken();
        await user.save();
        // send reset password mail with token to user's email id  
        const resetURL = `Follow this link to reset your Password: <a href="http://localhost:5173/reset-password/${token}">Click Here</a> \n The link is valid till 10 minutes from now.`;
        const data = {
            to: email,
            subject: "Forgot Password Link",
            text: "Please use the below link to reset your password.",
            html: resetURL
        }
        sendEmail(data);
        // console.log(data);
        return res.status(200)
            .json(new ApiResponse(
                200,
                token,
                `A link has been sent to your email  ${email} to reset your password.`
            ));


    } catch (error) {
        throw new Error(error?.message || "something went wrong!");
        // Used 'next' to pass the error to the error handling middleware

    }
})

const getWishlist = asyncHandeler(async (req, res) => {
    const { _id } = req.user;
    // console.log(req.user)
    try {
        // console.log(user);
        const user = await User.findById(_id).populate("wishlist")

        return res.status(200)
            .json(new ApiResponse(
                200,
                user,
                "User Wishlist fetched Successfully"
            ))

    } catch (error) {
        throw new ApiError(500, error?.message || 'Something went wrong while fetching wishlist')
    }
})

const userCart = asyncHandeler(async (req, res) => {
    const { productId, color, price, quantity } = req.body;
    const { _id } = req.user;
    validateMongoDbId(_id);

    try {
        const newCart = await new Cart({
            userId: _id,
            productId,
            color,
            price,
            quantity,
        }).save();

        return res.status(201)
            .json(new ApiResponse(201, newCart, "Product added to the cart successfully"))

    } catch (error) {
        throw new ApiError(error?.message || 400, 'Something went wrong while adding product to the cart')
    }
})

const getUserCart = asyncHandeler(async (req, res) => {
    const { _id } = req.user;
    validateMongoDbId(_id);

    try {
        const cart = await Cart.find({ userId: _id }).populate("productId").populate("color");

        return res.status(200)
            .json(new ApiResponse(200, cart, 'Getting user cart was successful'))

    } catch (error) {
        throw new ApiError(500, error?.message || 'Server error while getting user cart')
    }
})

const removeProductFromCart = asyncHandeler(async (req, res) => {
    const { _id } = req.user;
    const { cartItemId } = req.params;
    validateMongoDbId(_id);

    try {
        const deleteProductFromCart = await Cart.deleteOne(
            {
                userId: _id,
                _id: cartItemId,
            }
        )

        return res.status(200)
            .json(new ApiResponse(200, deleteProductFromCart, 'Product has been removed from cart'))

    } catch (error) {
        throw new ApiError(500, error?.message || 'Server error while removing product from cart')
    }
})

const emptyCart = asyncHandeler(async (req, res) => {
    const { _id } = req.user;
    validateMongoDbId(_id);

    try {
        const deleteCart = await Cart.deleteMany({ userId: _id })

        return res.status(200)
            .json(new ApiResponse(200, deleteCart, 'Cart has been emptied'))

    } catch (error) {
        throw new ApiError(500, error?.message || 'Server error while emptying cart')
    }
})

const updateProductQuantityFromCart = asyncHandeler(async (req, res) => {
    const { _id } = req.user;
    const { cartItemId, newQuantity } = req.params;
    validateMongoDbId(_id);

    try {
        const cartItem = await Cart.findOne(
            {
                userId: _id,
                _id: cartItemId,
            }
        )

        cartItem.quantity = newQuantity
        cartItem.save()

        return res.status(200)
            .json(new ApiResponse(200, cartItem,
                `The quantity of product has been updated`
            ))

    } catch (error) {
        throw new ApiError(500, error?.message ||
            `Server Error While Updating The Quantity Of Product`
        )
    }
})

const createOrder = asyncHandeler(async (req, res) => {
    const { shippingInfo, orderItems, totalPrice, totalPriceAfterDiscount, paymentInfo } = req.body;
    const { _id } = req.user;

    try {
        const order = await Order.create(
            {
                shippingInfo,
                orderItems,
                totalPrice,
                totalPriceAfterDiscount,
                paymentInfo,
                user: _id,
            }
        )
        return res.status(200)
            .json(new ApiResponse(200, order, 'Order Created Successfully',))
    } catch (error) {
        throw new ApiError(500, error?.message || `Server Error While Creating The Order`)
    }
})

const getUserOrders = asyncHandeler(async (req, res) => {
    const { _id } = req.user
    try {
        const orders = await Order.find({ user: _id }).populate("user").populate("orderItems.product").populate("orderItems.color")
        return res.status(200)
            .json(new ApiResponse(200, orders, 'Orders Fetched Successfully',))
    } catch (error) {
        throw new ApiError(500, error?.message || `Server Error While Fetching The Orders`)
    }
})

const getAllOrders = asyncHandeler(async (req, res) => {
    try {
        const orders = await Order.find().populate("user").populate("orderItems.product").populate("orderItems.color")
        return res.status(200)
            .json(new ApiResponse(200, orders, 'Orders Fetched Successfully',))
    } catch (error) {
        throw new ApiError(500, error?.message || `Server Error While Fetching The Orders`)
    }
})

const getSingleOrder = asyncHandeler(async (req, res) => {
    const { id } = req.params
    try {
        const order = await Order.findOne({ _id: id }).populate("user").populate("orderItems.product")
        if (!order) {
            // If no order is found, return a 404 status
            return res.status(404).json(new ApiResponse(404, null, 'No order found with the given ID'));
        }
        return res.status(200)
            .json(new ApiResponse(200, order, 'Order Fetched Successfully',))
    } catch (error) {
        throw new ApiError(500, error?.message || `Server Error While Fetching The Order`)
    }
})

const updateOrder = asyncHandeler(async (req, res) => {
    const { id } = req.params
    try {
        const order = await Order.findById(id)
        order.orderStatus = req.body.status;
        await order.save({ validateBeforeSave: false })
        return res.status(200)
            .json(new ApiResponse(200, order, `Order Status Updated Successfully`,))
    } catch (error) {
        throw new ApiError(500, error?.message || `Server Error While Updating The Order Status`)
    }
})

const getMonthWiseOrderIncome = asyncHandeler(async (req, res) => {
    let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let d = new Date()
    let endDate = ""
    d.setDate(1)
    for (let index = 0; index < 11; index++) {
        d.setMonth(d.getMonth() - 1)
        endDate = monthNames[d.getMonth()] + " " + d.getFullYear()
    }
    const data = await Order.aggregate(
        [
            {
                $match: {
                    createdAt: {
                        $lte: new Date(),
                        $gte: new Date(endDate)
                    }
                }
            },
            {
                $group: {
                    _id: {
                        month: "$month"
                    },
                    amount: {
                        $sum: "$totalPriceAfterDiscount"
                    },
                    count: {
                        $sum: 1
                    }
                }
            }
        ]
    )

    res.status(200)
        .json(new ApiResponse(
            200,
            data,
            "Orders fetched successfully",
        ))

})

const getYearlyTotalOrders = asyncHandeler(async (req, res) => {
    let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let d = new Date()
    let endDate = ""
    d.setDate(1)
    for (let index = 0; index < 11; index++) {
        d.setMonth(d.getMonth() - 1)
        endDate = monthNames[d.getMonth()] + " " + d.getFullYear()
    }
    const data = await Order.aggregate(
        [
            {
                $match: {
                    createdAt: {
                        $lte: new Date(),
                        $gte: new Date(endDate)
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    count: {
                        $sum: 1
                    },
                    amount: {
                        $sum: "$totalPriceAfterDiscount"
                    }
                }
            }
        ]
    )

    res.status(200)
        .json(new ApiResponse(
            200,
            data,
            "Orders fetched successfully",
        ))

})

module.exports = {
    registerUser,
    loginUser,
    getAllUsers,
    getCurrentUser,
    deleteCurrentUser,
    updateUserDetails,
    blockUser,
    unBlockUser,
    logoutUser,
    refreshAccessToken,
    updatePassword,
    forgotPasswordToken,
    loginAdmin,
    getWishlist,
    saveUserAddress,
    userCart,
    getUserCart,
    createOrder,
    getUserOrders,
    removeProductFromCart,
    updateProductQuantityFromCart,
    getMonthWiseOrderIncome,
    getYearlyTotalOrders,
    getAllOrders,
    getSingleOrder,
    updateOrder,
    emptyCart,
}