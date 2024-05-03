import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import configurationFactory from './configuration';
import { DatabaseModule } from './database/database.module';
import { DevicesModule } from './devices/devices.module';
import { StatusesModule } from './statuses/statuses.module';

@Module({
  imports: [
    StatusesModule,
    DevicesModule,
    DatabaseModule,
    AuthModule,
    ConfigModule.forRoot({
      load: [configurationFactory],
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
