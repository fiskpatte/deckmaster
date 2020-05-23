import {
  Get,
  Controller,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { CargoService } from './cargo.services';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Cargo } from './cargo.model';

@UseGuards(JwtAuthGuard)
@Controller('cargo')
export class CargoController {
  constructor(private readonly cargoService: CargoService) {}

  @Get()
  async getAllCargo() {
    const allCargo = await this.cargoService.getAllCargo();
    return allCargo;
  }

  @Get(':id')
  getCargo(@Param('id') cargoId: string) {
    return this.cargoService.getCargo(cargoId);
  }

  @Post()
  async addCargo(@Body() newCargo: Cargo) {
    const cargo = await this.cargoService.addCargo(newCargo);
    return cargo;
  }

  @Post('mock')
  async devMockCargo(
    @Headers('username') userName,
    @Headers('voyageid') voyageId,
  ) {
    const cargo = await this.cargoService.mockCargo(userName, voyageId);
    return cargo;
  }

  @Patch(':id')
  async updateCargo(@Param('id') cargoId: string, @Body() newCargo: Cargo) {
    await this.cargoService.updateCargo(cargoId, newCargo);
    return null;
  }

  @Delete(':id')
  async deleteCargo(@Param('id') cargoId: string) {
    await this.cargoService.deleteCargo(cargoId);
    return null;
  }
}
