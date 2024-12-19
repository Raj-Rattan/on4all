import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import blogService from './blogService';


export const getBlogs = createAsyncThunk(
    "blog/get-blogs",
    async (thunkAPI) => {
        try {
            return await blogService.getBlogs();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const createBlogs = createAsyncThunk(
    "blog/create-blogs",
    async (blogData, thunkAPI) => {
        try {
            return await blogService.createBlog(blogData);
        } catch (error) {
            const errorMessage = error.message || 'Failed to create product';
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
)

export const getCurrentBlog = createAsyncThunk(
    "blog/get-blog",
    async (id, thunkAPI) => {
        try {
            return await blogService.getCurrentBlog(id);
        } catch (error) {
            const errorMessage = error.message || 'Failed to get a blog';
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
)

export const updateCurrentBlog = createAsyncThunk(
    "blog/update-current-blog",
    async (blog, thunkAPI) => {
        try {
            return await blogService.updateCurrentBlog(blog);
        } catch (error) {
            const errorMessage = error.message || 'Failed to create blog';
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
)

export const deleteCurrentBlog = createAsyncThunk(
    "blog/delete-current-blog",
    async (id, thunkAPI) => {
        try {
            return await blogService.deleteCurrentBlog(id);
        } catch (error) {
            const errorMessage = error.message || 'Failed to get a blog';
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
)

export const resetState = createAction("Reset_all");

const initialState = {
    blogs: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};

export const blogSlice = createSlice({
    name: "blogs",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBlogs.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBlogs.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.blogs = action.payload;
            })
            .addCase(getBlogs.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(createBlogs.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createBlogs.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdBlog = action.payload;
            })
            .addCase(createBlogs.rejected, (state, action) => {
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
                state.blogName = action.payload.data.title;
                state.blogCategory = action.payload.data.category;
                state.blogDescription = action.payload.data.description;
                state.blogImages = action.payload.data.images;
            })
            .addCase(getCurrentBlog.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(updateCurrentBlog.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateCurrentBlog.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedBlog = action.payload;
            })
            .addCase(updateCurrentBlog.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(deleteCurrentBlog.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCurrentBlog.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedBlog = action.payload;
            })
            .addCase(deleteCurrentBlog.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(resetState, () => initialState);
    }
});


export default blogSlice.reducer;