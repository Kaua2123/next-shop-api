import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class IsAdmin implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // checar pelo token se é um admin ou não. token esse que tá no req.headers.authoriation
    // na segunda parte deve ter o role. só checar. pra isso vai ter q enviar a role pelo headers tbm.
    // boa sortekkm
  }
}
