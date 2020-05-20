import { CargoQueueController } from './cargoQueue.controller';
import { Module } from '@nestjs/common';
import { CargoQueueService } from './cargoQueue.services';
import { MongooseModule } from '@nestjs/mongoose';
import { CargoQueueItemSchema } from './cargoQueue.model';
import { AppGateway } from 'src/app.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'CargoQueue', schema: CargoQueueItemSchema },
    ]),
    CargoQueueModule,
  ],
  controllers: [CargoQueueController],
  providers: [CargoQueueService, AppGateway],
})
export class CargoQueueModule {}
