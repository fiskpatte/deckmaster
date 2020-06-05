import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CargoPlacementSchema } from './cargoPlacement.model';
import { CargoPlacementController } from './cargoPlacement.controller';
import { CargoPlacementService } from './cargoPlacement.services';
import { AppGateway } from 'src/app.gateway';
import { CargoModule } from 'src/cargo/cargo.module';
import { CargoQueueModule } from 'src/cargoQueue/cargoQueue.module';
import { LogModule } from 'src/log/log.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'PlaceCargo', schema: CargoPlacementSchema },
    ]),
    CargoModule,
    CargoQueueModule,
    LogModule,
  ],
  controllers: [CargoPlacementController],
  providers: [CargoPlacementService, AppGateway],
})
export class CargoPlacementModule {}
