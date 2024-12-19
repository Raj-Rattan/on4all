import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { productService } from "./productService";


export const getAllProducts = createAsyncThunk("product/getAllProducts", async (data, thunkAPI) => {
    try {
        return await productService.getProducts(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const getSingleProduct = createAsyncThunk("product/getSingleProduct", async (id, thunkAPI) => {
    try {
        return await productService.getSingleProduct(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const addToWishlist = createAsyncThunk("product/wishlist", async (productId, thunkAPI) => {
    try {
        return await productService.addToWishlist(productId);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const addRating = createAsyncThunk("product/add-rating", async (data, thunkAPI) => {
    try {
        return await productService.rateProduct(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

const productState = {
    product: "",
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

export const productSlice = createSlice({
    name: "product",
    initialState: productState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.product = action.payload;
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(addToWishlist.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addToWishlist.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.addToWishlist = action.payload;
                state.message = `Product Added to wishlist!`;
            })
            .addCase(addToWishlist.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getSingleProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getSingleProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.singleProduct = action.payload;
                state.message = `Single product fetch successfully!`;
            })
            .addCase(getSingleProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(addRating.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addRating.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.rating = action.payload;
                state.message = 'Rating added successfully!';
                if (state.isSuccess) {
                    toast.success('Rating added successfully!')
                }
            })
            .addCase(addRating.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            });
    }
})


export default productSlice.reducer;