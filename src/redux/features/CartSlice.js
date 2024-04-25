import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cant: 0,
    cart: false
}

export const cartSlice = createSlice({
    name: "cart",

    initialState,

    reducers: {

        cartAdd: (state, action) => {
            state.cant += action.payload;
            state.cart = true;
        },
        cartRemove: (state, action) => {
            state.cant -= action.payload;
            state.cart = true;
        },

        cartSet: (state) => {
            state.cant = 0;
            state.cart = false;
        }
    }

});

export const { cartAdd, cartSet, cartRemove } = cartSlice.actions;

export default cartSlice.reducer;