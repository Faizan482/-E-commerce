import { createSlice } from "@reduxjs/toolkit";
const initialState = JSON.parse(localStorage.getItem("cart")) ?? [];

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // add to cart item 
        // addToCart(state, action) {
        //     state.push(action.payload)
        // },
        // // deletefrom the cart 
        // deleteFromCart(state, action) {
        //     return state.filter((item) => item.id !== action.payload.id)
        // }
        addToCart(state, action) {
            const existingItem = state.find(item => item.category === action.payload.category);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.push({ ...action.payload, quantity: 1 });
            }
        },
        deleteFromCart(state, action) {
            return state.filter(item => item.category !== action.payload.category);
        }
    }
})
export const { addToCart, deleteFromCart } = cartSlice.actions;
export default cartSlice.reducer