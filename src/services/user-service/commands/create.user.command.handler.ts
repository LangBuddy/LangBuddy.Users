import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { CreateUserCommand } from 'src/models/commands/create.user.command';
import { Repository } from 'typeorm';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand>
{
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async execute(userCreateRequest: CreateUserCommand): Promise<string> {
    const user = this.userRepository.create(userCreateRequest);
    user.setCreateDate();
    await this.userRepository.save(user);
    return 'User was successfully created';
  }
}
