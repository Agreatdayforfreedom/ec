export enum ORDER_BY {
	ASC = 'asc',
	DESC = 'desc',
}

export type Query = {
	take?: number; //limit
	skip?: number;
	order_by?: ORDER_BY;
	search?: string;

	//rating
	//1 - 5
	stars?: number;
};
