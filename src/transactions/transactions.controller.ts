import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionsSearchDto } from './dto/transactions-search-dto';

@Controller('api/v1/transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(createTransactionDto);
  }

  @Get()
  getFields(@Query('fields') fields: string) {
    if(fields == 'true'){
      return this.transactionsService.getFields();
    }
    return;
  }

  @Get('alldata')
  findAllTx(@Query("") querykeys: TransactionsSearchDto){
    return this.transactionsService.findAllTx(querykeys);
  }

  @Get('alldata/:id')
  findOne(@Param('id') id: string) {
    return this.transactionsService.findOne(+id);
  }



  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
    return this.transactionsService.update(+id, updateTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionsService.remove(+id);
  }
}
