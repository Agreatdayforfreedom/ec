export enum ORDER_BY {
	ASC = 'asc',
	DESC = 'desc',
}

export type Query = {
	take?: number; //limit
	skip?: number;
	order_by?: ORDER_BY;
	search?: string;
	min_price?: number;
	max_price?: number;

	//order by price or stars
	or_price?: ORDER_BY;
	or_stars?: ORDER_BY;
	//rating
	//1 - 5
	stars?: number;
};
