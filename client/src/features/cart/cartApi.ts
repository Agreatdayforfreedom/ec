import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { Axios, AxiosError, AxiosRequestConfig } from 'axios';

export const getCartThunk = createAsyncThunk(
	'cart/get',
	async (_, { rejectWithValue }) => {
		try {
			const token = localStorage.getItem('access_token');
			const config: AxiosRequestConfig = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};
			const res = await axios('/cart', config);
			return res.data;
		} catch (error) {
			rejectWithValue('Something went wrong');
		}
	},
);

export const addItemThunk = createAsyncThunk(
	'cart/addItem',
	async (id: string) => {
		try {
			const token = localStorage.getItem('access_token');

			const config: AxiosRequestConfig = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};
			const res = await axios.post(`/cart/add/${id}`, {}, config);
			return res.data;
		} catch (error) {
			console.log(error);
		}
	},
);

export const updateQtyThunk = createAsyncThunk(
	'cart/updateQty',
	async ({ id, qty }: { id: string; qty: number }, { rejectWithValue }) => {
		try {
			const token = localStorage.getItem('access_token');

			const config: AxiosRequestConfig = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};
			const res = await axios.patch(`/cart/qty/${id}`, { qty }, config);

			if (res.data.status !== 200 && res.data.message) {
				// console.log(res.data);
				return rejectWithValue(res.data.response);
			}

			return res.data;
		} catch (error) {
			if (error instanceof AxiosError) {
				return rejectWithValue(error.response?.data.message);
			}
		}
	},
);
