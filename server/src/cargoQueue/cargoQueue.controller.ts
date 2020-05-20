import {
  Controller,
  Get,
  Headers,
  NotFoundException,
  Post,
  Body,
  Delete,
  Param,
} from '@nestjs/common';
import { CargoQueueService } from './cargoQueue.services';
import { CargoQueueItem } from './cargoQueue.model';

@Controller('cargoqueue')
export class CargoQueueController {
  constructor(private readonly cargoQueueService: CargoQueueService) {}

  @Get()
  async getAll(@Headers() headers) {
    if (!headers.voyageid) {
      throw new NotFoundException('VoyageId not specified');
    }
    const result = await this.cargoQueueService.getAllByVoyageId(
      headers.voyageid,
    );
    return result;
  }

  @Post()
  async addToQueue(@Body() cargoQueueItem: CargoQueueItem) {
    const result = await this.cargoQueueService.addItem(cargoQueueItem);
    return result;
  }

  @Delete(':id')
  async removeFromQueue(@Param('id') id: string, @Headers() headers) {
    await this.cargoQueueService.removeItemFromQueue(id, headers.voyageid);
    return null;
  }
}
