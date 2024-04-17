import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {},
    session: false
}

export const userSlice = createSlice({
    name: "user",

    initialState,

    reducers: {

        setSession: (state, action) => {
            state.user = action.payload
            state.session = true
        },

        logOutSession: (state) => {
            state.user = {}
            state.session = false
        }


    }
});

export const { setSession, logOutSession } = userSlice.actions;

export default userSlice.reducer;