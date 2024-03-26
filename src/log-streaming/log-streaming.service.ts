import { Injectable, Scope } from '@nestjs/common';
import * as fs from 'node:fs';
import * as chokidar from 'chokidar';
import * as path from 'node:path';
import { Response } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class LogStreamingService {
  private readonly LOG_FILE_PATH = path.resolve('logs/26-03-2024.log');
  private lastFileSize = 0;

  watchLogFile(clientResponse: Response): void {
    const watcher = chokidar.watch(this.LOG_FILE_PATH, { persistent: true });

    clientResponse.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Transfer-Encoding': 'chunked',
      Connection: 'keep-alive',
    });

    this.updateLastFileSize();

    watcher.on('change', () => {
      const currentSize = fs.statSync(this.LOG_FILE_PATH).size;
      if (currentSize > this.lastFileSize) {
        const fd = fs.openSync(this.LOG_FILE_PATH, 'r');
        const buffer = Buffer.alloc(currentSize - this.lastFileSize);
        fs.readSync(fd, buffer, 0, buffer.length, this.lastFileSize);
        clientResponse.write(buffer.toString());
        fs.closeSync(fd);
        this.lastFileSize = currentSize;
      }
    });

    clientResponse.on('close', () => {
      console.log('Client disconnected. Stopping file watch.');
      watcher.close();
    });

    const data = fs.readFileSync(this.LOG_FILE_PATH, 'utf-8');
    clientResponse.write(data);
  }

  private updateLastFileSize(): void {
    this.lastFileSize = fs.statSync(this.LOG_FILE_PATH).size;
  }
}
