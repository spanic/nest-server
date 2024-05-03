import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export enum AccessTokenProvideTypes {
  COOKIE = 'cookie',
  MANUAL = 'manual',
}

export class LoginQueryParams {
  @ApiProperty({
    type: String,
    default: AccessTokenProvideTypes.MANUAL,
    enum: Object.values(AccessTokenProvideTypes),
  })
  @IsNotEmpty()
  @IsString()
  @IsIn(Object.values(AccessTokenProvideTypes))
  type: AccessTokenProvideTypes = AccessTokenProvideTypes.MANUAL;
}
