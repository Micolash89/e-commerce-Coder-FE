import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    message: "",
    state: null,
}

export const notificationSlice = createSlice({
    name: "notification",

    initialState,

    reducers: {

        messageOk: (state, action) => {
            state.message = action.payload;
            state.state = true;
        },

        messageError: (state, action) => {
            state.message = action.payload;
            state.state = false;
        },

        messageNull: (state) => {
            state.state = null;
            state.message = "";
        }

    }
});

export const { messageOk, messageError, messageNull } = notificationSlice.actions;

export default notificationSlice.reducer;