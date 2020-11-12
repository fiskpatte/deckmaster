import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cargo } from './cargo.model';
import { transformDbModel, removeReadOnlyFields } from 'src/utils/mongo';
import { getRandomCargo } from './cargo.services.helpers';

@Injectable()
export class CargoService {
  constructor(
    @InjectModel('Cargo') private readonly cargoModel: Model<Cargo>,
  ) {}

  async addCargo(newCargo: Cargo) {
    const newCargoModel = new this.cargoModel(removeReadOnlyFields(newCargo));
    const result = await newCargoModel.save();
    return transformDbModel(result);
  }

  async getCargo(cargoId: string) {
    const cargo = await this.findCargo(cargoId);
    return transformDbModel(cargo);
  }

  async getCargoByRegistrationNumberAndVoyageId(
    registrationNumber: string,
    voyageId: string,
  ) {
    const cargo = await this.cargoModel.findOne({
      registrationNumber,
      voyageId,
    });

    return transformDbModel(cargo);
  }

  async getAllCargo() {
    try {
      const allCargo = await this.cargoModel.find().exec();
      return allCargo.map(transformDbModel) as Cargo[];
    } catch (error) {
      throw error;
    }
  }

  async updateCargo(cargoId: string, dto: Cargo) {
    try {
      const cargo = await this.cargoModel.findOneAndUpdate(
        { _id: cargoId },
        removeReadOnlyFields(dto),
        { new: true },
      );
      return cargo;
    } catch (error) {
      throw new NotFoundException('Cargo not found');
    }
  }

  async deleteCargo(cargoId: string) {
    try {
      await this.cargoModel.deleteOne({ _id: cargoId }).exec();
    } catch (error) {
      throw new NotFoundException('Cargo not found');
    }
  }

  async mockCargo(voyageId: string, registrationNumber: string = '') {
    try {
      let dto = getRandomCargo(registrationNumber);
      dto.voyageId = voyageId;
      const cargo = await this.addCargo(dto);
      return cargo;
    } catch (error) {
      console.log(error);
      throw 'Failed to mock cargo';
    }
  }

  private async findCargo(id: string): Promise<Cargo> {
    try {
      const cargo = await this.cargoModel.findById(id);
      if (!cargo) {
        throw new Error();
      }
      return cargo;
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Cargo not found');
    }
  }
}
