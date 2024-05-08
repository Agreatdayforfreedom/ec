import { createSlice } from '@reduxjs/toolkit';
import { profileThunk, signinThunk } from './authApi';
import { User } from '@/interfaces';

interface InitialState {
	isAuth: boolean;
	user: User | undefined;
	loading: boolean;
	error: string | undefined;
	success: boolean;
}

let initialState: InitialState = {
	isAuth: false,
	user: undefined,
	loading: true,
	error: undefined,
	success: false,
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
			state.success = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(signinThunk.pending, (state, _action) => {
				state.isAuth = false;
				state.loading = true;
				state.error = undefined;
				state.success = false;
			})
			.addCase(signinThunk.rejected, (state, action) => {
				state.isAuth = false;
				state.loading = false;
				state.error = action.payload as string;
				state.success = false;
			})
			.addCase(signinThunk.fulfilled, (state, action) => {
				state.isAuth = true;
				state.loading = false;
				state.user = action.payload;
				state.error = undefined;
				state.success = true;
			});

		builder
			.addCase(profileThunk.pending, (state, _action) => {
				state.isAuth = false;
				state.loading = true;
				state.success = false;
			})
			.addCase(profileThunk.rejected, (state, _action) => {
				state.isAuth = false;
				state.loading = false;
				state.success = false;
			})
			.addCase(profileThunk.fulfilled, (state, action) => {
				state.isAuth = true;
				state.loading = false;
				state.user = action.payload;
				state.success = true;
			});
	},
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
