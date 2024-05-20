import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma.service';
import { SearchAndPagination } from './search_and_pagination/search_and_pagination';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, SearchAndPagination],
})
export class UsersModule {}
