import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { PassportModule } from '@nestjs/passport/dist';
import { DatabaseModule } from '@infra/database/database.module';
import { JwtModule } from '@nestjs/jwt/dist';

import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

import { JwtAuthGuard } from './guards/jwt-auth.guard';

import { ValidateLoginUser } from '@app/use-cases/validate-login-user';
import { LoginUser } from '@app/use-cases/login-user';

@Module({
  imports: [
    PassportModule,
    DatabaseModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRE },
    }),
  ],
  providers: [
    ValidateLoginUser,
    LoginUser,
    LocalStrategy,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [LoginUser],
})
export class AuthModule {}
