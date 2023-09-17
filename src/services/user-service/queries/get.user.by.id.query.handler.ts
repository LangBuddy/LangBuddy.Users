import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { IsNull, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { GetUserByIdQuery } from 'src/models/queries/get.user.by.id.query';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdQueryHandler
  implements IQueryHandler<GetUserByIdQuery>
{
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async execute(query: GetUserByIdQuery): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id: query.id,
        deleteDate: IsNull(),
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${query.id} not found`);
    }

    return user;
  }
}
