import { createSlice } from '@reduxjs/toolkit';

import { getProducts } from './productApi';

interface InitialState {
	products: Array<any>;
	loading: boolean;
	error: string | undefined;
}

let initialState: InitialState = {
	products: [],
	loading: false,
	error: undefined,
};

const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getProducts.pending, (state, _action) => {
				state.error = undefined;
				state.loading = true;
				state.products = [];
			})
			.addCase(getProducts.rejected, (_state, _action) => {})
			.addCase(getProducts.fulfilled, (state, action) => {
				state.error = undefined;
				state.loading = false;
				state.products = action.payload as any;
			});
	},
});

export const {} = productSlice.actions;

export default productSlice.reducer;
