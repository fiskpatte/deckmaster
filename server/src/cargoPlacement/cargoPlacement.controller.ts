import { Get, Controller, Post, Body } from '@nestjs/common';
import { CargoPlacementService } from './cargoPlacement.services';
import { CargoPlacementDto } from './cargoPlacement.model';

@Controller('cargoplacement')
export class CargoPlacementController {
  constructor(private readonly cargoPlacementService: CargoPlacementService) {}

  @Get()
  async getAll() {
    const result = await this.cargoPlacementService.getCargoPlacements();
    return result;
  }

  @Post()
  async placeCargo(@Body() placeCargoDTO: CargoPlacementDto) {
    console.log('place cargo payload: ', placeCargoDTO);
    const result = await this.cargoPlacementService.placeCargo(placeCargoDTO);
    return result;
  }
}
