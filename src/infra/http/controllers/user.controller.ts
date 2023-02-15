import { Body, Controller, Post } from '@nestjs/common';

import { CreateUserBody } from '../dtos/create-user-body';
import { CreateUser } from '@app/use-cases/create-user';
import { UserMapper } from '../mappers/user-mapper';

@Controller('user')
export class UserController {
  constructor(private createUser: CreateUser) {}

  @Post('create')
  async create(@Body() body: CreateUserBody) {
    const { email, name, password } = body;

    const userCreated = await this.createUser.execute({
      email,
      name,
      password,
    });

    return UserMapper.toHTTP(userCreated);
  }
}
