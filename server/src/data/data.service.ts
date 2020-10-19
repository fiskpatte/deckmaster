import { Injectable } from "@nestjs/common";
import { CargoPlacementService } from "src/cargoPlacement/cargoPlacement.services";
import { MapCargoPlacementsToData } from "./data.mapper";
import { CargoPlacementData } from "./data.model";

@Injectable()
export class DataService {
  constructor(
    private readonly cargoPlacementService: CargoPlacementService
  ) { }

  async getCargoPlacementDataByVoyageId(voyageId: string) {

    const cargoPlacements = await this.cargoPlacementService.getAllByVoyageId(
      voyageId,
    );

    const result = {
      voyageId,
      timestamp: new Date(),
      cargo: MapCargoPlacementsToData(cargoPlacements)
    } as CargoPlacementData;

    return result;
  }
}