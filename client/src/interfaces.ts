export interface Product {
	id: string;
	image: string;
	title: string;
	description: string;
	author: string;
	price: number;
	stock: number;
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
