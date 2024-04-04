import { Module } from '@nestjs/common';
import { LogStreamingModule } from './log-streaming/log-streaming.module';

@Module({
  imports: [LogStreamingModule],
})
export class AppModule {}
