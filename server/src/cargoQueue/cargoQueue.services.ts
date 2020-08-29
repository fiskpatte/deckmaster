import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CargoQueueItem } from './cargoQueue.model';
import { Model, Types } from 'mongoose';
import { transformDbModel, transformDbModelAndRefs } from 'src/utils/mongo';
import { AppGateway } from 'src/app.gateway';
import { CargoService } from 'src/cargo/cargo.services';

@Injectable()
export class CargoQueueService {
  constructor(
    @InjectModel('CargoQueue')
    private readonly cargoQueueModel: Model<CargoQueueItem>,
    private readonly appGateway: AppGateway,
    private readonly cargoService: CargoService,
  ) {}

  async getAllByVoyageId(voyageId: string) {
    try {
      const cargoQueueItems = await this.cargoQueueModel
        .find({ voyageId })
        .populate('cargo')
        .exec();

      return cargoQueueItems.map(model =>
        transformDbModelAndRefs(model, 'cargo'),
      );
    } catch (error) {
      throw error;
    }
  }

  async addItem(registrationNumber: string, voyageId: string, deckId: string) {
    try {
      const cargo = await this.cargoService.getCargoByRegistrationNumberAndVoyageId(
        registrationNumber,
        voyageId,
      );

      if (!cargo) {
        throw new NotFoundException('Cargo not found');
      }

      const newCargoQueueItem = new this.cargoQueueModel({
        voyageId,
        deckId,
        registrationNumber,
        cargo: cargo.id,
      });

      // Delete other entries with same registration number,
      await this.cargoQueueModel
        .deleteMany({
          cargo: cargo.id,
        })
        .exec();

      const result = await newCargoQueueItem.save();

      this.pushQueueToClients(voyageId);

      return transformDbModel(result);
    } catch (error) {
      throw error;
    }
  }

  async removeItemFromQueue(cargoId: string, voyageId: string) {
    try {
      const cargo = await this.cargoService.getCargo(cargoId);
      await this.cargoQueueModel.deleteMany({ cargo: cargo.id }).exec();
      this.pushQueueToClients(voyageId);
    } catch (error) {
      throw new NotFoundException(
        `CargoQueueItem with id ${cargoId} not found`,
      );
    }
  }

  private async pushQueueToClients(voyageId: string) {
    try {
      const cargoQueueItems = await this.getAllByVoyageId(voyageId);
      this.appGateway.pushCargoQueueToClients(cargoQueueItems, voyageId);
    } catch (error) {}
  }
}
