import { Injectable, Scope } from '@nestjs/common';
import * as fs from 'node:fs';
import * as chokidar from 'chokidar';
import * as path from 'node:path';
import { Response } from 'express';
import { v4 } from 'uuid';

@Injectable({ scope: Scope.REQUEST })
export class LogStreamingService {
  private readonly LOG_FILE_PATH = path.resolve(
    `../../data/logs/${new Date().toISOString().slice(0, 10)}.log`,
  );
  private lastFileSize = 0;

  watchLogFile(clientResponse: Response): void {
    const streamUuid = v4();
    const watcher = chokidar.watch(this.LOG_FILE_PATH, { persistent: true });

    clientResponse.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
      'Content-Type': 'text/event-stream',
    });

    this.updateLastFileSize();

    watcher.on('change', () => {
      const currentSize = fs.statSync(this.LOG_FILE_PATH).size;
      if (currentSize > this.lastFileSize) {
        const fd = fs.openSync(this.LOG_FILE_PATH, 'r');
        const buffer = Buffer.alloc(currentSize - this.lastFileSize);
        fs.readSync(fd, buffer, 0, buffer.length, this.lastFileSize);
        clientResponse.write(
          `id: ${streamUuid}\nevent: message\ndata: ${buffer.toString()}\n`,
        );
        fs.closeSync(fd);
        this.lastFileSize = currentSize;
      }
    });

    clientResponse.on('close', () => {
      console.log('Client disconnected. Stopping file watch.');
      watcher.close();
    });
  }

  private updateLastFileSize(): void {
    this.lastFileSize = fs.statSync(this.LOG_FILE_PATH).size;
  }
}
