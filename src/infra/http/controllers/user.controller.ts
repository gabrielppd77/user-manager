import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';

import { User } from '@app/entities/user';

import { UserMapper } from '../mappers/user-mapper';

import { CreateUser } from '@app/use-cases/create-user';
import { LoginUser } from '@app/use-cases/login-user';

import { LocalAuthGuard } from '@infra/auth/guards/local-auth.guard';

import { CreateUserBody } from '../dtos/create-user-body';

import { Public } from '../decorators/public.decorator';

@Controller('user')
export class UserController {
  constructor(private createUser: CreateUser, private loginUser: LoginUser) {}

  @Public()
  @Post('create')
  async create(@Body() body: CreateUserBody) {
    const { email, name, password } = body;

    const { user } = await this.createUser.execute({
      email,
      name,
      password,
    });

    return UserMapper.toHTTP(user);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    const userAuthenticated = req.user as User;

    const { access_token } = await this.loginUser.execute({
      user: userAuthenticated,
    });

    return {
      access_token,
    };
  }
}
