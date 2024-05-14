import { createSlice } from '@reduxjs/toolkit';
import {
	addItemThunk,
	deleteItemThunk,
	getCartThunk,
	updateQtyThunk,
} from './cartApi';
import { Cart_Item } from '@/interfaces';

type StateError = {
	id: string;
	message: string;
};

interface InitialState {
	items: Cart_Item[];
	loading: boolean;
	error: StateError | undefined;
	success: boolean;
}

const initialState: InitialState = {
	items: [],
	loading: false,
	error: undefined,
	success: false,
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		//todo
		builder.addCase(getCartThunk.fulfilled, (state, action) => {
			state.items = action.payload.items;
		});

		//todo
		builder
			.addCase(addItemThunk.pending, (state, _) => {
				state.loading = true;
			})
			.addCase(addItemThunk.fulfilled, (state, action) => {
				action.payload && state.items?.push(action.payload);
				state.loading = false;
			});

		builder
			.addCase(updateQtyThunk.pending, (state, _) => {
				state.loading = true;
				state.error = undefined;
				state.success = false;
			})
			.addCase(updateQtyThunk.rejected, (state, action) => {
				state.error = action.payload as StateError;
				state.loading = false;
				state.success = false;
			})
			.addCase(updateQtyThunk.fulfilled, (state, action) => {
				state.items = state.items.map((x) => {
					if (x.id === action.payload.id) {
						return {
							...x,
							totalPrice: action.payload.totalPrice,
							qty: action.payload.qty,
						};
					}
					return x;
				});
				state.success = true;
				state.loading = false;
				state.error = undefined;
			});

		builder
			.addCase(deleteItemThunk.pending, (state, _) => {
				state.error = undefined;
				state.loading = true;
				state.success = false;
			})
			.addCase(deleteItemThunk.rejected, (_, __) => {})
			.addCase(deleteItemThunk.fulfilled, (state, action) => {
				state.loading = false;
				state.items = state.items.filter((x) => x.id !== action.payload.id);
			});
	},
});

export const {} = cartSlice.actions;

export default cartSlice.reducer;
