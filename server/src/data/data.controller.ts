import { Controller, Get, NotFoundException, Param } from "@nestjs/common";
import { DataService } from "./data.service";

@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) { }

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