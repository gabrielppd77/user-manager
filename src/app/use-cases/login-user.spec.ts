import { JwtService } from '@nestjs/jwt';
import { LoginUser } from './login-user';
import { CreateUser } from './create-user';

import { InMemoryUserRepository } from '@test/repositories/in-memory-user.repository';

const JWT_SECRET = 'JWT_SECRET_FOR_TEST';

describe('LoginUser', () => {
  it('should login an user and create access_token correctly', async () => {
    const jwtService = new JwtService({
      secret: JWT_SECRET,
    });
    const loginUser = new LoginUser(jwtService);

    const inMemoryRepository = new InMemoryUserRepository();
    const createUser = new CreateUser(inMemoryRepository);

    const userCreated = await createUser.execute({
      email: 'email@valid.com',
      name: 'Jon Doe',
      password: '1234',
    });
    const { access_token } = loginUser.execute(userCreated);

    expect(access_token).toBeTruthy();
  });
});
