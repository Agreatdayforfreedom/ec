import { Module } from '@nestjs/common';
import { OrderController } from './controller/order.controller';
import { OrderService } from './services/order.service';
import { PrismaService } from '../prisma.service';

@Module({
	controllers: [OrderController],
	providers: [OrderService, PrismaService],
})
export class OrderModule {}
