import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { UpdateUserCommand } from 'src/models/commands/update.user.command';
import { GetUserByIdQuery } from 'src/models/queries/get.user.by.id.query';
import { Repository } from 'typeorm';

@CommandHandler(UpdateUserCommand)
export class UpdateUserCommandHandler
  implements ICommandHandler<UpdateUserCommand>
{
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly queryBus: QueryBus,
  ) {}

  async execute(command: UpdateUserCommand): Promise<string> {
    const user = await this.queryBus.execute(new GetUserByIdQuery(command.id));
    user.setUpdateDate();

    await this.userRepository.update(command.id, {
      firstName: command.firstName || user.firstName,
      lastName: command.lastName || user.lastName,
      birthday: command.birthday || user.birthday,
      gender: command.gender || user.gender,
      updateDate: user.updateDate,
    });

    return `This action updates a #${command.id} user`;
  }
}
