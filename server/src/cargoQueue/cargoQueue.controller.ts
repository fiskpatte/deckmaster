import { Controller, Get, Headers, Post, Body } from '@nestjs/common';
import { CargoQueueService } from './cargoQueue.services';

@Controller('cargoqueue')
export class CargoQueueController {
  constructor(private readonly cargoQueueService: CargoQueueService) {}

  @Get()
  async getAll(@Headers('voyageid') voyageid) {
    if (!voyageid) {
      throw new Error('VoyageId not specified');
    }
    const result = await this.cargoQueueService.getAllByVoyageId(voyageid);
    return result;
  }

  @Post()
  async addToQueue(
    @Body('registrationNumber') registrationNumber: string,
    @Body('deckId') deckId: string,
    @Headers('voyageid') voyageid,
  ) {
    if (!voyageid) {
      throw new Error('Invalid voyage id');
    }
    const result = await this.cargoQueueService.addItem(
      registrationNumber,
      voyageid,
      deckId,
    );
    return result;
  }
}
