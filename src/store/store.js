import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../store/slices/authSlice';
import ordersReducer from '../store/slices/ordersSlice';
import medicinesSlice from './slices/medicinesSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        medicines: medicinesSlice,
        orders: ordersReducer,
    },
});

export default store;
