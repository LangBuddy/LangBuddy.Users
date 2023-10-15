import { Injectable } from '@nestjs/common';
import { UserCreateRequest } from '../../models/requests/user.create.request';
import { UserUpdateRequest } from '../../models/requests/user.update.request';
import { UserResponse } from 'src/models/responses/user.response';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetUserByIdQuery } from 'src/models/queries/get.user.by.id.query';
import { GetUsersQuery } from 'src/models/queries/get.users.query';
import { CreateUserCommand } from 'src/models/commands/create.user.command';
import { UpdateUserCommand } from 'src/models/commands/update.user.command';
import { DeleteUserCommand } from 'src/models/commands/delete.user.command';
import { HttpResponse } from 'src/models/responses/http.response';

@Injectable()
export class UserService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async create(userCreateRequest: UserCreateRequest) {
    const command = new CreateUserCommand(
      userCreateRequest.firstName,
      userCreateRequest.lastName,
      userCreateRequest.birthday,
      userCreateRequest.gender,
    );
    const result = await this.commandBus.execute(command);
    return new HttpResponse(true, 'User successfully created', {
      id: result,
    });
  }

  async findOne(id: number) {
    const query = new GetUserByIdQuery(id);
    const user = await this.queryBus.execute(query);

    const userResponse: UserResponse = {
      firstName: user.firstName,
      lastName: user.lastName,
      birthday: user.birthday,
      gender: user.gender,
    };

    return new HttpResponse(true, 'User successfully received', userResponse);
  }

  async findAll() {
    const users = await this.queryBus.execute(new GetUsersQuery());

    const usersResponse: UserResponse[] = users.map((el) => {
      return {
        firstName: el.firstName,
        lastName: el.lastName,
        birthday: el.birthday,
        gender: el.gender,
      } as UserResponse;
    });

    return new HttpResponse(true, 'Users successfully received', usersResponse);
  }

  async update(id: number, userUpdateRequest: UserUpdateRequest) {
    const command = new UpdateUserCommand(
      id,
      userUpdateRequest.firstName,
      userUpdateRequest.lastName,
      userUpdateRequest.birthday,
      userUpdateRequest.gender,
    );

    const result = await this.commandBus.execute(command);
    return new HttpResponse(true, 'User successfully updated', {
      id: result,
    });
  }

  async delete(id: number) {
    const result = await this.commandBus.execute(new DeleteUserCommand(id));
    return new HttpResponse(true, 'User successfully deleted', result);
  }
}
