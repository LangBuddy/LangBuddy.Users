import { ApiProperty } from '@nestjs/swagger';

export class UserCreateRequest {
  @ApiProperty({ description: 'User First Name', nullable: false })
  firstName: string;

  @ApiProperty({ description: 'User Last Name', nullable: false })
  lastName: string;

  @ApiProperty({ description: 'User Birth Day', nullable: false })
  birthday: Date;

  @ApiProperty({ description: 'User gender', nullable: false })
  gender: 'man' | 'woman';
}
