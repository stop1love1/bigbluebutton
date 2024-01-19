import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AppMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        try {
            next();
        } catch (error) {
            throw new ForbiddenException(error.message);
        }
    }
}
