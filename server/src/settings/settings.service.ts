import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Settings, SettingsDTO } from './settings.model';
import { transformDbModel } from 'src/utils/mongo';

@Injectable()
export class SettingsService {
  constructor(
    @InjectModel('Settings') private readonly settingsModel: Model<Settings>,
  ) {}

  async getSettings(vesselId: string) {
    try {
      let settings = await this.findSettings(vesselId);
      if (!settings) {
        // Create settings if they don't exist for this vessel
        settings = await this.createSettingsForVessel(vesselId);
      }
      return transformDbModel(settings);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async createSettingsForVessel(vesselId: string) {
    const settings = new this.settingsModel({
      vesselId: vesselId,
      bumperToBumperDistance: 0.7,
    });

    const createdSettings = await settings.save();
    return createdSettings;
  }

  async updateSettings(dto: SettingsDTO) {
    try {
      const settings = await this.findSettings(dto.vesselId);
      if (!settings.vesselId) {
        throw new Error();
      }
      if (dto.bumperToBumperDistance) {
        settings.bumperToBumperDistance = dto.bumperToBumperDistance;
      }
      settings.save();
    } catch (error) {
      throw new NotFoundException('Vessel not found');
    }
  }

  private async findSettings(vesselId: string): Promise<Settings> {
    try {
      const settings = await this.settingsModel.findOne({ vesselId });
      return settings;
    } catch (error) {
      throw new NotFoundException('Settings not found');
    }
  }
}
