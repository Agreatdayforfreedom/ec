import { createSlice } from '@reduxjs/toolkit';
import { profileThunk, signinThunk } from './authApi';
import { User } from '@/interfaces';

interface InitialState {
	isAuth: boolean;
	user: User | undefined;
	loading: boolean;
	error: string | undefined;
	await_prof: boolean;
}

let initialState: InitialState = {
	isAuth: false,
	user: undefined,
	loading: true,
	error: undefined,
	await_prof: false,
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
				state.await_prof = false;
			})
			.addCase(profileThunk.rejected, (state, _action) => {
				state.isAuth = false;
				state.loading = false;
				state.await_prof = true;
			})
			.addCase(profileThunk.fulfilled, (state, action) => {
				state.isAuth = true;
				state.loading = false;
				state.user = action.payload;
				state.await_prof = true;
			});
	},
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
