import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../typeorm/entities/User.entity';
import { CreateUserParams, UpdateUserParams } from '../utils/types';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  create(userDetails: CreateUserParams): Promise<User> {
    const newUser = this.usersRepository.create({
      ...userDetails,
      createdAt: new Date(),
    });
    return this.usersRepository.save(newUser);
  }


  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({
      id,
    });
  }

  async update(id: number, updateUserDetails: UpdateUserParams) {
    await this.usersRepository.update(id, updateUserDetails);
    return this.findOne(id);
  }

  async remove(id: number) {
    return this.usersRepository.delete(id);
  }
}
