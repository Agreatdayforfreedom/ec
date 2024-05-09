export interface Product {
	id: string;
	image: string;
	title: string;
	description: string;
	author: string;
	price: number;
	stock: number;
	reviews: Review[];
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
