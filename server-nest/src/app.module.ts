import { CargoPlacementModule } from './cargoPlacement/cargoplacement.module';
import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {CargoModule} from './cargo/cargo.module'

@Module({
  imports: [
        CargoPlacementModule, 
        CargoModule, 
        MongooseModule.forRoot('mongodb+srv://dbUser:0cP6knNISFBnrwoC@loadmaster-przxq.mongodb.net/test?retryWrites=true&w=majority')
      ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
