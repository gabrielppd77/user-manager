import { randomUUID } from 'node:crypto';

export interface UserProps {
  id?: string;
  email: string;
  name: string;
  password: string;
}

export class User {
  private props: UserProps;

  constructor(props: UserProps) {
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
