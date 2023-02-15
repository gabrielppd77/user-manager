import { User as UserPrisma } from '@prisma/client';
import { User } from '@app/entities/user';

export class PrismaUserMapper {
  static toPrisma(user: User): UserPrisma {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      password: user.password,
    };
  }
  static toDomain(userPrisma: UserPrisma): User {
    return new User(
      {
        email: userPrisma.email,
        name: userPrisma.name,
        password: userPrisma.password,
      },
      userPrisma.id,
    );
  }
}
