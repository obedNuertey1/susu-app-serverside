import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BorrowersModule } from './borrowers/borrowers.module';
import { LoggerMiddleware } from './borrowers/logger/logger.middleware';


@Module({
  imports: [BorrowersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('api/v1/borrowers')
  }
}
