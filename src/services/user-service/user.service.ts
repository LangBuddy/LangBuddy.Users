import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../database/entities/user.entity';
import { IsNull, Repository } from 'typeorm';
import { UserCreateRequest } from '../../models/request/user.create.request';
import { UserUpdateRequest } from '../../models/request/user.update.request';
import { UserResponse } from 'src/models/response/user.response';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(userCreateRequest: UserCreateRequest) {
    const user = this.userRepository.create(userCreateRequest);
    user.setCreateDate();
    return await this.userRepository.save(user);
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: {
        id,
        deleteDate: IsNull(),
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async findAll() {
    const users = (
      await this.userRepository.find({
        where: {
          deleteDate: IsNull(),
        },
      })
    ).map((el) => {
      const userResponse: UserResponse = {
        firstName: el.firstName,
        lastName: el.lastName,
        birthday: el.birthday,
        gender: el.gender,
      };
      return userResponse;
    });

    return users;
  }

  async update(id: number, userUpdateRequest: UserUpdateRequest) {
    const user = await this.findOne(id);
    user.setUpdateDate();

    await this.userRepository.update(id, {
      firstName: userUpdateRequest.firstName || user.firstName,
      lastName: userUpdateRequest.lastName || user.lastName,
      birthday: userUpdateRequest.birthday || user.birthday,
      gender: userUpdateRequest.gender || user.gender,
      updateDate: user.updateDate,
    });

    return `This action updates a #${id} user`;
  }

  async delete(id: number) {
    const user = await this.findOne(id);
    user.setDeleteDate();

    await this.userRepository.update(id, user);

    return `This action removes a #${id} user`;
  }
}
