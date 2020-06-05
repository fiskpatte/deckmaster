import { Controller, UseGuards, Get, Put, Body, Headers } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { SettingsService } from './settings.service';
import { Settings } from './settings.model';

@UseGuards(JwtAuthGuard)
@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  async getSettings(@Headers('vesselid') vesselId) {
    return await this.settingsService.getSettings(vesselId);
  }

  @Put()
  async updateSettings(@Body() settings: Settings) {
    await this.settingsService.updateSettings(settings);
    return null;
  }
}
