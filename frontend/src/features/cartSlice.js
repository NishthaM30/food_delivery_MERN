import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: {}
    },
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            if (state.items[item.id]) {
                state.items[item.id].quantity += 1;
            } else {
                state.items[item.id] = { ...item, quantity: 1 }
            }
        },
        removeFromCart: (state, action) => {
            const itemId = action.payload;
            if (state.items[itemId]) {
                state.items[itemId].quantity -= 1;
                if (state.items[itemId].quantity <= 0) {
                    delete state.items[itemId]
                }
            }
        },
        clearCart: (state) => {
            state.items = {};
        }
    }
})

export const {addToCart, removeFromCart, clearCart} = cartSlice.actions;
export default cartSlice.reducer;