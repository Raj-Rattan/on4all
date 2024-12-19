import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import blogCategoryService from './blogCategoryService';


export const getBlogCategories = createAsyncThunk(
    "blog-category/get-blog-categories",
    async (thunkAPI) => {
        try {
            return await blogCategoryService.getBlogCategories();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const newBlogCategory = createAsyncThunk(
    "blog-category/create-blog-category",
    async (blogCategoryData, thunkAPI) => {
        try {
            return await blogCategoryService.createBlogCategory(blogCategoryData);
        } catch (error) {
            const errorMessage = error.message || 'Failed to Blog Category';
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
)

export const getCurrBlogCategory = createAsyncThunk(
    "blog-category/get-current-blog-category",
    async (id, thunkAPI) => {
        try {
            return await blogCategoryService.getCurrBlogCategory(id);
        } catch (error) {
            const errorMessage = error.message || 'Failed to get a blog category';
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
)

export const updateCurrBlogCategory = createAsyncThunk(
    "blog-category/update-current-blog-category",
    async (category, thunkAPI) => {
        try {
            return await blogCategoryService.updateCurrBlogCategory(category);
        } catch (error) {
            const errorMessage = error.message || 'Failed to create blog category';
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
)

export const deleteCurrBlogCategory = createAsyncThunk(
    "blog-category/delete-current-blog-category",
    async (id, thunkAPI) => {
        try {
            return await blogCategoryService.deleteCurrBlogCategory(id);
        } catch (error) {
            const errorMessage = error.message || 'Failed to get a blog category';
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
)

export const resetState = createAction("Reset_all");

const initialState = {
    blogCategories: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};

export const blogCategorySlice = createSlice({
    name: "blogCategories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBlogCategories.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBlogCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.blogCategories = action.payload;
            })
            .addCase(getBlogCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(newBlogCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(newBlogCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdBlogCategory = action.payload;
            })
            .addCase(newBlogCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getCurrBlogCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCurrBlogCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.blogsCategoryName = action.payload.data.title;
            })
            .addCase(getCurrBlogCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(updateCurrBlogCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateCurrBlogCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedBlogCategory = action.payload;
            })
            .addCase(updateCurrBlogCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(deleteCurrBlogCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCurrBlogCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedBlogCategory = action.payload;
            })
            .addCase(deleteCurrBlogCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(resetState, () => initialState);
    }
});


export default blogCategorySlice.reducer;