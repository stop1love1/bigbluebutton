import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class AppService {
    constructor() {}

    async getSubdirectories(name: string): Promise<any> {
        try {
            const directories = await fs.promises.readdir(name, {
                withFileTypes: true,
            });
            const subdirectories = directories
                .filter((dirent: any) => dirent.isDirectory())
                .map((dirent: any) => dirent.name);
            return subdirectories;
        } catch {
            return [];
        }
    }

    async readFileContent(filePath: string): Promise<string | null> {
        try {
            const content = await fs.promises.readFile(`${process.env.LEARNING_DASHBOARD_PATH}/${filePath}`, 'utf-8');
            return content;
        } catch (error) {
            return null;
        }
    }
}
