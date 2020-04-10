import { Controller, UseGuards, Get, Param } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { SettingsService } from './settings.service';

@UseGuards(JwtAuthGuard)
@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get(':vesselId')
  async getSettings(@Param('vesselId') vesselId: string) {
    const settings = await this.settingsService.getSettings(vesselId);
    return settings;
  }
}
