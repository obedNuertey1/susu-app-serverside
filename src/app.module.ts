import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BorrowersModule } from './borrowers/borrowers.module';
import { LoggerMiddleware } from './borrowers/logger/logger.middleware';
import { UsersModule } from './users/users.module';
import { TransactionsModule } from './transactions/transactions.module';
import { SystemSettingsModule } from './system_settings/system_settings.module';
import { RandomizeService } from './funcs/randomize/randomize.service';
// import { FuncsModule } from './funcs/funcs/funcs.module';
import { FuncsModule } from './funcs/funcs.module';


@Module({
  imports: [BorrowersModule, UsersModule, TransactionsModule, SystemSettingsModule, FuncsModule],
  controllers: [AppController],
  providers: [AppService, RandomizeService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('api/v1/borrowers')
  }
}
