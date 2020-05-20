import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CargoQueueItem } from './cargoQueue.model';
import { Model } from 'mongoose';
import { transformDbModel, removeReadOnlyFields } from 'src/utils/mongo';
import { AppGateway } from 'src/app.gateway';

@Injectable()
export class CargoQueueService {
  constructor(
    @InjectModel('CargoQueue')
    private readonly cargoQueueModel: Model<CargoQueueItem>,
    private readonly appGateway: AppGateway,
  ) {}

  async getAllByVoyageId(voyageId: string) {
    try {
      const allCargoPlacement = await this.cargoQueueModel
        .find({ voyageId })
        .exec();
      return allCargoPlacement.map(transformDbModel) as CargoQueueItem[];
    } catch (error) {
      throw error;
    }
  }

  async addItem(item: CargoQueueItem) {
    try {
      const newCargoModel = new this.cargoQueueModel(
        removeReadOnlyFields(item),
      );
      // Delete other entries with same registration number,
      // perhaps this should be handled differently.
      await this.cargoQueueModel
        .deleteMany({
          registrationNumber: item.registrationNumber,
        })
        .exec();
      const result = await newCargoModel.save();

      this.pushQueueToClients(item.voyageId);

      return transformDbModel(result);
    } catch (error) {
      throw error;
    }
  }

  async removeItemFromQueue(id: string, voyageId: string) {
    try {
      await this.cargoQueueModel.deleteOne({ _id: id }).exec();
      this.pushQueueToClients(voyageId);
    } catch (error) {
      throw new NotFoundException(`CargoQueueItem with id ${id} not found`);
    }
  }

  private async pushQueueToClients(voyageId: string) {
    try {
      const cargoQueueItems = await this.getAllByVoyageId(voyageId);
      this.appGateway.pushCargoQueueToClients(cargoQueueItems);
    } catch (error) {}
  }
}
