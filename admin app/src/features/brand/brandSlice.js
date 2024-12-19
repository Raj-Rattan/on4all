import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import brandService from './brandService';


export const getBrands = createAsyncThunk(
    "brand/get-brands",
    async (thunkAPI) => {
        try {
            return await brandService.getBrands();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const getABrand = createAsyncThunk(
    "brand/get-brand",
    async (id, thunkAPI) => {
        try {
            return await brandService.getBrand(id);
        } catch (error) {
            const errorMessage = error.message || 'Failed to get a brand';
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
)

export const createBrand = createAsyncThunk(
    "brand/create-brand",
    async (brandData, thunkAPI) => {
        console.log(brandData);
        try {
            return await brandService.createBrand(brandData);
        } catch (error) {
            const errorMessage = error.message || 'Failed to create brand';
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
)

export const updateCurrentBrand = createAsyncThunk(
    "brand/update-current-brand",
    async (brand, thunkAPI) => {
        try {
            return await brandService.updateBrand(brand);
        } catch (error) {
            const errorMessage = error.message || 'Failed to create brand';
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
)

export const deleteCurrentBrand = createAsyncThunk(
    "brand/delete-current-brand",
    async (id, thunkAPI) => {
        try {
            return await brandService.deleteBrand(id);
        } catch (error) {
            const errorMessage = error.message || 'Failed to get a brand';
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
)

export const resetState = createAction("Reset_all");

const initialState = {
    brands: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};

export const brandSlice = createSlice({
    name: "brands",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBrands.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBrands.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.brands = action.payload;
            })
            .addCase(getBrands.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(createBrand.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createBrand.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdBrand = action.payload;
            })
            .addCase(createBrand.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            })
            .addCase(getABrand.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getABrand.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.brandName = action.payload.data.title;
            })
            .addCase(getABrand.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            })
            .addCase(updateCurrentBrand.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateCurrentBrand.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedBrand = action.payload;
            })
            .addCase(updateCurrentBrand.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            })
            .addCase(deleteCurrentBrand.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCurrentBrand.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedBrand = action.payload;
            })
            .addCase(deleteCurrentBrand.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            })
            .addCase(resetState, () => initialState);
    }
});


export default brandSlice.reducer;