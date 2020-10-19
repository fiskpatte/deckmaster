import { Module } from '@nestjs/common';
import { CargoPlacementModule } from 'src/cargoPlacement/cargoplacement.module';
import { DataController } from './data.controller';
import { DataService } from './data.service';

@Module({
  imports: [CargoPlacementModule],
  controllers: [DataController],
  providers: [DataService],
})
export class DataModule { }
