import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import enquiryService from './enquiryService';


export const getEnquiries = createAsyncThunk(
    "enquiry/get-enquiries",
    async (thunkAPI) => {
        try {
            return await enquiryService.getEnquiries();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const getCurrentEnquiry = createAsyncThunk(
    "enquiry/get-current-enquiry",
    async (id, thunkAPI) => {
        try {
            return await enquiryService.getCurrentEnquiry(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const updateCurrentEnquiry = createAsyncThunk(
    "enquiry/update-current-enquiry",
    async (enquiry, thunkAPI) => {
        try {
            return await enquiryService.updateCurrentEnquiry(enquiry);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const deleteCurrentEnquiry = createAsyncThunk(
    "enquiry/delete-enquiry",
    async (id, thunkAPI) => {
        try {
            return await enquiryService.deleteCurrentEnquiry(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const resetState = createAction("Reset_all");

const initialState = {
    enquiries: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};

export const enquirySlice = createSlice({
    name: "enquiries",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getEnquiries.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getEnquiries.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.enquiries = action.payload;
            })
            .addCase(getEnquiries.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getCurrentEnquiry.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCurrentEnquiry.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.enquiryName = action.payload.data.name;
                state.enquiryEmail = action.payload.data.email;
                state.enquiryPhone = action.payload.data.phone;
                state.enquiryComment = action.payload.data.comment;
                state.enquiryStatus = action.payload.data.status;
            })
            .addCase(getCurrentEnquiry.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(updateCurrentEnquiry.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateCurrentEnquiry.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedEnquiry = action.payload;
            })
            .addCase(updateCurrentEnquiry.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(deleteCurrentEnquiry.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCurrentEnquiry.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedEnquiry = action.payload;
            })
            .addCase(deleteCurrentEnquiry.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(resetState, () => initialState);
    }
});


export default enquirySlice.reducer;