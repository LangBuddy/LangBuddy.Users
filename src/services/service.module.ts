import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../database/entities/user.entity';
import { UserService } from './user-service/user.service';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserCommandHandler } from './user-service/commands/create.user.command.handler';
import { GetUsersQueryHandler } from './user-service/queries/get.users.query.handler';
import { GetUserByIdQueryHandler } from './user-service/queries/get.user.by.id.query.handler';
import { UpdateUserCommandHandler } from './user-service/commands/update.user.command.handler';
import { DeleteUserCommandHandler } from './user-service/commands/delete.user.command.handler';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CqrsModule],
  providers: [
    UserService,
    CreateUserCommandHandler,
    GetUsersQueryHandler,
    GetUserByIdQueryHandler,
    UpdateUserCommandHandler,
    DeleteUserCommandHandler,
  ],
  exports: [UserService],
})
export class ServiceModule {}
