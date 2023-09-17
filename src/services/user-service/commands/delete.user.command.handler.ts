import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { DeleteUserCommand } from 'src/models/commands/delete.user.command';
import { GetUserByIdQuery } from 'src/models/queries/get.user.by.id.query';
import { Repository } from 'typeorm';

@CommandHandler(DeleteUserCommand)
export class DeleteUserCommandHandler
  implements ICommandHandler<DeleteUserCommand>
{
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly queryBus: QueryBus,
  ) {}

  async execute(command: DeleteUserCommand): Promise<string> {
    const user = await this.queryBus.execute(new GetUserByIdQuery(command.id));
    user.setDeleteDate();

    await this.userRepository.update(command.id, user);

    return `This action removes a #${command.id} user`;
  }
}
