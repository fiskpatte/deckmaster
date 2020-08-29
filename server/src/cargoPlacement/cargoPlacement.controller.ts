import {
  Get,
  Controller,
  Post,
  Body,
  Headers,
  NotFoundException,
  Put,
  Param,
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

  @Post()
  async placeCargo(
    @Headers() headers,
    @Body() cargoPlacement: CargoPlacement,
    @Headers('username') username: string,
  ) {
    if (!headers.voyageid) {
      throw new NotFoundException('VoyageId not specified');
    }
    cargoPlacement.voyageId = headers.voyageid;
    return await this.cargoPlacementService.placeCargo(
      cargoPlacement,
      username,
    );
  }

  @Put()
  async updateCargoPlacement(
    @Headers() headers,
    @Body() cargoPlacement: CargoPlacement,
  ) {
    if (!headers.voyageid) {
      throw new NotFoundException('VoyageId not specified');
    }
    cargoPlacement.voyageId = headers.voyageid;
    return await this.cargoPlacementService.updateCargoPlacement(
      cargoPlacement,
    );
  }

  @Post('discharge:id')
  async discharge(@Param('id') cargoPlacementId: string) {
    await this.cargoPlacementService.discharge(cargoPlacementId);
  }
}
