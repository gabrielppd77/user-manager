import { Entity } from '@app/common/entities/entity';
interface UserProps {
  email: string;
  password: string;
}

export class User extends Entity<UserProps> {
  public get email() {
    return this.props.email;
  }

  public get password() {
    return this.props.password;
  }
}
