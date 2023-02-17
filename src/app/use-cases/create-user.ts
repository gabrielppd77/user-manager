import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';

import { UserRepository } from '@app/repositories/user.repository';

import { User } from '../entities/user';
import { EmailInUseException } from './errors/email-in-use';

interface Request {
  email: string;
  name: string;
  password: string;
}

export interface Response {
  user: User;
}

@Injectable()
export class CreateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(request: Request): Promise<Response> {
    const { name, email, password } = request;

    const userExist = await this.userRepository.findByEmail(email);

    if (userExist) throw new EmailInUseException();

    const hashPassword = await hash(password, 10);

    const user = new User({
      email,
      name,
      password: hashPassword,
    });

    await this.userRepository.create(user);

    return {
      user,
    };
  }
}
