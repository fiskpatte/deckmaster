import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CargoPlacementSchema } from './cargoPlacement.model';
import { CargoPlacementController } from './cargoPlacement.controller';
import { CargoPlacementService } from './cargoPlacement.services';
import { AppGateway } from 'src/app.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'PlaceCargo', schema: CargoPlacementSchema },
    ]),
  ],
  controllers: [CargoPlacementController],
  providers: [CargoPlacementService, AppGateway],
})
export class CargoPlacementModule {}
