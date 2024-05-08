import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

export const signinThunk = createAsyncThunk(
	'auth/signin',
	async (payload: { email: string; password: string }, { rejectWithValue }) => {
		if (!payload.email || !payload.password)
			return rejectWithValue('All fields are required');

		try {
			const res = await axios.post('/auth/signin', {
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
	const res = await axios('/auth/profile', config);

	return res.data;
});
