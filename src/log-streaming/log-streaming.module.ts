import { Module } from '@nestjs/common';
import { LogStreamingController } from './log-streaming.controller';
import { LogStreamingService } from './log-streaming.service';

@Module({
  controllers: [LogStreamingController],
  providers: [LogStreamingService]
})
export class LogStreamingModule {}
