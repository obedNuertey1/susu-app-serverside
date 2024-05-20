import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { PrismaService } from 'src/prisma.service';
import { SearchAndPagination } from './search_and_pagination/search_and_pagination';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService, PrismaService, SearchAndPagination],
})
export class TransactionsModule {}
