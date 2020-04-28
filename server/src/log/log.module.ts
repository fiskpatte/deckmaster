import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LogService } from './log.service.';
import { LogSchema } from './log.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Log', schema: LogSchema }])],
  controllers: [],
  providers: [LogService],
  exports: [LogService],
})
export class LogModule {}
