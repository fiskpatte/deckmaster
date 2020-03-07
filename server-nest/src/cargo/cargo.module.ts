import { Module } from '@nestjs/common';
import { CargoController } from './cargo.controller';
import { CargoService } from './cargo.services';
import { MongooseModule } from '@nestjs/mongoose';
import {CargoSchema} from './cargo.model';
import { CargoPlacementSchema } from './cargoPlacement.model';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Cargo', schema: CargoSchema}, {name: 'PlaceCargo', schema: CargoPlacementSchema}])],
  controllers: [CargoController],
  providers: [CargoService],
})
export class CargoModule {}
