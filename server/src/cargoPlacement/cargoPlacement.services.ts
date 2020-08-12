import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CargoPlacement } from './cargoPlacement.model';
import {
  transformDbModel,
  removeReadOnlyFields,
  transformDbModelAndRefs,
} from 'src/utils/mongo';
import { AppGateway } from 'src/app.gateway';
import { CargoQueueService } from 'src/cargoQueue/cargoQueue.services';
import { LogService } from 'src/log/log.service.';
import { errorMonitor } from 'events';

@Injectable()
export class CargoPlacementService {
  constructor(
    @InjectModel('PlaceCargo')
    private readonly cargoPlacementModel: Model<CargoPlacement>,
    private readonly appGateway: AppGateway,
    private readonly cargoQueueService: CargoQueueService,
    private readonly logService: LogService,
  ) {}

  async placeCargo(cp: CargoPlacement, username: string) {
    try {
      const cargoPlacementModel = new this.cargoPlacementModel(
        removeReadOnlyFields(cp),
      );
      // save
      let cargoPlacement = await cargoPlacementModel.save();

      await cargoPlacement.populate('cargo').execPopulate();

      const transformedPlacement = transformDbModelAndRefs(
        cargoPlacement,
        'cargo',
      );

      // // send through websocket
      this.appGateway.pushCargoPlacementToClients(transformedPlacement);

      this.cargoQueueService.removeItemFromQueue(
        cargoPlacement.cargo.id,
        cargoPlacement.cargo.voyageId,
      );

      this.logService.addLog(
        `Placed ${cargoPlacement.cargo.registrationNumber} at ${cp.deckId}, lane ${cp.laneId}`,
        username,
        cp.voyageId.toString(),
      );

      return transformedPlacement;
    } catch (error) {
      console.log(error);
      throw 'Failed to place cargo';
    }
  }

  async updateCargoPlacement(cp: CargoPlacement) {
    // async updateCargo(cargoId: string, dto: Cargo) {
    try {
      let updatedCargoPlacement = await this.cargoPlacementModel.findOneAndUpdate(
        { _id: cp.id },
        cp,
        { new: true },
      );
      await updatedCargoPlacement.populate('cargo').execPopulate();

      const transformedPlacement = transformDbModelAndRefs(
        updatedCargoPlacement,
        'cargo',
      );

      this.appGateway.pushCargoPlacementToClients(transformedPlacement);

      return updatedCargoPlacement;
    } catch (error) {
      throw new NotFoundException('Cargo not found');
    }
    // }
  }

  async discharge(cargoPlacementId: string) {
    let updatedCargoPlacement = null;
    try {
      updatedCargoPlacement = await this.cargoPlacementModel.findOneAndUpdate(
        {
          _id: cargoPlacementId,
        },
        { discharged: true },
        { new: true },
      );
      await updatedCargoPlacement.populate('cargo').execPopulate();
    } catch (error) {
      console.log(`CargoPlacement with id ${cargoPlacementId} not found`);
      throw error;
    }

    try {
      const transformedPlacement = transformDbModelAndRefs(
        updatedCargoPlacement,
        'cargo',
      );

      this.appGateway.pushCargoPlacementToClients(transformedPlacement);
    } catch (error) {
      console.log('pushCargoPlacementToClients failed');
      throw error;
    }
  }

  async getCargoPlacements() {
    try {
      const allCargoPlacement = await this.cargoPlacementModel.find().exec();
      return allCargoPlacement.map(transformDbModel) as CargoPlacement[];
    } catch (error) {
      throw error;
    }
  }

  async getAllByVoyageId(voyageId: string) {
    try {
      const allCargoPlacement = await this.cargoPlacementModel
        .find({ voyageId })
        .populate('cargo')
        .exec();

      const placements = allCargoPlacement.map(model =>
        transformDbModelAndRefs(model, 'cargo'),
      ) as CargoPlacement[];

      return placements;
    } catch (error) {
      throw error;
    }
  }
}
