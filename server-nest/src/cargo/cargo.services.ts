import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Chance} from 'chance';
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
    return transformDbCargo(result);
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

  async mockCargo(){
    try{
      const chance = new Chance();
      const registrationNumber = `${chance.string({length: 3})} ${chance.string({length: 3, pool: '1234567890'})}`;
      const length = chance.floating({ min: 10, max: 14, fixed: 1 });
      const width = chance.floating({ min: 2.1, max: 2.6, fixed: 1 });
      const height = chance.floating({ min: 2.8, max: 3.2, fixed: 1 });
      const type = chance.integer({ min: 1, max: 2 }) * 10;

      const cargo = await this.addCargo(registrationNumber, length, width, height, type);
      return cargo;

    } catch(error){
      console.log(error);
      throw "Failed to mock cargo";
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

