import { randomUUID } from 'node:crypto';

interface UserProps {
  id: string;
  email: string;
  name: string;
  password: string;
}

interface UserConstructorProps extends Omit<UserProps, 'id'> {
  id?: string;
}

export class User {
  private props: UserProps;

  constructor(props: UserConstructorProps) {
    this.props = {
      ...props,
      id: props.id || randomUUID(),
    };
  }

  public get id() {
    return this.props.id;
  }

  public get email() {
    return this.props.email;
  }

  public get name() {
    return this.props.name;
  }

  public get password() {
    return this.props.password;
  }
}
