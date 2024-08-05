import { createSlice } from "@reduxjs/toolkit";

const userProgressSlice = createSlice({
    name: 'user-progress',
    initialState: {
        progress: ''
    },
    reducers: {
        showCart(state) {
            state.progress = 'cart'
        },
        hideCart(state) {
            state.progress = ''
        },
        showCheckout(state) {
            state.progress = 'checkout'
        },
        hideCheckout(state) {
            state.progress = ''
        },
    }
});

export default userProgressSlice.reducer;
export const userProgressActions = userProgressSlice.actions;