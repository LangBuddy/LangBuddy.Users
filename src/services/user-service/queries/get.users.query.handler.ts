import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { GetUsersQuery } from 'src/models/queries/get.users.query';
import { IsNull, Repository } from 'typeorm';

@QueryHandler(GetUsersQuery)
export class GetUsersQueryHandler implements IQueryHandler<GetUsersQuery> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async execute(getUsersQuery: GetUsersQuery): Promise<User[]> {
    const users = await this.userRepository.find({
      where: {
        deleteDate: IsNull(),
      },
    });

    return users;
  }
}
