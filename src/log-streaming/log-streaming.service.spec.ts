import { Test, TestingModule } from '@nestjs/testing';
import { LogStreamingService } from './log-streaming.service';

describe('LogStreamingService', () => {
  let service: LogStreamingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LogStreamingService],
    }).compile();

    service = await module.resolve<LogStreamingService>(LogStreamingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
