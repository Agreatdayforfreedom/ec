import { createSlice } from '@reduxjs/toolkit';

import { getProducts } from './productApi';

interface InitialState {
	products: Array<any>;
	loading: boolean;
	error: string | undefined;
	count: number;
}

let initialState: InitialState = {
	products: [],
	loading: false,
	error: undefined,
	count: 0,
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
				state.count = 0;
			})
			.addCase(getProducts.rejected, (_state, _action) => {})
			.addCase(getProducts.fulfilled, (state, action) => {
				state.error = undefined;
				state.loading = false;
				state.products = action.payload.products as any;
				state.count = action.payload.count;
			});
	},
});

export const {} = productSlice.actions;

export default productSlice.reducer;
