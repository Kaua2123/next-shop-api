import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthRequired implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (!req.headers.authorization)
      throw new HttpException('Não autorizado.', HttpStatus.UNAUTHORIZED);

    const token = req.headers.authorization.split(' ')[1];

    if (!token)
      throw new HttpException(
        'Você deve estar logado para realizar essa ação.',
        HttpStatus.UNAUTHORIZED,
      );

    next();
  }
}
