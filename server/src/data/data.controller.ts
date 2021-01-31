import {
  Controller,
  Get,
  NotFoundException,
  Param,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DataService } from './data.service';

@UseGuards(JwtAuthGuard)
@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Get('placedCargo/:id')
  async getCargoPlacementDataByVoyageId(@Param('id') voyageId: string) {
    const result = await this.dataService.getCargoPlacementDataByVoyageId(
      voyageId,
    );
    if (result.cargo.length === 0) {
      throw new NotFoundException(`No cargo placed for voyageId: ${voyageId}.`);
    }
    return result;
  }
}
