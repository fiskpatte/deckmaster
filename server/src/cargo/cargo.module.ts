import { Module } from '@nestjs/common';
import { CargoController } from './cargo.controller';
import { CargoService } from './cargo.services';
import { MongooseModule } from '@nestjs/mongoose';
import { CargoSchema } from './cargo.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Cargo', schema: CargoSchema }]),
  ],
  controllers: [CargoController],
  providers: [CargoService],
})
export class CargoModule {}
