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
      if (dto.bumperToBumperSettings) {
        settings.bumperToBumperDistance = dto.bumperToBumperSettings;
      }
      settings.save();
    } catch (error) {
      throw new NotFoundException('Vessel not found');
    }
  }

  private async findSettings(vesselId: string): Promise<Settings> {
    try {
      const settings = await this.settingsModel.findOne({ vesselId });
      if (!settings) {
        throw new Error();
      }
      return settings;
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Settings not found');
    }
  }
}
