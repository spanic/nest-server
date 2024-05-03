import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from './auth.guard';

let authGuard: AuthGuard;

beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [JwtService, AuthGuard],
  }).compile();

  authGuard = module.get<AuthGuard>(AuthGuard);
});

describe('AuthGuard', () => {
  it('should be defined', () => {
    expect(authGuard).toBeDefined();
  });
});
