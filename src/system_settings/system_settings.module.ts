import { Module } from '@nestjs/common';
import { SystemSettingsService } from './system_settings.service';
import { SystemSettingsController } from './system_settings.controller';

@Module({
  controllers: [SystemSettingsController],
  providers: [SystemSettingsService],
})
export class SystemSettingsModule {}
