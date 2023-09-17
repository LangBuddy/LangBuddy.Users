import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags, ApiResponse, ApiParam } from '@nestjs/swagger';
import { UserCreateRequest } from 'src/models/request/user.create.request';
import { UserUpdateRequest } from 'src/models/request/user.update.request';
import { UserResponse } from 'src/models/response/user.response';
import { UserService } from 'src/services/user-service/user.service';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Get Users' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: [UserResponse],
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async getAll(@Res() res): Promise<void> {
    try {
      const users = await this.userService.findAll();
      res.status(200).json(users);
    } catch (e) {
      res.status(400).json({ message: (e as Error).message });
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get User by ID' })
  @ApiParam({ name: 'id', required: true, description: 'User identifier' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: UserResponse,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async getOne(@Param('id') id: number, @Res() res) {
    try {
      const user = await this.userService.findOne(id);
      res.status(200).json(user);
    } catch (e) {
      res.status(400).json({ message: (e as Error).message });
    }
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async create(@Res() res, @Body() userCreateRequest: UserCreateRequest) {
    try {
      const result = await this.userService.create(userCreateRequest);
      res.status(200).json(result);
    } catch (e) {
      res.status(400).json({ message: (e as Error).message });
    }
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiParam({ name: 'id', required: true, description: 'User identifier' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async update(
    @Param('id') id: number,
    @Body() userUpdateRequest: UserUpdateRequest,
    @Res() res,
  ) {
    try {
      const result = await this.userService.update(id, userUpdateRequest);
      res.status(200).json(result);
    } catch (e) {
      res.status(400).json({ message: (e as Error).message });
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiParam({ name: 'id', required: true, description: 'User identifier' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async delete(@Param('id') id: number, @Res() res) {
    try {
      const result = await this.userService.delete(id);
      res.status(200).json(result);
    } catch (e) {
      res.status(400).json({ message: (e as Error).message });
    }
  }
}
