import { Module } from '@nestjs/common';
import { CargoController } from './cargo.controller';
import { CargoService } from './cargo.services';
import { MongooseModule } from '@nestjs/mongoose';
import { CargoSchema } from './cargo.model';
import { AppGateway } from 'src/app.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Cargo', schema: CargoSchema }]),
  ],
  controllers: [CargoController],
  providers: [CargoService, AppGateway],
  exports: [CargoService],
})
export class CargoModule {}
