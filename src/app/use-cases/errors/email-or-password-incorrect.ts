import { BadRequestException } from '@nestjs/common';

export class EmailOrPasswordIncorrectException extends BadRequestException {
  constructor() {
    super('Email ou senha inválidos.');
  }
}
