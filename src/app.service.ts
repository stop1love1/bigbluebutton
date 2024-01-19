import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class AppService {
    constructor() {}

    async getSubdirectories(path: string): Promise<any> {
        try {
            const directories = await fs.promises.readdir(path, {
                withFileTypes: true,
            });
            const subdirectories = directories.filter((dirent) => dirent.isDirectory()).map((dirent) => dirent.name);
            return subdirectories;
        } catch {
            return [];
        }
    }
}
