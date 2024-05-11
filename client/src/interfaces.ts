export interface Product extends Partial<ProductExtraKeys> {
	id: string;
	image: string;
	title: string;
	description: string;
	author: string;
	price: number;
	stock: number;
	reviews: Review[];
}

interface ProductExtraKeys {
	totalReviews: number;
	averageRate: number;
}

export enum ROLE {
	USER,
	ADMIN,
}

export interface User {
	id: string;
	username: string;
	email: string;
	role: ROLE;
}

export interface Review {
	id: string;
	stars: number;
	text: string;
	user: Pick<User, 'id' | 'username'>;
	created_at: Date;
	updated_at: Date;
}

export enum ORDER_BY {
	ASC = 'asc',
	DESC = 'desc',
}

export type Query = {
	take?: number; //limit
	skip?: number;
	order_by?: ORDER_BY;
	search?: string;
	page?: number;
	min_price?: number;
	max_price?: number;

	//rating
	//1 - 5
	stars?: number;
};
