import { LogService } from './log.service.';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Controller, UseGuards, Get, Headers } from '@nestjs/common';
@UseGuards(JwtAuthGuard)
@Controller('log')
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Get('voyageLog')
  async voyageLog(@Headers('voyageid') voyageId: string) {
    const logs = await this.logService.voyageLog(voyageId);
    return logs;
  }
}
