import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { EnvironmentVariables } from 'src/shared/models/environment-variables.model';
import { LoginDataDto } from 'src/shared/models/login-data.dto';
import {
  AccessTokenProvideTypes,
  LoginQueryParams,
} from 'src/shared/models/login-query-params';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(
    @Query() query: LoginQueryParams,
    @Body() loginData: LoginDataDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const accessToken = this.authService.login(loginData.userId);

    if (query.type === AccessTokenProvideTypes.COOKIE) {
      const expiresIn = new Date(
        Date.now() + this.configService.get<number>('jwtTokenLifetimeMs'),
      );

      res.cookie('access_token', accessToken, {
        httpOnly: true,
        secure: false,
        expires: expiresIn,
      });
    }

    if (query.type === AccessTokenProvideTypes.MANUAL) {
      return { access_token: accessToken };
    }
  }
}
