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
    getSubdirectories(@Query('name') name?: string): Promise<any> {
        return this.appService.getSubdirectories(
            name ? `${process.env.LEARNING_DASHBOARD_PATH}/${name}` : process.env.LEARNING_DASHBOARD_PATH,
        );
    }
}
