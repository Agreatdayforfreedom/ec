import { Module } from '@nestjs/common';
import { CheckoutController } from './controller/checkout.controller';
import { CheckoutService } from './services/checkout.service';
import { PrismaService } from '../prisma.service';

@Module({
	controllers: [CheckoutController],
	providers: [CheckoutService, PrismaService],
})
export class CheckoutModule {}
