import { Controller, Get, Res } from '@nestjs/common';
import { UserService } from 'src/services/user-service/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll(@Res() res) {
    try {
      const users = await this.userService.findAll();
      res.status(200).json(users);
    } catch (e) {
      res.status(400).json({ message: (e as Error).message });
    }
  }
}
