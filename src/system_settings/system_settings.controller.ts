import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SystemSettingsService } from './system_settings.service';
import { CreateSystemSettingDto } from './dto/create-system_setting.dto';
import { UpdateSystemSettingDto } from './dto/update-system_setting.dto';

@Controller('api/v1/system-settings')
export class SystemSettingsController {
  constructor(private readonly systemSettingsService: SystemSettingsService) {}

  @Post()
  create(@Body() createSystemSettingDto: CreateSystemSettingDto) {
    return this.systemSettingsService.create(createSystemSettingDto);
  }

  @Get()
  findAll() {
    return this.systemSettingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.systemSettingsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSystemSettingDto: UpdateSystemSettingDto) {
    return this.systemSettingsService.update(+id, updateSystemSettingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.systemSettingsService.remove(+id);
  }
}
