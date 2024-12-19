import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

const getUserFromLocalStorage = localStorage.getItem("user") ? JSON.parse(localStorage.getItem('user')) : null;

const initialState = {
    user: getUserFromLocalStorage,
    orders: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};

export const login = createAsyncThunk(
    "auth/admin-login",
    async (user, thunkAPI) => {
        try {
            return await authService.login(user);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const getOrders = createAsyncThunk(
    "order/get-orders",
    async (thunkAPI) => {
        try {
            return await authService.getOrders();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const getSingleOrder = createAsyncThunk(
    "order/get-order",
    async (id, thunkAPI) => {
        try {
            return await authService.getOrder(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const updateSingleOrder = createAsyncThunk(
    "order/update-order",
    async (data, thunkAPI) => {
        try {
            return await authService.updateOrder(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const getMonthlyData = createAsyncThunk(
    "order/getMonthlyData",
    async (thunkAPI) => {
        try {
            return await authService.getMonthlyOrders();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const getYearlyData = createAsyncThunk(
    "order/getYearlyData",
    async (thunkAPI) => {
        try {
            return await authService.getYearlyStats();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)


export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.user = action.payload;
                state.message = "success";
            })
            .addCase(login.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getOrders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.orders = action.payload;
                state.message = "success";
            })
            .addCase(getOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getSingleOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getSingleOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.singleOrder = action.payload;
                state.message = "success";
            })
            .addCase(getSingleOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getMonthlyData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getMonthlyData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.monthlyData = action.payload;
                state.message = "success";
            })
            .addCase(getMonthlyData.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getYearlyData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getYearlyData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.yearlyData = action.payload;
                state.message = "success";
            })
            .addCase(getYearlyData.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(updateSingleOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateSingleOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedOrder = action.payload;
                state.message = "success";
            })
            .addCase(updateSingleOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
    },
});


export default authSlice.reducer;