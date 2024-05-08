import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import bcrypt, {hash} from "bcrypt";
import { uid } from 'uid';

@Injectable()
export class UsersService {

  constructor(private readonly prismaService: PrismaService){}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword:string = await hash(createUserDto.password, 12);
    try{
      return await this.prismaService.user.create({
        data:{
          addr1: createUserDto.addr1 || "N/A",
          addr2: createUserDto.addr2 || "N/A",
          city: createUserDto.city || "N/A",
          comment: createUserDto.comment || "N/A",
          country: createUserDto.country || "GHA",
          email: createUserDto.email || "N/A",
          image: createUserDto.image || "N/A",
          name: createUserDto.name || "N/A",
          password: hashedPassword,
          phone: createUserDto.phone || "N/A",
          role: createUserDto.role || "USER",
          state: createUserDto.state || "N/A",
          username: createUserDto.username || "N/A",
          zip: createUserDto.zip || "N/A",
          id: `USER-${uid()}`
        }
      });
    }catch(e){
      throw new Error(e.message);
    }
  }

  async findAll() {
    try{
      return await this.prismaService.user.findMany();
    }catch(e){
      throw new Error(e.message);
    }
  }

  async findOne(id: number) {
    try{
      return await this.prismaService.user.findFirst({
        where: {
          userid: {equals: id}
        }
      });
    }catch(e){
      throw new Error(e.message);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try{
      return await this.prismaService.user.update({
        data:{
          addr1: updateUserDto.addr1 || "N/A",
          addr2: updateUserDto.addr2 || "N/A",
          city: updateUserDto.city || "N/A",
          country: updateUserDto.country || "N/A",
          image: updateUserDto.image || "N/A",
          phone: updateUserDto.phone || "N/A",
          state: updateUserDto.state || "N/A",
          zip: updateUserDto.zip || "N/A"
        },
        where:{
          userid: id
        }
      });

    }catch(e){
      throw new Error(e.message);
    }
  }

  async updatePassword(id: number, updateUserDto: UpdateUserDto){
    try{
      const hashedPassword:string = await hash(updateUserDto.password, 12);
      return this.prismaService.user.update({
        data:{
          password: hashedPassword
        },
        where:{
          userid: id
        }
      })
    }catch(e){
      throw new Error(e.message);
    }
  }

  async findByUsername(value: string){
    try{
      return [await this.prismaService.user.findFirst({
        where:{
          username: value
        }
      })];
    }catch(e){
      throw new Error(e.message);
    }
  }

  async findByEmail(value:string){
    try{
      return await this.prismaService.user.findFirst({
        where:{
          email: value
        }
      })
    }catch(e){
      throw new Error(e.message);
    }
  }

  async remove(id: number) {
    try{
      return this.prismaService.user.delete({
        where: {
          userid: id
        }
      });
    }catch(e){
      throw new Error(e.message);
    }
  }


  async removeByEmail(value: string){
    try{
      return this.prismaService.user.deleteMany({
        where:{
          email: {equals: value}
        }
      })
    }catch(e){
      console.log(e.message);
    }
  }

  async getPasswordByEmail(value: string){
    try{
      const data = await this.prismaService.user.findFirst({
        where: {
          email: {equals: value}
        },
        select: {password: true}
      })
      const transport = {}
    }catch(e){

    }
  }

  async updatePasswordWithEmail(password:string, email:string){
    try{
      const hashPassword = await hash(password, 12);
      return this.prismaService.user.updateMany({
        data: {
          password: `${hashPassword}`
        },
        where:{
          email
        }
      })
    }catch(e){
      console.log(e.message);
    }
  }

}
