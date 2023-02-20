import { InMemoryUserRepository } from '@test/repositories/in-memory-user.repository';

import { ValidateUser } from './validate-user';
import { CreateUser } from './create-user';

import { EmailOrPasswordIncorrectException } from './errors/email-or-password-incorrect';

describe('Authenticate user', () => {
  it('should be able to authenticate an user', async () => {
    const userRepository = new InMemoryUserRepository();
    const createUser = new CreateUser(userRepository);
    const validateUser = new ValidateUser(userRepository);

    const userToCreate = {
      email: 'email@emailvalid.com',
      password: '1234',
      name: 'Jon Doe',
    };

    await createUser.execute(userToCreate);

    const { user } = await validateUser.execute({
      email: userToCreate.email,
      password: userToCreate.password,
    });

    expect(user).toBeDefined();
    expect(user.id).toBeDefined();
    expect(user.email).toEqual(userToCreate.email);
    expect(user.name).toEqual(userToCreate.name);
    expect(user.password).not.toEqual(userToCreate.password);
  });

  it('should be able to show an error when pass the invalid email', async () => {
    const userRepository = new InMemoryUserRepository();
    const createUser = new CreateUser(userRepository);
    const validateUser = new ValidateUser(userRepository);

    const userToCreate = {
      email: 'email@emailvalid.com',
      password: '1234',
      name: 'Jon Doe',
    };

    await createUser.execute(userToCreate);

    expect(
      async () =>
        await validateUser.execute({
          email: 'email@emailinvalid.com',
          password: userToCreate.password,
        }),
    ).rejects.toThrow(EmailOrPasswordIncorrectException);
  });

  it('should be able to show an error when pass the invalid password', async () => {
    const userRepository = new InMemoryUserRepository();
    const createUser = new CreateUser(userRepository);
    const validateUser = new ValidateUser(userRepository);

    const userToCreate = {
      email: 'email@emailvalid.com',
      password: '12345678',
      name: 'Jon Doe',
    };

    await createUser.execute(userToCreate);

    expect(
      async () =>
        await validateUser.execute({
          email: userToCreate.email,
          password: 'invalid-password',
        }),
    ).rejects.toThrow(EmailOrPasswordIncorrectException);
  });
});
