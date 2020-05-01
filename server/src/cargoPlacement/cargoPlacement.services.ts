import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CargoPlacement, CargoPlacementDto } from './cargoPlacement.model';
import { transformDbModel } from 'src/utils/mongo';
import { AppGateway } from 'src/app.gateway';
import { Cargo } from 'src/cargo/cargo.model';
import { CargoService } from 'src/cargo/cargo.services';

@Injectable()
export class CargoPlacementService {
  constructor(
    @InjectModel('PlaceCargo')
    private readonly cargoPlacementModel: Model<CargoPlacement>,
    private readonly appGateway: AppGateway,
    private readonly cargoService: CargoService,
  ) {}

  async placeCargo(dto: CargoPlacementDto) {
    try {
      const newCargoPlacement = new this.cargoPlacementModel({
        registrationNumber: dto.registrationNumber,
        deckId: dto.deckId,
        laneId: dto.laneId,
        LCG: dto.LCG,
        TCG: dto.TCG,
        VCG: dto.VCG,
        overflowingLaneId: dto.overflowingLaneId,
      });

      // save
      const cargoPlacement = await newCargoPlacement.save();
      const resultTransformed = transformDbModel(cargoPlacement);

      const cargo = await this.cargoService.getCargoByRegistrationNumber(
        cargoPlacement.registrationNumber,
      );

      // send through websocket
      this.appGateway.pushCargoPlacementToClients({
        ...cargo,
        ...resultTransformed,
      });

      return resultTransformed;
    } catch (error) {
      throw 'Failed to place cargo';
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
}
