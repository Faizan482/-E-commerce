import { createSlice } from "@reduxjs/toolkit";
const initialState = [];

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // add to cart item 
        addToCart(state, action) {
            state.push(action.payload)
        },
        // deletefrom the cart 
        deleteFromCArt(state, action) {
            return state.filter((item) => item.id !== action.payload.id)
        }
    }
})
export const { addToCart, deleteFromCArt } = cartSlice.actions;
export default cartSlice.reducer