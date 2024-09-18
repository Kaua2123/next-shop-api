import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  // devido ao fato de userService ser Injectable, pode-se usar ele qui, como uma dependênica.

  @Get('/')
  async users() {
    return this.userService.users();
  }
}
