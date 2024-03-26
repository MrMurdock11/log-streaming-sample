import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LogStreamingModule } from './log-streaming/log-streaming.module';

@Module({
  imports: [LogStreamingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
