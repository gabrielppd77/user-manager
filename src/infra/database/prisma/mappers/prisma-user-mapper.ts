import { User as UserPrisma } from '@prisma/client';
import { User } from '@app/entities/user';

export class PrismaUserMapper {
  static toPrisma(user: User): UserPrisma {
    return {
      id: user.id.toValue(),
      email: user.email,
      password: user.password,
    };
  }
  static toDomain(userPrisma: UserPrisma): User {
    return new User(
      {
        email: userPrisma.email,
        password: userPrisma.password,
      },
      userPrisma.id,
    );
  }
}
