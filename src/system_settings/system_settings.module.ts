import { Module } from '@nestjs/common';
import { SystemSettingsService } from './system_settings.service';
import { SystemSettingsController } from './system_settings.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [SystemSettingsController],
  providers: [SystemSettingsService, PrismaService],
})
export class SystemSettingsModule {}
