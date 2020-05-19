import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CargoQueueItem } from './cargoQueue.model';
import { Model } from 'mongoose';
import { transformDbModel, removeReadOnlyFields } from 'src/utils/mongo';

@Injectable()
export class CargoQueueService {
  constructor(
    @InjectModel('CargoQueue') private readonly cargoQueueModel: Model<CargoQueueItem>,
  ) { }

  async getAllByVoyageId(voyageId: string) {
    try {
      const allCargoPlacement = await this.cargoQueueModel.find({ voyageId }).exec();
      return allCargoPlacement.map(transformDbModel) as CargoQueueItem[];
    } catch (error) {
      throw error;
    }
  }

  async addItem(item: CargoQueueItem) {
    try {
      const newCargoModel = new this.cargoQueueModel(removeReadOnlyFields(item));
      const result = await newCargoModel.save();
      return transformDbModel(result);
    } catch (error) {
      throw error;
    }
  }
}