import { Controller, Get, Headers, NotFoundException, Post, Body } from '@nestjs/common';
import { CargoQueueService } from './cargoQueue.services';
import { CargoQueueItem } from './cargoQueue.model';

@Controller()
export class CargoQueueController {
  constructor(private readonly cargoQueueService: CargoQueueService) { }

  @Get()
  async getAll(@Headers() headers) {
    if (!headers.voyageid) {
      throw new NotFoundException('VoyageId not specified');
    }
    const result = await this.cargoQueueService.getAllByVoyageId(headers.voyageid);
    return result;
  }

  @Post()
  async placeCargo(@Headers() headers, @Body() cargoQueueItem: CargoQueueItem) {
    const result = await this.cargoQueueService.addItem(cargoQueueItem);
    return result;
  }

}
