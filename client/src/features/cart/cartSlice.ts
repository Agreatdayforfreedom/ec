import { createSlice } from '@reduxjs/toolkit';
import {
	addItemThunk,
	deleteItemThunk,
	getCartThunk,
	resetWithDelayThunk,
	updateQtyThunk,
} from './cartApi';
import { Cart_Item } from '@/interfaces';

type StateError = {
	id: string;
	message: string;
};

type StateSuccess = {
	message: string;
};

interface InitialState {
	items: Cart_Item[];
	loading: boolean;
	error: StateError | undefined;
	success: StateSuccess | undefined;
}

const initialState: InitialState = {
	items: [],
	loading: false,
	error: undefined,
	success: undefined,
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getCartThunk.pending, (state, _) => {
				state.loading = true;
			})
			.addCase(getCartThunk.fulfilled, (state, action) => {
				state.items = action.payload.items;

				state.loading = false;
				state.error = undefined;
			});

		builder
			.addCase(addItemThunk.pending, (state, _) => {
				state.loading = true;
			})
			.addCase(addItemThunk.fulfilled, (state, action) => {
				console.log(action.payload);
				state.items = state.items.map((mem) => {
					if (mem.product.id === action.payload.product.id) {
						return { ...mem, ...action.payload };
					}
					return mem;
				});
				state.loading = false;
				state.success = { message: 'Item added' };
			});

		builder
			.addCase(updateQtyThunk.pending, (state, _) => {
				state.loading = true;
				state.error = undefined;
				state.success = undefined;
			})
			.addCase(updateQtyThunk.rejected, (state, action) => {
				state.error = action.payload as StateError;
				state.loading = false;
				state.success = undefined;
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
				state.success = { message: 'Updated!' };
				state.loading = false;
				state.error = undefined;
			});

		builder
			.addCase(deleteItemThunk.pending, (state, _) => {
				state.error = undefined;
				state.loading = true;
				state.success = undefined;
			})
			.addCase(deleteItemThunk.rejected, (_, __) => {})
			.addCase(deleteItemThunk.fulfilled, (state, action) => {
				state.loading = false;
				state.items = state.items.filter((x) => x.id !== action.payload.id);
			});

		builder.addCase(resetWithDelayThunk.fulfilled, (state) => {
			state.success = undefined;
		});
	},
});

export const {} = cartSlice.actions;

export default cartSlice.reducer;
