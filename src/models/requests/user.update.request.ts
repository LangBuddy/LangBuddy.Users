import { ApiProperty } from '@nestjs/swagger';

export class UserUpdateRequest {
  @ApiProperty({ description: 'User First Name', nullable: true })
  firstName: string | null;

  @ApiProperty({ description: 'User Last Name', nullable: true })
  lastName: string | null;

  @ApiProperty({ description: 'User Birth Day', nullable: true })
  birthday: Date | null;

  @ApiProperty({ description: 'User gender', nullable: true })
  gender: 'man' | 'woman' | null;
}
