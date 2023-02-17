import { User } from './user';

describe('User', () => {
  it('should be able to create an user', () => {
    const userToCreate = {
      email: 'email@gmail.com.br',
      name: 'Jon Doe',
      password: '1234',
    };
    const user = new User(userToCreate);
    expect(user.id).toBeDefined();
    expect(user.email).toEqual(userToCreate.email);
    expect(user.name).toEqual(userToCreate.name);
    expect(user.password).toEqual(userToCreate.password);
  });

  it('should be able to create a user when passed an id', () => {
    const userToCreate = {
      id: '12345',
      email: 'email@gmail.com.br',
      name: 'Jon Doe',
      password: '1234',
    };
    const user = new User(userToCreate);
    expect(user.id).toEqual(userToCreate.id);
    expect(user.email).toEqual(userToCreate.email);
    expect(user.name).toEqual(userToCreate.name);
    expect(user.password).toEqual(userToCreate.password);
  });
});
