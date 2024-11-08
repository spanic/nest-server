import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import configurationFactory from './configuration';
import { DatabaseModule } from './database/database.module';
import { DevicesModule } from './devices/devices.module';
import { StatusesModule } from './statuses/statuses.module';
import { ShoppingModule } from './shopping/shopping.module';

@Module({
  imports: [
    StatusesModule,
    DevicesModule,
    ShoppingModule,
    DatabaseModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.development'],
      load: [configurationFactory],
      isGlobal: true,
      expandVariables: true,
    }),
  ],
})
export class AppModule {}
