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
import { CargoDTO } from './cargo.dtos';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

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
  async addCargo(@Body() createCargoDTO: CargoDTO) {
    const cargo = await this.cargoService.addCargo(createCargoDTO);
    return cargo;
  }

  @Post('mock')
  async devMockCargo(@Headers() headers) {
    const cargo = await this.cargoService.mockCargo(headers.username);
    return cargo;
  }

  @Patch(':id')
  async updateCargo(@Param('id') cargoId: string, @Body() dto: CargoDTO) {
    await this.cargoService.updateCargo(cargoId, dto);
    return null;
  }

  @Delete(':id')
  async deleteCargo(@Param('id') cargoId: string) {
    await this.cargoService.deleteCargo(cargoId);
    return null;
  }
}
