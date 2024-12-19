import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { blogService } from "./blogService";


export const getAllBlogs = createAsyncThunk("blog/getAllBlogs", async (thunkAPI) => {
    try {
        return await blogService.getBlogs();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const getCurrentBlog = createAsyncThunk("blog/getCurrentBlog", async (id, thunkAPI) => {
    try {
        return await blogService.getCurrentBlog(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})


const blogState = {
    blog: "",
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

export const blogSlice = createSlice({
    name: "blog",
    initialState: blogState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllBlogs.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllBlogs.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.blog = action.payload;
            })
            .addCase(getAllBlogs.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getCurrentBlog.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCurrentBlog.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.singleBlog = action.payload;
            })
            .addCase(getCurrentBlog.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            });
    }
})


export default blogSlice.reducer;