import { User } from '@app/entities/user';
import { InMemoryUserRepository } from '@test/repositories/in-memory-user.repository';

import { CreateUser } from './create-user';
import { EmailOrPasswordIncorrect } from './errors/email-or-password-incorrect';

describe('CreateUser', () => {
  it('should show error when found email that has been registred', async () => {
    const userRepository = new InMemoryUserRepository();
    const createUser = new CreateUser(userRepository);

    const emailRepeated = 'email@valid.com';

    const newUser = new User({
      email: emailRepeated,
      name: 'Jon Doe',
      password: '1234',
    });

    await userRepository.create(newUser);

    expect(
      async () =>
        await createUser.execute({
          email: emailRepeated,
          name: 'Jon Doe',
          password: '1234',
        }),
    ).rejects.toThrow(EmailOrPasswordIncorrect);
  });

  it('should be able to create an user', async () => {
    const userRepository = new InMemoryUserRepository();
    const createUser = new CreateUser(userRepository);

    const userToCreate = {
      email: 'emailValid@email.com',
      name: 'Jon Doe',
      password: '1234',
    };

    const userCreated = await createUser.execute(userToCreate);

    const userCreatedInDB = userRepository.users[0];

    expect(userCreated).toBeTruthy();
    expect(userCreatedInDB).toBeTruthy();

    expect(userCreated.id).toBeDefined();
    expect(userCreated.password).toBeDefined();
    expect(userCreated.password).not.toEqual(userToCreate.password);
    expect(userCreated.name).toEqual(userToCreate.name);
    expect(userCreated.email).toEqual(userToCreate.email);
  });
});
