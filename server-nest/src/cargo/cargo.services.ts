import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Model} from 'mongoose';
import { Cargo, transformDbCargo } from './cargo.model';
import { CargoType } from 'src/utils/enums';

@Injectable()
export class CargoService {

  constructor(@InjectModel('Cargo') private readonly cargoModel: Model<Cargo>) {}

  async addCargo(registrationNumber: string, length: number, width: number, height: number, type: CargoType){
    const newCargo = new this.cargoModel({
      registrationNumber,
      length,
      width,
      height,
      type
    });
    const result = await newCargo.save();
    return result.id as string;
  }

  async getCargo(cargoId: string){
    const cargo = await this.findCargo(cargoId);
    return transformDbCargo(cargo);
  }

  async getAllCargo() {
    try{
      const allCargo = await this.cargoModel.find().exec();
      return allCargo.map(transformDbCargo) as Cargo[];

    } catch(error){
      throw error;
    }
  }

  async updateCargo(cargoId: string, registrationNumber: string, length: number, width: number, height: number, type: CargoType){

    try{
      const cargo = await this.findCargo(cargoId);
      if(registrationNumber){
        cargo.registrationNumber = registrationNumber;
      }
      if(length){
        cargo.length = length;
      }
      if(width){
        cargo.width = width;
      }
      if(height){
        cargo.height = height;
      }
      if(type){
        cargo.type = type;
      }
     cargo.save();

    } catch(error){
      throw new NotFoundException("Cargo not found")
    }
  }

  async deleteCargo(cargoId: string){
    try{
      await this.cargoModel.deleteOne({_id: cargoId}).exec();
    } catch (error){
      throw new NotFoundException("Cargo not found")
    }
  }

  private async findCargo(id: string): Promise<Cargo> {
    try{
      const cargo = await this.cargoModel.findById(id);
      if(!cargo){
        throw new Error();
      }
      return cargo;
    } catch(error){
      console.log(error)
      throw new NotFoundException("Cargo not found");
    }
  }
}

