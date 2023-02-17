import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';
import { RolesModule } from './roles/roles.module';
import { ShopsModule } from './shops/shops.module';

@Module({
  imports: [AuthModule, UsersModule, RolesModule, ShopsModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
