import { Module } from '@nestjs/common';
import { MetadataController } from './controller/metadata.controller';
import { MetadataService } from './service/metadata.service';
import { PrismaService } from '../prisma.service';

@Module({
	controllers: [MetadataController],
	providers: [MetadataService, PrismaService],
})
export class MetadataModule {}
