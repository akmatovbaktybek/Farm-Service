import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const submitOrder = createAsyncThunk('orders/submitOrder', async (orderData) => {
    const response = await axios.post('http://34.125.245.208/orders/', orderData);
    return response.data;
});

const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        selectedMedicines: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        addMedicine: (state, action) => {
            state.selectedMedicines.push(action.payload);
        },
        clearSelectedMedicines: (state) => {
            state.selectedMedicines = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(submitOrder.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(submitOrder.fulfilled, (state) => {
                state.status = 'succeeded';
                state.selectedMedicines = [];
            })
            .addCase(submitOrder.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { addMedicine, clearSelectedMedicines } = ordersSlice.actions;

export default ordersSlice.reducer;
