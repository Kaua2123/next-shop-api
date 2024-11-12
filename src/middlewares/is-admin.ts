import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { jwtDecode } from 'jwt-decode';
import { IToken } from 'src/definitions';

@Injectable()
export class IsAdmin implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (!req.headers.authorization)
      throw new HttpException(
        'Você deve estar logado para realizar esta ação.',
        HttpStatus.UNAUTHORIZED,
      );

    const token = req.headers.authorization.split(' ')[1];

    const decodedToken: IToken = jwtDecode(token);

    if (decodedToken.role !== 'ADMIN')
      throw new HttpException(
        'Você deve ser um ADM para realizar esta ação.',
        HttpStatus.UNAUTHORIZED,
      );

    next();
  }
}
