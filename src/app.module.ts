import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { DevicesModule } from './devices/devices.module';
import { StatusesModule } from './statuses/statuses.module';
import { ShoppingModule } from './shopping/shopping.module';
import { ConfigurationModule } from './configuration';

@Module({
  imports: [
    StatusesModule,
    DevicesModule,
    ShoppingModule,
    DatabaseModule,
    AuthModule,
    ConfigurationModule,
  ],
})
export class AppModule {}
