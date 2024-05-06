import { createSlice } from '@reduxjs/toolkit';
import { profileThunk, signinThunk } from './authApi';

interface InitialState {
	isAuth: boolean;
	user: any;
	loading: boolean;
	error: string | undefined;
}

let initialState: InitialState = {
	isAuth: false,
	user: undefined,
	loading: false,
	error: undefined,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: (state) => {
			localStorage.removeItem('access_token');
			state.isAuth = false;
			state.loading = false;
			state.user = undefined;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(signinThunk.pending, (state, _action) => {
				state.isAuth = false;
				state.loading = true;
				state.error = undefined;
			})
			.addCase(signinThunk.rejected, (state, action) => {
				state.isAuth = false;
				state.loading = false;
				state.error = action.payload as string;
			})
			.addCase(signinThunk.fulfilled, (state, action) => {
				state.isAuth = true;
				state.loading = false;
				state.user = action.payload;
				state.error = undefined;
			});

		builder
			.addCase(profileThunk.pending, (state, _action) => {
				state.isAuth = false;
				state.loading = true;
			})
			.addCase(profileThunk.rejected, (state, _action) => {
				state.isAuth = false;
				state.loading = false;
			})
			.addCase(profileThunk.fulfilled, (state, action) => {
				state.isAuth = true;
				state.loading = false;
				state.user = action.payload;
			});
	},
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
