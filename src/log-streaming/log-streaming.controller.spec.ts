import { Test, TestingModule } from '@nestjs/testing';
import { LogStreamingController } from './log-streaming.controller';
import { LogStreamingService } from './log-streaming.service';

describe('LogStreamingController', () => {
  let controller: LogStreamingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LogStreamingController],
      providers: [LogStreamingService],
    }).compile();

    controller = module.get<LogStreamingController>(LogStreamingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
