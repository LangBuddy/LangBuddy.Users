import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../database/entities/user.entity';
import { Repository } from 'typeorm';
import { UserCreateRequest } from '../../models/request/user.create.request';
import { UserUpdateRequest } from '../../models/request/user.update.request';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(userCreateRequest: UserCreateRequest) {
    const user = this.userRepository.create(userCreateRequest);
    return await this.userRepository.save(user);
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({
      id: id,
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async findAll() {
    const users = await this.userRepository.find();
    return users;
  }

  async update(id: number, userUpdateRequest: UserUpdateRequest) {
    const user = await this.findOne(id);

    await this.userRepository.update(id, {
      firstName: userUpdateRequest.firstName || user.firstName,
      lastName: userUpdateRequest.lastName || user.lastName,
      birthday: userUpdateRequest.birthday || user.birthday,
      gender: userUpdateRequest.gender || user.gender,
    });

    return `This action updates a #${id} user`;
  }

  async delete(id: number) {
    const user = await this.findOne(id);

    await this.userRepository.remove(user);

    return `This action removes a #${id} user`;
  }
}
