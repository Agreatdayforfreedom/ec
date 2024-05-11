import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { ORDER_BY } from '../types';

@Injectable()
export class QueryPipeTransform implements PipeTransform {
	transform(value: any, metadata: ArgumentMetadata) {
		if (metadata.type !== 'query')
			throw new Error('This Pipe must be implemented in a query decorator');

		if (value.skip && typeof value.skip === 'string')
			value.skip = parseInt(value.skip, 10);
		else value.skip = 0;

		if (value.take && typeof value.take === 'string')
			value.take = parseInt(value.take, 10);
		else value.take = 5;

		if (value.stars && typeof value.stars === 'string')
			value.stars = parseInt(value.stars, 10);
		else value.stars = 0;

		if (value.min_price && typeof value.min_price === 'string')
			value.min_price = parseInt(value.min_price, 10);

		if (value.max_price && typeof value.max_price === 'string')
			value.max_price = parseInt(value.max_price, 10);

		if (!value.search) value.search = '';
		if (!value.order_by) value.order_by = ORDER_BY.DESC;

		return value;
	}
}
