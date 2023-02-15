import { User } from './user';

describe('User', () => {
  it('should be able to create a user', async () => {
    const userToCreate = {
      email: 'email@gmail.com.br',
      name: 'Jon Doe',
      password: '1234',
    };
    const user = await new User(userToCreate);
    expect(user).toBeTruthy();
    expect(user.id).toBeDefined();
    expect(user.email).toEqual(userToCreate.email);
    expect(user.name).toEqual(userToCreate.name);
    expect(user.password).toEqual(userToCreate.password);
  });
});
