import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BorrowersModule } from '../borrowers/borrowers.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [BorrowersModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
