import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SagaService } from '../services/saga.service';
import { CreateSagaDTO } from '../dto/saga.dto';
import { Public } from '../../auth/public.decorator';
import { Roles } from '../../auth/roles.decorator';
import { Role } from '@prisma/client';

@Controller('saga')
export class SagaController {
	constructor(private sagaService: SagaService) {}

	@Public()
	@Get(':sagaId')
	getSaga(@Param('sagaId') sagaId: string) {
		return this.sagaService.getSaga(sagaId);
	}

	@Roles(Role.ADMIN)
	@Post('create')
	createSaga(@Body() payload: CreateSagaDTO) {
		return this.sagaService.createSaga(payload);
	}
}
