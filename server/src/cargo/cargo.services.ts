import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chance } from 'chance';
import { Cargo } from './cargo.model';
import { CargoDTO } from './cargo.dtos';
import { transformDbModel } from 'src/utils/mongo';
import { LogService } from 'src/log/log.service.';

@Injectable()
export class CargoService {
  constructor(
    @InjectModel('Cargo') private readonly cargoModel: Model<Cargo>,
    private readonly logService: LogService,
  ) {}

  async addCargo(createCargoDTO: CargoDTO) {
    const newCargo = new this.cargoModel({
      registrationNumber: createCargoDTO.registrationNumber,
      length: createCargoDTO.length,
      width: createCargoDTO.width,
      height: createCargoDTO.height,
      type: createCargoDTO.type,
      weight: createCargoDTO.weight,
    });

    const result = await newCargo.save();
    return transformDbModel(result);
  }

  async getCargo(cargoId: string) {
    const cargo = await this.findCargo(cargoId);
    return transformDbModel(cargo);
  }

  async getCargoByRegistrationNumber(registrationNumber: string) {
    const cargo = await this.cargoModel.findOne({ registrationNumber });
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

  async updateCargo(cargoId: string, dto: CargoDTO) {
    try {
      const cargo = await this.findCargo(cargoId);
      if (dto.registrationNumber) {
        cargo.registrationNumber = dto.registrationNumber;
      }
      if (dto.length) {
        cargo.length = dto.length;
      }
      if (dto.width) {
        cargo.width = dto.width;
      }
      if (dto.height) {
        cargo.height = dto.height;
      }
      if (dto.type) {
        cargo.type = dto.type;
      }
      if (dto.weight) {
        cargo.weight = dto.weight;
      }
      cargo.save();
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

  async mockCargo(username: string) {
    try {
      const chance = new Chance();

      const registrationNumber = `${chance.string({
        length: 3,
        casing: 'upper',
        alpha: true,
        numeric: false,
      })} ${chance.string({ length: 3, pool: '1234567890' })}`;
      const length = chance.floating({ min: 10, max: 14, fixed: 1 });
      let width = chance.floating({ min: 2.1, max: 2.6, fixed: 1 });
      const height = chance.floating({ min: 2.8, max: 3.2, fixed: 1 });
      const type = chance.integer({ min: 1, max: 2 }) * 10;
      const weight = chance.integer({ min: 15, max: 20 });

      if (Math.random() < 0.2) width = 4;

      const dto = new CargoDTO();
      dto.registrationNumber = registrationNumber;
      dto.length = length;
      dto.width = width;
      dto.height = height;
      dto.type = type;
      dto.weight = weight;

      const cargo = await this.addCargo(dto);

      this.logService.addLog(
        `Mocked cargo ${cargo.registrationNumber}`,
        username,
      );

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
