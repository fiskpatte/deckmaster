import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Log } from './log.model';
import { transformDbModel } from 'src/utils/mongo';

@Injectable()
export class LogService {
  constructor(@InjectModel('Log') private readonly logModel: Model<Log>) {}

  async addLog(text: string, username: string, voyageId: string) {
    const newLog = new this.logModel({
      username,
      text,
      voyageId,
    });

    newLog.save();
  }

  async voyageLog(voyageId: string) {
    try {
      const logs = await this.logModel.find({ voyageId }).exec();
      return logs.map(transformDbModel) as Log[];
    } catch (error) {
      throw error;
    }
  }
}
