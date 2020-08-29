import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CargoPlacement } from './cargoPlacement.model';
import { removeReadOnlyFields, transformDbModelAndRefs } from 'src/utils/mongo';
import { AppGateway } from 'src/app.gateway';
import { CargoQueueService } from 'src/cargoQueue/cargoQueue.services';
import { LogService } from 'src/log/log.service.';

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
      console.log('placing cargo: ', cp);
      const cargoPlacementModel = new this.cargoPlacementModel(
        removeReadOnlyFields(cp),
      );

      let cargoPlacement = await cargoPlacementModel.save();
      await cargoPlacement.populate('cargo').execPopulate();
      this.pushAllWithWebsocket(cargoPlacement.voyageId.toString());

      this.cargoQueueService.removeItemFromQueue(
        cargoPlacement.cargo.id,
        cargoPlacement.cargo.voyageId,
      );

      this.logService.addLog(
        `Placed ${cargoPlacement.cargo.registrationNumber} at ${cp.deckId}, lane ${cp.laneId}`,
        username,
        cp.voyageId.toString(),
      );
    } catch (error) {
      console.log(error);
      throw 'Failed to place cargo';
    }
  }

  async updateCargoPlacement(cp: CargoPlacement) {
    try {
      let updatedCargoPlacement = await this.cargoPlacementModel.findOneAndUpdate(
        { _id: cp.id },
        cp,
        { new: true },
      );

      this.pushAllWithWebsocket(updatedCargoPlacement.voyageId.toString());
    } catch (error) {
      throw new NotFoundException('Cargo not found');
    }
  }

  async discharge(cargoPlacementId: string) {
    try {
      const updatedCargoPlacement = await this.cargoPlacementModel.findOneAndUpdate(
        {
          _id: cargoPlacementId,
        },
        { discharged: true },
        { new: true },
      );
      this.pushAllWithWebsocket(updatedCargoPlacement.voyageId.toString());
    } catch (error) {
      console.error(`CargoPlacement with id ${cargoPlacementId} not found`);
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

  private async pushAllWithWebsocket(voyageId: string) {
    try {
      const placements = await this.getAllByVoyageId(voyageId);
      this.appGateway.pushCargoPlacements(placements);
    } catch (error) {
      console.error('pushAllWithWebsocket failed. ', error);
    }
  }
}
