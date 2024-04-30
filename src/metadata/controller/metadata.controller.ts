import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { MetadataService } from '../service/metadata.service';
import { CreateMetadataDTO, UpdateMetadataDTO } from '../dto/metadata.dto';
import { Public } from '../../auth/public.decorator';

@Controller('metadata')
export class MetadataController {
	constructor(private metadataService: MetadataService) {}

	@Public()
	@Post('add/:productId')
	create(
		@Param('productId') productId: string,
		@Body() payload: CreateMetadataDTO,
	) {
		return this.metadataService.create(productId, payload);
	}

	@Public()
	@Put('update/:metadataId')
	update(
		@Param('metadataId') metadataId: string,
		@Body() payload: UpdateMetadataDTO,
	) {
		return this.metadataService.update(metadataId, payload);
	}
}
