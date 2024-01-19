import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get('directories')
    @ApiQuery({
        name: 'path',
        type: String,
        required: false,
    })
    getSubdirectories(@Query('path') path?: string): Promise<any> {
        return this.appService.getSubdirectories(path ? path : process.env.LEARNING_DASHBOARD_PATH);
    }
}
