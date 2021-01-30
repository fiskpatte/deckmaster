import { CargoQueueModule } from './cargoQueue/cargoQueue.module';
import { SettingsModule } from './settings/settings.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CargoPlacementModule } from './cargoPlacement/cargoplacement.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CargoModule } from './cargo/cargo.module';
import { LogModule } from './log/log.module';
import { AppGateway } from './app.gateway';
import { DataModule } from './data/data.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CargoQueueModule,
    SettingsModule,
    UsersModule,
    AuthModule,
    CargoPlacementModule,
    CargoModule,
    LogModule,
    DataModule,
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
