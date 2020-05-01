import { Module } from '@nestjs/common';
import { CargoController } from './cargo.controller';
import { CargoService } from './cargo.services';
import { MongooseModule } from '@nestjs/mongoose';
import { CargoSchema } from './cargo.model';
import { LogModule } from '../log/log.module';

@Module({
  imports: [
    LogModule,
    MongooseModule.forFeature([{ name: 'Cargo', schema: CargoSchema }]),
  ],
  controllers: [CargoController],
  providers: [CargoService],
  exports: [CargoService],
})
export class CargoModule {}
