import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Model} from 'mongoose';
import { CargoPlacement, transformDbCargoPlacement, CargoPlacementDto } from './cargoPlacement.model';

@Injectable()
export class CargoPlacementService {

  constructor(@InjectModel('PlaceCargo') private readonly cargoPlacementModel: Model<CargoPlacement>) {}

  async placeCargo(dto: CargoPlacementDto){
    try{
      const newCargoPlacement = new this.cargoPlacementModel({
        cargoId : dto.cargoId,
        loadingType: dto.loadingType,
        deckId: dto.deckId,
        laneId: dto.laneId,
        gridId: dto.gridId
      });

      const cargoPlacement = await newCargoPlacement.save();
      return transformDbCargoPlacement(cargoPlacement)
    } catch(error){
      throw "Failed to place cargo";
    }
  }

  async getCargoPlacements(){
    try{
      const allCargoPlacement = await this.cargoPlacementModel.find().exec();
      return allCargoPlacement.map(transformDbCargoPlacement) as CargoPlacement[];
    } catch(error){
      throw error;
    }
  }
}

