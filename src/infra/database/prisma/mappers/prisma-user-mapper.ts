import { User as UserPrisma } from '@prisma/client';
import { User } from '@app/entities/user';

export class PrismaUserMapper {
  static toPrisma(user: User): UserPrisma {
    return {
      id: user.id as string,
      email: user.email,
      name: user.name,
      password: user.password,
    };
  }
  static toDomain(userPrisma: UserPrisma): User {
    return new User({
      id: userPrisma.id,
      email: userPrisma.email,
      name: userPrisma.name,
      password: userPrisma.password,
    });
  }
}
