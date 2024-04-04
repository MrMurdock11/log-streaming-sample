import { Controller, Get, Res } from '@nestjs/common';
import { LogStreamingService } from './log-streaming.service';
import { Response } from 'express';

@Controller('logs')
export class LogStreamingController {
  constructor(private readonly _logStreamingService: LogStreamingService) {}

  @Get('stream')
  streamLogs(@Res() response: Response): void {
    this._logStreamingService.watchLogFile(response);
  }
}
