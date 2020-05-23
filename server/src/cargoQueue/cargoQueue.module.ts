import { CargoQueueController } from './cargoQueue.controller';
import { Module } from '@nestjs/common';
import { CargoQueueService } from './cargoQueue.services';
import { MongooseModule } from '@nestjs/mongoose';
import { CargoQueueItemSchema } from './cargoQueue.model';
import { AppGateway } from 'src/app.gateway';
import { CargoModule } from 'src/cargo/cargo.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'CargoQueue', schema: CargoQueueItemSchema },
    ]),
    CargoModule,
  ],
  controllers: [CargoQueueController],
  providers: [CargoQueueService, AppGateway],
  exports: [CargoQueueService],
})
export class CargoQueueModule {}
