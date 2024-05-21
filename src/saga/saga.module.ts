import { Module } from '@nestjs/common';
import { SagaController } from './controller/saga.controller';
import { SagaService } from './services/saga.service';
import { PrismaService } from '../prisma.service';

@Module({
	controllers: [SagaController],
	providers: [SagaService, PrismaService],
})
export class SagaModule {}
