import { randomUUID } from 'node:crypto';

export interface UserProps {
  email: string;
  name: string;
  password: string;
}

export class User {
  private _id: string;
  private props: UserProps;

  constructor(props: UserProps, id?) {
    this._id = id ? id : randomUUID();
    this.props = props;
  }

  public get id() {
    return this._id;
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
