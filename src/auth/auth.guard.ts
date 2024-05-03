import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { IS_PUBLIC_ROUTE_KEY as IS_PUBLIC_KEY } from './public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    if (this.checkIsPublicRoute(context)) return true;
    if (this.checkIsTokenValid(request)) return true;

    throw new UnauthorizedException();
  }

  private checkIsPublicRoute(context: ExecutionContext): boolean {
    return this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
  }

  private checkIsTokenValid(request: Request): boolean {
    const tokenFromCookie: string | undefined = request.cookies?.access_token;

    // eslint-disable-next-line prefer-const
    let [authType, tokenFromAuthHeader] =
      request.headers.authorization?.split(' ') ?? [];
    tokenFromAuthHeader =
      authType === 'Bearer' ? tokenFromAuthHeader : undefined;

    return [tokenFromCookie, tokenFromAuthHeader].some((accessToken) => {
      try {
        return !!this.jwtService.verify(accessToken);
      } catch {}
    });
  }
}
