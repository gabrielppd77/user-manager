import { User } from '@app/entities/user';

export class UserMapper {
  static toHTTP(user: User) {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }
}
