import { Module } from '@nestjs/common';
import { BorrowersService } from './borrowers.service';
import { BorrowersController } from './borrowers.controller';
import { PrismaService } from '../prisma.service';
import { SearchAndPagination } from './search_and_pagination/search_and_pagination';
import { FuncsModule } from 'src/funcs/funcs.module';


@Module({
  controllers: [BorrowersController],
  providers: [BorrowersService, PrismaService, SearchAndPagination],
  imports: [FuncsModule]
})
export class BorrowersModule {
}
