import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import productCategoryService from './prodCategoryService';


export const getProductCategories = createAsyncThunk(
    "product-category/get-product-categories",
    async (thunkAPI) => {
        try {
            return await productCategoryService.getProductCategories();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const resetState = createAction("Reset_all");

export const createProductCategory = createAsyncThunk(
    "product-category/create-product-category",
    async (productCategoryData, thunkAPI) => {
        try {
            return await productCategoryService.createProductCategory(productCategoryData);
        } catch (error) {
            const errorMessage = error.message || 'Failed to Product Category';
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
)

export const getCurrProductCategory = createAsyncThunk(
    "product-category/get-current-product-category",
    async (id, thunkAPI) => {
        try {
            return await productCategoryService.getCurrProductCategory(id);
        } catch (error) {
            const errorMessage = error.message || 'Failed to get a product category';
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
)

export const updateCurrProductCategory = createAsyncThunk(
    "product-category/update-current-product-category",
    async (category, thunkAPI) => {
        try {
            return await productCategoryService.updateCurrProductCategory(category);
        } catch (error) {
            const errorMessage = error.message || 'Failed to create product category';
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
)

export const deleteCurrProductCategory = createAsyncThunk(
    "product-category/delete-current-product-category",
    async (id, thunkAPI) => {
        try {
            return await productCategoryService.deleteCurrProductCategory(id);
        } catch (error) {
            const errorMessage = error.message || 'Failed to get a product category';
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
)

const initialState = {
    productCategories: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};

export const productCategorySlice = createSlice({
    name: "productCategories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProductCategories.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProductCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.productCategories = action.payload;
            })
            .addCase(getProductCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(createProductCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createProductCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdCategory = action.payload;
            })
            .addCase(createProductCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getCurrProductCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCurrProductCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.prodCategoryName = action.payload.data.title;
            })
            .addCase(getCurrProductCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(updateCurrProductCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateCurrProductCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedProductCategory = action.payload;
            })
            .addCase(updateCurrProductCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(deleteCurrProductCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCurrProductCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedProductCategory = action.payload;
            })
            .addCase(deleteCurrProductCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(resetState, () => initialState);
    }
});


export default productCategorySlice.reducer;