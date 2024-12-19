import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import colorService from './colorService';


export const getColors = createAsyncThunk(
    "color/get-colors",
    async (thunkAPI) => {
        try {
            return await colorService.getColors();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const createColor = createAsyncThunk(
    "color/create-color",
    async (colorData, thunkAPI) => {
        try {
            return await colorService.createColor(colorData);
        } catch (error) {
            const errorMessage = error.message || 'Failed to create color';
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
)

export const getCurrentColor = createAsyncThunk(
    "color/get-color",
    async (id, thunkAPI) => {
        try {
            return await colorService.getColor(id);
        } catch (error) {
            const errorMessage = error.message || 'Failed to get a color';
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
)

export const updateCurrentColor = createAsyncThunk(
    "color/update-current-color",
    async (color, thunkAPI) => {
        try {
            return await colorService.updateColor(color);
        } catch (error) {
            const errorMessage = error.message || 'Failed to create color';
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
)

export const deleteCurrentColor = createAsyncThunk(
    "color/delete-current-color",
    async (id, thunkAPI) => {
        try {
            return await colorService.deleteColor(id);
        } catch (error) {
            const errorMessage = error.message || 'Failed to get a color';
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
)

export const resetState = createAction("Reset_all");

const initialState = {
    colors: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};

export const colorSlice = createSlice({
    name: "colors",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getColors.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getColors.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.colors = action.payload;
            })
            .addCase(getColors.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(createColor.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createColor.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdColor = action.payload;
            })
            .addCase(createColor.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getCurrentColor.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCurrentColor.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.colorName = action.payload.data.title;
            })
            .addCase(getCurrentColor.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(updateCurrentColor.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateCurrentColor.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedColor = action.payload;
            })
            .addCase(updateCurrentColor.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(deleteCurrentColor.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCurrentColor.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedColor = action.payload;
            })
            .addCase(deleteCurrentColor.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(resetState, () => initialState);
    }
});


export default colorSlice.reducer;