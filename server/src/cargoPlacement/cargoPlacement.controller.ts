import {
  Get,
  Controller,
  Post,
  Body,
  Headers,
  NotFoundException,
} from '@nestjs/common';
import { CargoPlacementService } from './cargoPlacement.services';
import { CargoPlacement } from './cargoPlacement.model';

@Controller('cargoplacement')
export class CargoPlacementController {
  constructor(private readonly cargoPlacementService: CargoPlacementService) {}

  @Get('voyage')
  async getAllByVoyageId(@Headers() headers) {
    if (!headers.voyageid) {
      throw new NotFoundException('VoyageId not specified');
    }
    const result = await this.cargoPlacementService.getAllByVoyageId(
      headers.voyageid,
    );
    return result;
  }

  @Get()
  async getAll() {
    const result = await this.cargoPlacementService.getCargoPlacements();
    return result;
  }

  @Post()
  async placeCargo(@Headers() headers, @Body() cargoPlacement: CargoPlacement) {
    if (!headers.voyageid) {
      throw new NotFoundException('VoyageId not specified');
    }
    cargoPlacement.voyageId = headers.voyageid;
    return await this.cargoPlacementService.placeCargo(cargoPlacement);
  }
}
