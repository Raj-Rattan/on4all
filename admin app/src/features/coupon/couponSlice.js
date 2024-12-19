import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import couponService from './couponService';


export const getCoupons = createAsyncThunk(
    "coupon/get-coupons",
    async (thunkAPI) => {
        try {
            return await couponService.getCoupons();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const resetState = createAction("Reset_all");

export const createCoupon = createAsyncThunk(
    "coupon/create-coupon",
    async (couponData, thunkAPI) => {
        try {
            return await couponService.createCoupon(couponData);
        } catch (error) {
            const errorMessage = error.message || 'Failed to create coupon';
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
)

export const getCurrentCoupon = createAsyncThunk(
    "coupon/get-coupon",
    async (id, thunkAPI) => {
        try {
            return await couponService.getCoupon(id);
        } catch (error) {
            const errorMessage = error.message || 'Failed to get a coupon';
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
)

export const updateCurrentCoupon = createAsyncThunk(
    "coupon/update-current-coupon",
    async (coupon, thunkAPI) => {
        try {
            return await couponService.updateCoupon(coupon);
        } catch (error) {
            const errorMessage = error.message || 'Failed to create coupon';
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
)

export const deleteCurrentCoupon = createAsyncThunk(
    "coupon/delete-current-coupon",
    async (id, thunkAPI) => {
        try {
            return await couponService.deleteCoupon(id);
        } catch (error) {
            const errorMessage = error.message || 'Failed to get a coupon';
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
)

const initialState = {
    coupons: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};

export const couponSlice = createSlice({
    name: "coupons",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCoupons.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCoupons.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.coupons = action.payload;
            })
            .addCase(getCoupons.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(createCoupon.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createCoupon.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdCoupon = action.payload;
            })
            .addCase(createCoupon.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            })
            .addCase(getCurrentCoupon.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCurrentCoupon.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.couponName = action.payload.data.name;
                state.couponExpiry = action.payload.data.expiry;
                state.couponDiscount = action.payload.data.discount;
            })
            .addCase(getCurrentCoupon.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(updateCurrentCoupon.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateCurrentCoupon.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedCoupon = action.payload;
            })
            .addCase(updateCurrentCoupon.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(deleteCurrentCoupon.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCurrentCoupon.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedCoupon = action.payload;
            })
            .addCase(deleteCurrentCoupon.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(resetState, () => initialState);
    }
});


export default couponSlice.reducer;