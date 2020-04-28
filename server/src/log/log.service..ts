import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Log } from './log.model';

@Injectable()
export class LogService {
  constructor(@InjectModel('Log') private readonly logModel: Model<Log>) {}

  async addLog(text: string, username: string) {
    const newLog = new this.logModel({
      username,
      text,
      voyageId: 'dummy-voyage-id',
      created: new Date().toISOString(),
    });

    newLog.save();
  }
}
