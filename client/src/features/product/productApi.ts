import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getProducts = createAsyncThunk(
	'product/getAll',
	async (payload: string) => {
		try {
			const res = await axios(`/product${payload}`);

			return res.data;
		} catch (error) {
			console.log(error);
		}
	},
);
