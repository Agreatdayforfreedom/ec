import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getProducts = createAsyncThunk('product/getAll', async () => {
	try {
		const res = await axios('/product');

		return res.data;
	} catch (error) {
		console.log(error);
	}
});
