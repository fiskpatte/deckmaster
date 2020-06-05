import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SettingsSchema } from './settings.model';
import { AppGateway } from 'src/app.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Settings', schema: SettingsSchema }]),
  ],
  controllers: [SettingsController],
  providers: [SettingsService, AppGateway],
})
export class SettingsModule {}
