import { ConsoleLogger, Injectable } from '@nestjs/common';

import * as fs from 'fs';
import * as path from 'path';
import { promises as fsPromises } from 'fs';


@Injectable()
export class MyLoggerService extends ConsoleLogger {
    async logToFile(entry: string) {

        try {
            if (!fs.existsSync(path.join(__dirname, '..','..', 'logs'))) {
                await fsPromises.mkdir(path.join(__dirname, '..','..', 'logs'), { recursive: true });
            }
            await fsPromises.appendFile( path.join(__dirname, '..','..', 'logs', 'app.log'), entry + '\n');
        } catch (error) {
            if (error instanceof Error) {
                console.error(`Error writing to log file: ${error.message}`);
            }
        }
    }

    log(message: any, context?: string) {
        const entry = `{new Date().toISOString()}\t[${context || 'MyLoggerService'}]\t${message}`;
        this.logToFile(entry);
        super.log(entry);
        
    }

    error(message: any, trace?: string, context?: string) {
        const entry = `{new Date().toISOString()}\t[${context || 'MyLoggerService'}]\t${message}`;
        this.logToFile(entry);
        super.error(entry, trace);
    }

}
