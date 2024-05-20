import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersSearchDto } from './dto/users-search-dto';

@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto, @Query('makeAdmin') makeAdmin: string) {
    return this.usersService.create(createUserDto, makeAdmin);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('username/:value')
  findByUsername(@Param('value') value: string){
    return this.usersService.findByUsername(value);
  }

  @Get('currentUser/alldata')
  findAllUsers(@Query("") querykeys: UsersSearchDto){
    return this.usersService.findAllUsers(querykeys);
  }

  @Get('fields/alldata')
  getFields(@Query('fields') fields: string){
    if(fields == 'true'){
      return this.usersService.getFields();
    }
    return;
  }

  @Get('email/:value')
  findByEmail(@Param('value') value: string){
    return this.usersService.findByEmail(value);
  }

  @Put('email')
  updatePasswordWithEmail(@Body() updateUserDto: UpdateUserDto){
    return this.usersService.updatePasswordWithEmail(updateUserDto.password, updateUserDto.email);
  }

  @Delete('email/:value')
  removeByEmail(@Param('value') value: string){
    return this.usersService.removeByEmail(value);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Get("password/:email")
  getPasswordByEmail(@Param('email') email: string){
    return this.usersService.getPasswordByEmail(email);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
