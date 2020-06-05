import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Settings } from './settings.model';
import { transformDbModel, removeReadOnlyFields } from 'src/utils/mongo';
import { AppGateway } from 'src/app.gateway';

@Injectable()
export class SettingsService {
  constructor(
    @InjectModel('Settings') private readonly settingsModel: Model<Settings>,
    private readonly appGateway: AppGateway,
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
      bumperToBumperDistance: 0.5,
      defaultVCG: 0.45,
    });

    const createdSettings = await settings.save();
    return createdSettings;
  }

  async updateSettings(settings: Settings) {
    try {
      const updatedSettings = await this.settingsModel.findOneAndUpdate(
        {
          _id: settings.id,
        },
        settings,
        { new: true },
      );

      this.appGateway.pushSettingsToClients(transformDbModel(updatedSettings));
    } catch (error) {
      console.log(error);
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
