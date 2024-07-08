import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { EnvironmentVariables } from 'src/shared/models/environment-variables.model';

@Injectable()
export class AuthService {
  private readonly DEFAULT_USER_ID = this.configService.get('defaultUserId');

  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
    private readonly jwtService: JwtService,
  ) {}

  login(userId: string): string {
    if (userId !== this.DEFAULT_USER_ID) throw new UnauthorizedException();
    return this.jwtService.sign({ sub: 'default user' });
  }
}
