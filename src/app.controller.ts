import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get('directories')
    getSubdirectories(@Query('name') name: string): Promise<any> {
        return this.appService.getSubdirectories(
            name ? `${process.env.LEARNING_DASHBOARD_PATH}/${name}` : process.env.LEARNING_DASHBOARD_PATH,
        );
    }

    @Get('file-content')
    async readFileContent(@Query('filePath') filePath: string): Promise<string | null> {
        return this.appService.readFileContent(filePath);
    }
}
