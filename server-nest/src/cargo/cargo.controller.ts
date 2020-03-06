import {  Get, Controller, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { CargoService } from './cargo.services';
import { CargoType } from 'src/utils/enums';
import { CargoDTO } from './cargo.dtos';
import { PlaceCargoDTO } from './cargo.dtos';

@Controller('cargo')
export class CargoController {
  constructor(private readonly cargoService: CargoService) {}

  @Get()
  async getAllCargo(){
    const allCargo = await this.cargoService.getAllCargo();
    return allCargo;
  }

  @Get(':id')
  getCargo(@Param('id') cargoId: string){
    console.log("Controller, id: ", cargoId)
    return this.cargoService.getCargo(cargoId);
  }

  @Post()
  async addCargo( @Body() createCargoDTO: CargoDTO ){
    const cargo = await this.cargoService.addCargo(createCargoDTO);
    return cargo
  }

  @Post('mock')
  async devMockCargo(){
    const cargo = await this.cargoService.mockCargo();
    return cargo;
  }

  @Patch(':id')
  async updateCargo(
    @Param('id') cargoId: string,
    @Body() dto: CargoDTO)
    // @Body('registrationnumber') registrationNumber: string,
    // @Body('length') length: number,
    // @Body('width') width: number,
    // @Body('height') height: number,
    // @Body('type') type: CargoType,
  {
    await this.cargoService.updateCargo(cargoId, dto);
    return null;
  }

  @Delete(':id')
  async deleteCargo(@Param('id') cargoId: string){
    await this.cargoService.deleteCargo(cargoId)
    return null
  }

  @Post()
  async placeCargo(@Body() placeCargoDTO: PlaceCargoDTO){
    //await this.cargoService.
  }

}
