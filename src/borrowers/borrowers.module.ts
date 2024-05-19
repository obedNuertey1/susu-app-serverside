import { Module } from '@nestjs/common';
import { BorrowersService } from './borrowers.service';
import { BorrowersController } from './borrowers.controller';
import { PrismaService } from '../prisma.service';
import { SearchAndPagination } from './search_and_pagination/search_and_pagination';


@Module({
  controllers: [BorrowersController],
  providers: [BorrowersService, PrismaService, SearchAndPagination],
})
export class BorrowersModule {
}
