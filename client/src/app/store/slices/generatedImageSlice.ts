import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    generatedImage: null as string | null,
};

const generatedImageSlice = createSlice({
    name: 'generatedImage',
    initialState,
    reducers: {
        setGeneratedImage(state, action) {
            state.generatedImage = action.payload;
        },
    },
});

export const { setGeneratedImage } = generatedImageSlice.actions;
export default generatedImageSlice.reducer;
