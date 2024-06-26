import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import {hash} from "bcrypt";
import { uid } from 'uid';
import { SearchAndPagination } from './search_and_pagination/search_and_pagination';
import { UsersSearchDto } from './dto/users-search-dto';

@Injectable()
export class UsersService {

  constructor(private readonly prismaService: PrismaService, private readonly searchAndPagination: SearchAndPagination){}

  async create(createUserDto: CreateUserDto, makeAdmin: string) {
    const hashedPassword:string = await hash(createUserDto.password, 12);
    const adminPassKey = process.env.ADMIN_PASSKEY
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
          role: (adminPassKey == makeAdmin)?"ADMIN":"USER",
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

  async findAllUsers(querykeys:UsersSearchDto){
    const rowsPerPage = Number(querykeys.rowsPerPage || 20);
    try{
      if(querykeys.pageIndex && querykeys.searchQuery && querykeys.searchKey){
        const getallFields = await this.getFields();
        const getdata = await this.prismaService.user.findMany({
          orderBy: {id: 'desc'}
        });
        const myResult = await this.searchAndPagination.usersFunc(getallFields, getdata, rowsPerPage, querykeys.searchQuery, querykeys.searchKey, querykeys.pageIndex, "by-key")
        return myResult;
      }

      if(querykeys.pageIndex && querykeys.searchQuery){
        
        const getallFields = await this.getFields();
        const getdata = await this.prismaService.user.findMany({orderBy: {id: 'desc'}});

        const myResult = await this.searchAndPagination.usersFunc(getallFields, getdata, rowsPerPage, querykeys.searchQuery, querykeys.searchKey, querykeys.pageIndex, "for-all")
        return myResult;
      }

      if(querykeys.pageIndex){
        const queryResult = await this.prismaService.user.findMany({
          take: rowsPerPage,
          skip: rowsPerPage*(Number(querykeys.pageIndex)?Number(querykeys.pageIndex)-1:0),
          select:{
            id: true,
            name: true,
            phone: true,
            role: true,
            email: true,
            country: true,
            state: true,
            city:true
          },
          orderBy: {id: "desc"}
        })
        const result = await this.prismaService.user.findMany({
          select:{
            id: true,
            name: true,
            phone: true,
            role: true,
            email: true,
            country: true,
            state: true,
            city:true
          },
          orderBy: {id: "desc"}
        });
        const pages = Math.ceil(result.length/rowsPerPage);
        console.log("if(querykeys.pageIndex){")
        return {pages, queryResult};
      }
  
      const queryResult = await this.prismaService.user.findMany({
        select:{
          id: true,
          name: true,
          phone: true,
          role: true,
          email: true,
          country: true,
          state: true,
          city:true
        },
        orderBy:{id: "desc"}
      });
      console.log("any")
      const pages = Math.ceil(queryResult.length/rowsPerPage);
      return {pages, queryResult};

    }catch(e){
      console.log(e.message);
    }
  }

  async getFields():Promise<string[]>{
    const data = await this.prismaService.user.findFirst({
      select: {
        id: true,
        name: true,
        phone: true,
        role: true,
        email: true,
        country: true,
        state: true,
        city:true
      }
    })
    const fields: string[] = Object.keys(data);
    return fields;
  }

  async findOne(id: number) {
    try{
      return await this.prismaService.user.findFirst({
        where: {
          userid:{equals: id}
}        }
      );
    }catch(e){
      throw new Error(e.message);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try{
      const user = await this.findOne(id);
      console.log(updateUserDto.image);
      return await this.prismaService.user.update({
        data:{
          addr1: updateUserDto.addr1?updateUserDto.addr1:user.addr1?user.addr1:"N/A",
          addr2: updateUserDto.addr2?updateUserDto.addr2:user.addr2?user.addr2:"N/A",
          city: updateUserDto.city?updateUserDto.city:user.city?user.city:"N/A",
          country: updateUserDto.country?updateUserDto.country:user.country?user.country:"N/A",
          image: updateUserDto.image || user.image,
          phone: updateUserDto.phone?updateUserDto.phone:user.phone?user.phone:"N/A",
          state: updateUserDto.state?updateUserDto.state:user.state?user.state:"N/A",
          zip: updateUserDto.zip?updateUserDto.zip:user.zip?user.zip:"N/A"
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
