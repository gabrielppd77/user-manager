import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';

import { ValidateLoginUser } from '@app/use-cases/validate-login-user';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private validateLoginUser: ValidateLoginUser) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    return await this.validateLoginUser.execute({ email, password });
  }
}
