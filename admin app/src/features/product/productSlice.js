import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import productService from './productService';


export const getProducts = createAsyncThunk(
    "product/get-products",
    async (thunkAPI) => {
        try {
            return await productService.getProducts();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const createProducts = createAsyncThunk(
    "product/create-products",
    async (productData, thunkAPI) => {
        try {
            return await productService.createProduct(productData);
        } catch (error) {
            const errorMessage = error.message || 'Failed to create product';
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
)

export const getCurrentProduct = createAsyncThunk(
    "product/get-product",
    async (id, thunkAPI) => {
        try {
            return await productService.getCurrentProduct(id);
        } catch (error) {
            const errorMessage = error.message || 'Failed to get product';
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
)

export const updateCurrentProduct = createAsyncThunk(
    "product/update-product",
    async (product, thunkAPI) => {
        try {
            return await productService.updateCurrentProduct(product);
        } catch (error) {
            const errorMessage = error.message || 'Failed to update product';
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
)

export const deleteCurrentProduct = createAsyncThunk(
    "product/delete-product",
    async (id, thunkAPI) => {
        try {
            return await productService.deleteCurrentProduct(id);
        } catch (error) {
            const errorMessage = error.message || 'Failed to delete product';
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
)



const initialState = {
    products: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};

export const resetState = createAction("Reset_all");

export const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.products = action.payload;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(createProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdProduct = action.payload;
            })
            .addCase(createProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            })
            .addCase(getCurrentProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCurrentProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.productName = action.payload.data.title;
                state.productCategory = action.payload.data.productCategory;
                state.productDescription = action.payload.data.description;
                state.productPrice = action.payload.data.price;
                state.productBrand = action.payload.data.brand;
                state.tagsProduct = action.payload.data.tags;
                state.productColor = action.payload.data.color;
                state.productQuantity = action.payload.data.quantity;
                state.productImages = action.payload.data.images;
            })
            .addCase(getCurrentProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            })
            .addCase(updateCurrentProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateCurrentProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedProduct = action.payload;
            })
            .addCase(updateCurrentProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            })
            .addCase(deleteCurrentProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCurrentProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedProduct = action.payload;
            })
            .addCase(deleteCurrentProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            })
            .addCase(resetState, () => initialState);

    }
});


export default productSlice.reducer;