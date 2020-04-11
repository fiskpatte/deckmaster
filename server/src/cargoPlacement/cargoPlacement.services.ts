import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CargoPlacement, CargoPlacementDto } from './cargoPlacement.model';
import { transformDbModel } from 'src/utils/mongo';

@Injectable()
export class CargoPlacementService {
  constructor(
    @InjectModel('PlaceCargo')
    private readonly cargoPlacementModel: Model<CargoPlacement>,
  ) {}

  async placeCargo(dto: CargoPlacementDto) {
    try {
      const newCargoPlacement = new this.cargoPlacementModel({
        cargoId: dto.cargoId,
        loadingType: dto.loadingType,
        deckId: dto.deckId,
        laneId: dto.laneId,
        gridId: dto.gridId,
      });

      const cargoPlacement = await newCargoPlacement.save();
      return transformDbModel(cargoPlacement);
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
