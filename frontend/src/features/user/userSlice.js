import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { authService } from "./userService";
import { toast } from "react-toastify";

export const registerUser = createAsyncThunk("auth/register", async (userData, thunkAPI) => {
    try {
        return await authService.register(userData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const loginUser = createAsyncThunk("auth/login", async (userData, thunkAPI) => {
    try {
        return await authService.login(userData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const getUserProductWishlist = createAsyncThunk("user/wishlist", async (_, thunkAPI) => {
    try {
        return await authService.getUserWishlist();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const addProductToCart = createAsyncThunk("user/add-to-cart", async (cartData, thunkAPI) => {
    try {
        return await authService.addToCart(cartData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const getUserCart = createAsyncThunk("user/get-user-cart", async (thunkAPI) => {
    try {
        return await authService.getCart();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const deleteCartProduct = createAsyncThunk("user/delete-cart-product", async (id, thunkAPI) => {
    try {
        return await authService.removeProductFromCart(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const updateCartProduct = createAsyncThunk("user/update-cart-product", async (cartDetail, thunkAPI) => {
    try {
        return await authService.updateProductFromCart(cartDetail);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const emptyUserCart = createAsyncThunk("user/empty-user-cart", async (thunkAPI) => {
    try {
        return await authService.emptyCart();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const createCurrentOrder = createAsyncThunk("user/cart/create-order", async (orderDetail, thunkAPI) => {
    try {
        return await authService.createOrder(orderDetail);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const getOrders = createAsyncThunk("user/get-my-orders", async (thunkAPI) => {
    try {
        return await authService.getUserOrders();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const updateProfile = createAsyncThunk("user/update/profile", async (data, thunkAPI) => {
    try {
        return await authService.updateUser(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const forgotPasswordToken = createAsyncThunk("user/password/token", async (data, thunkAPI) => {
    try {
        return await authService.forgotPassToken(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const resetPassword = createAsyncThunk("user/password/reset", async (data, thunkAPI) => {
    try {
        return await authService.resetPass(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const resetState = createAction("Reset_all");

const getCustomerFromLocalStorage = localStorage.getItem("customer") ? JSON.parse(localStorage.getItem('customer')) : null;

const initialState = {
    user: getCustomerFromLocalStorage,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
    wishlist: []
}

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdUser = action.payload;
                if (state.isSuccess === true) {
                    toast.info("User created successfully!");
                }
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError === true) {
                    // Extract error message from HTML response
                    const errorMessageMatch = action.payload.response.data.match(/Error:\s*([^<]+)/);
                    const errorMessage = errorMessageMatch ? errorMessageMatch[1].trim() : 'Unknown error';
                    toast.error(errorMessage);
                }
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.user = action.payload;
                if (state.isSuccess === true) {
                    localStorage.setItem("accessToken", action.payload.data.accessToken);
                    toast.info("User logged in successfully!");
                }
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError === true) {
                    // Extract error message from HTML response
                    const errorMessageMatch = action.payload.response.data.match(/Error:\s*([^<]+)/);
                    const errorMessage = errorMessageMatch ? errorMessageMatch[1].trim() : 'Unknown error';

                    toast.error(errorMessage);
                }
            })
            .addCase(getUserProductWishlist.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserProductWishlist.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.wishlist = action.payload;
            })
            .addCase(getUserProductWishlist.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(addProductToCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addProductToCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.cartProduct = action.payload;
                if (state.isSuccess) {
                    toast.success("Product Added to Cart")
                }
            })
            .addCase(addProductToCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getUserCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.cartProducts = action.payload;
            })
            .addCase(getUserCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(deleteCartProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCartProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedCartProduct = action.payload;
                if (state.isSuccess) {
                    toast.success("Product Deleted from Cart")
                }
            })
            .addCase(deleteCartProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isSuccess === false) {
                    toast.error("Product Not Deleted from Cart")
                }
            })
            .addCase(updateCartProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateCartProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedCartProduct = action.payload;
                if (state.isSuccess) {
                    toast.success("Product Updated Successfully!")
                }
            })
            .addCase(updateCartProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isSuccess === false) {
                    toast.error("Product Not Updated Successfully!")
                }
            })
            .addCase(createCurrentOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createCurrentOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.orderedProduct = action.payload;
                if (state.isSuccess) {
                    toast.success("Order Placed Successfully!")
                }
            })
            .addCase(createCurrentOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isSuccess === false) {
                    toast.error("Order Not Placed Successfully!")
                }
            })
            .addCase(getOrders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.getOrderedProducts = action.payload;
            })
            .addCase(getOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(updateProfile.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedUser = action.payload;
                let currentUser = JSON.parse(localStorage.getItem("customer"))
                let newUserData = {
                    ...currentUser,
                    firstName: action?.payload?.data?.firstName,
                    lastName: action?.payload?.data?.lastName,
                    email: action?.payload?.data?.email,
                    mobile: action?.payload?.data?.mobile,
                }
                localStorage.setItem("customer", JSON.stringify(newUserData));
                toast.success("Profile Updated Successfully!")

            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isSuccess === false) {
                    toast.error("Profile Not Updated!")
                }
            })
            .addCase(forgotPasswordToken.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(forgotPasswordToken.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.accessToken = action.payload;
                if (state.isSuccess) {
                    toast.success("Password Reset Link Sent Successfully!")
                }
            })
            .addCase(forgotPasswordToken.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isSuccess === false) {
                    toast.error("Password Reset Link Not Sent!")
                }
            })
            .addCase(resetPassword.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedPassword = action.payload;
                if (state.isSuccess) {
                    toast.success("Password Reset Successfully!")
                }
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isSuccess === false) {
                    toast.error("Password Reset Failed!")
                }
            })
            .addCase(emptyUserCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(emptyUserCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.emptiedCart = action.payload;
            })
            .addCase(emptyUserCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(resetState, () => initialState);
    }
})


export default authSlice.reducer;