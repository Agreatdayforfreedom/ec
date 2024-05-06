import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

export const signinThunk = createAsyncThunk(
	'auth/signin',
	async (payload: any, { rejectWithValue }) => {
		try {
			const res = await axios.post('http://localhost:4000/auth/signin', {
				email: payload.email,
				password: payload.password,
			});

			localStorage.setItem('access_token', res.data.access_token);

			return res.data.user;
		} catch (error) {
			if (error instanceof AxiosError) {
				return rejectWithValue(error.response?.data.message);
			}
		}
	},
);

export const profileThunk = createAsyncThunk('auth/profile', async () => {
	const token = localStorage.getItem('access_token');
	const config: AxiosRequestConfig = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const res = await axios('http://localhost:4000/auth/profile', config);

	return res.data;
});
