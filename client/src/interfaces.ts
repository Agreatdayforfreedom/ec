export interface Product extends Partial<ProductExtraKeys> {
	id: string;
	image: string;
	title: string;
	description: string;
	author: string;
	price: number;
	stock: number;
	gems_price: number;
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
	gems: number;
}

export interface Review {
	id: string;
	stars: number;
	text: string;
	user: Pick<User, 'id' | 'username'>;
	created_at: Date;
	updated_at: Date;
}

export interface Order {
	id: string;
	totalItems: number;
	subtotal: number;
	orderStatus: OrderStatus;
	order_items?: Order_Item[];
}

export enum OrderStatus {
	PENDING = 'PENDING',
	PURCHASED = 'PURCHASED',
}

export enum ORDER_BY {
	ASC = 'asc',
	DESC = 'desc',
}

export type Order_Item = {
	id: string;
	qty: number;
	totalPrice: number;
	product: Product;
};

export type Cart_Item = {
	id: string;
	qty: number;
	totalPrice: number;
	product: Product;
};

export type Query = {
	take?: number; //limit
	skip?: number;
	order_by?: ORDER_BY;
	search?: string;
	page?: number;
	min_price?: number;
	max_price?: number;

	//order by price or stars
	or_price?: ORDER_BY;
	or_stars?: ORDER_BY;
	//rating
	//1 - 5
	stars?: number;
};
