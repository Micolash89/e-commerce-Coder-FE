import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
}

export const searchSlice = createSlice({
    name: "search",

    initialState,

    reducers: {

        setProducts: (state, action) => {
            state.products = action.payload;
        }


    }
});

export const { setProducts } = searchSlice.actions;

export default searchSlice.reducer;