import { configureStore } from '@reduxjs/toolkit';
import authSlice from './features/auth/authSlice';
import productSlice from './features/product/productSlice';

export const store = configureStore({
	reducer: {
		product: productSlice,
		auth: authSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
