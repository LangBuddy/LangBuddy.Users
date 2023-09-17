import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { ServiceModule } from 'src/services/service.module';

@Module({
  imports: [ServiceModule],
  controllers: [UserController],
  exports: [],
})
export class WebModule {}
