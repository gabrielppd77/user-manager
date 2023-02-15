import { Module } from '@nestjs/common';

import { UserController } from './controllers/user.controller';

import { DatabaseModule } from '@infra/database/database.module';

import { CreateUser } from '@app/use-cases/create-user';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [CreateUser],
})
export class HttpModule {}
