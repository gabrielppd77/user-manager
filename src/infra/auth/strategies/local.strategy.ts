import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';

import { ValidateUser } from '@app/use-cases/validate-user';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private validateUser: ValidateUser) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    const { user } = await this.validateUser.execute({ email, password });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
