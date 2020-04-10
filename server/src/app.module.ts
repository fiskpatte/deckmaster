import { SettingsModule } from './settings/settings.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CargoPlacementModule } from './cargoPlacement/cargoplacement.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CargoModule } from './cargo/cargo.module';

@Module({
  imports: [
    SettingsModule,
    UsersModule,
    AuthModule,
    CargoPlacementModule,
    CargoModule,
    MongooseModule.forRoot(
      'mongodb+srv://dbUser:0cP6knNISFBnrwoC@loadmaster-przxq.mongodb.net/test?retryWrites=true&w=majority',
      { useNewUrlParser: true, useUnifiedTopology: true },
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
