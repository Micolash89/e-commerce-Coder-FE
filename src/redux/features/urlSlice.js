import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    value: ""
}

export const urlSlice = createSlice({
    name: "url",

    initialState,

    reducer: {

        setUrl: (state, action) => {

            state.value = action.payload

        }

    }
});

export const { setUrl } = urlSlice.actions;

export default urlSlice.reducer;