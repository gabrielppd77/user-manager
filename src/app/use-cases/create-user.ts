import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';

import { UserRepository } from '@app/repositories/user.repository';

import { User } from '../entities/user';
import { EmailOrPasswordIncorrect } from './errors/email-or-password-incorrect';

interface Request {
  email: string;
  name: string;
  password: string;
}

type Response = User;

@Injectable()
export class CreateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(request: Request): Promise<Response> {
    const { name, email, password } = request;

    const userExist = await this.userRepository.findByEmail(email);

    if (userExist) throw new EmailOrPasswordIncorrect();

    const hashPassword = await hash(password, 10);

    const newUser = new User({
      email,
      name,
      password: hashPassword,
    });

    await this.userRepository.create(newUser);

    return newUser;
  }
}
