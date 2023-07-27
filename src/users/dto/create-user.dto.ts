import { CreateDateColumn } from 'typeorm';

export class CreateUserDto {
  username: string;
  password: string;

  @CreateDateColumn()
  createdAt: Date;
}
