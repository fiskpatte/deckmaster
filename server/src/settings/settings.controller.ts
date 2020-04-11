import { Controller, UseGuards, Get, Param, Put, Body } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { SettingsService } from './settings.service';
import { SettingsDTO } from './settings.model';

@UseGuards(JwtAuthGuard)
@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get(':vesselId')
  async getSettings(@Param('vesselId') vesselId: string) {
    console.log('vesselId: ', vesselId);
    const settings = await this.settingsService.getSettings(vesselId);
    return settings;
  }

  @Put()
  async updateSettings(@Body() dto: SettingsDTO) {
    await this.settingsService.updateSettings(dto);
    return null;
  }
}
