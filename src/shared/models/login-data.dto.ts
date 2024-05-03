import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDataDto {
  @ApiProperty({ type: String, default: 'USER_ID' })
  @IsNotEmpty()
  @IsString()
  userId: string;
}
