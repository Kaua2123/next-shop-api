import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class IsAdmin implements NestMiddleware {
  use(req: any, res: any, next: (error?: Error | any) => void) {}
}
