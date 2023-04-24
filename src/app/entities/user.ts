import { Entity } from '@app/common/entities/entity';
interface UserProps {
  email: string;
  name: string;
  password: string;
}

export class User extends Entity<UserProps> {
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
