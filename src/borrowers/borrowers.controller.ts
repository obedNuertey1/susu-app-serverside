import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Next } from '@nestjs/common';
import { BorrowersService } from './borrowers.service';
import { CreateBorrowerDto } from './dto/create-borrower.dto';
import { UpdateBorrowerDto } from './dto/update-borrower.dto';
import { NextFunction } from 'express';
import { PassThrough } from 'stream';
import { BorrowerSearchDto } from './dto/borrower-search.dto';

@Controller('api/v1/borrowers')
export class BorrowersController {
  constructor(private readonly borrowersService: BorrowersService) {}

  @Post()
  create(@Body() createBorrowerDto: CreateBorrowerDto) {
    return this.borrowersService.create(createBorrowerDto);
  }

  @Get()
  getFields(@Query('fields') fields:string){
    if(fields == 'true'){
      return this.borrowersService.getFields();
    }
    return;
  }
  
  @Get('alldata')
  findAll(@Query("") querykeys: BorrowerSearchDto){
    return this.borrowersService.findAll(querykeys);
  }



  @Get('alldata/:id')
  findOne(@Param('id') id: number) {
    console.log("id=",id);
    return this.borrowersService.findOne(id);
  }

  @Patch('alldata/:id')
  update(@Param('id') id: string, @Body() updateBorrowerDto: UpdateBorrowerDto) {
    return this.borrowersService.update(+id, updateBorrowerDto);
  }

  @Delete('alldata/:id')
  remove(@Param('id') id: string) {
    return this.borrowersService.remove(+id);
  }

}
