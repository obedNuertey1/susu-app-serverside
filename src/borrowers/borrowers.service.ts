import { Injectable } from '@nestjs/common';
import { CreateBorrowerDto } from './dto/create-borrower.dto';
import { UpdateBorrowerDto } from './dto/update-borrower.dto';
import { Borrower } from './entities/borrower.entity';
import { PrismaService } from 'src/borrowers/prisma.service';
import { BorrowerSearchDto } from './dto/borrower-search.dto';

@Injectable()
export class BorrowersService {

  constructor(private prismaService: PrismaService){}

  create(createBorrowerDto: CreateBorrowerDto) {
    return 'This action adds a new borrower';
  }

  async findAll(querykeys:BorrowerSearchDto) {
    const rowsPerPage = Number(querykeys.rowsPerPage || 20);
    try{

      if(querykeys.pageIndex && querykeys.searchQuery && querykeys.searchKey){
        const queryResult = await this.prismaService.borrowers.findMany({
          where:{
            [querykeys.searchKey]: {contains: (querykeys.searchQuery).toLowerCase()}
          },
          take: rowsPerPage,
          skip: rowsPerPage*(Number(querykeys.pageIndex)?Number(querykeys.pageIndex)-1:0),
        })
        const result = await this.prismaService.borrowers.findMany({
          where:{
            [querykeys.searchKey]: {contains: (querykeys.searchQuery).toLowerCase()}
          }
        });
        const pages = Math.ceil((result.length)/rowsPerPage);
        return {pages, queryResult};
      }
  
      if(querykeys.pageIndex && querykeys.searchQuery){
        const queryResult =  await this.prismaService.borrowers.findMany({
          where:{
            OR:[{fname: {contains: (querykeys.searchQuery).toLowerCase()}}, {lname: {contains: (querykeys.searchQuery).toLowerCase()}}, {email: {contains: (querykeys.searchQuery).toLowerCase()}}, {phone: {contains: (querykeys.searchQuery).toLowerCase()}}, {addrs1: {contains: (querykeys.searchQuery).toLowerCase()}}, {addrs2: {contains: (querykeys.searchQuery).toLowerCase()}}, {city: {contains: (querykeys.searchQuery).toLowerCase()}}, {id: {equals: Boolean(Number((querykeys.searchQuery).toLowerCase()))?Number(querykeys.searchQuery):0}}, {state: {contains: (querykeys.searchQuery).toLowerCase()}}, {zip: {contains: (querykeys.searchQuery).toLowerCase()}}, {country: {contains: (querykeys.searchQuery).toLowerCase()}}, {comment: {contains: (querykeys.searchQuery).toLowerCase()}}, {account: {contains: (querykeys.searchQuery).toLowerCase()}}, 
              {image: {contains: (querykeys.searchQuery).toLowerCase()}}, {status: {contains: (querykeys.searchQuery).toLowerCase()}}]
          },
          take: rowsPerPage,
          skip: rowsPerPage*(Number(querykeys.pageIndex)?Number(querykeys.pageIndex)-1:0),
        })
  
        const result = await this.prismaService.borrowers.findMany({
          where:{
            OR:[{fname: {contains: (querykeys.searchQuery).toLowerCase()}}, {lname: {contains: (querykeys.searchQuery).toLowerCase()}}, {email: {contains: (querykeys.searchQuery).toLowerCase()}}, {phone: {contains: (querykeys.searchQuery).toLowerCase()}}, {addrs1: {contains: (querykeys.searchQuery).toLowerCase()}}, {addrs2: {contains: (querykeys.searchQuery).toLowerCase()}}, {city: {contains: (querykeys.searchQuery).toLowerCase()}}, {id: {equals: Boolean(Number((querykeys.searchQuery).toLowerCase()))?Number(querykeys.searchQuery):0}}, {state: {contains: (querykeys.searchQuery).toLowerCase()}}, {zip: {contains: (querykeys.searchQuery).toLowerCase()}}, {country: {contains: (querykeys.searchQuery).toLowerCase()}}, {comment: {contains: (querykeys.searchQuery).toLowerCase()}}, {account: {contains: (querykeys.searchQuery).toLowerCase()}}, 
              {image: {contains: (querykeys.searchQuery).toLowerCase()}}, {status: {contains: (querykeys.searchQuery).toLowerCase()}}]
          }
        })
        const pages = Math.ceil(result.length/rowsPerPage);
        return {pages, queryResult};
      }
  
      if(querykeys.pageIndex){
        const queryResult = await this.prismaService.borrowers.findMany({
          take: rowsPerPage,
          skip: rowsPerPage*(Number(querykeys.pageIndex)?Number(querykeys.pageIndex)-1:0),
        })
        const result = await this.prismaService.borrowers.findMany();
        const pages = Math.ceil(result.length/rowsPerPage);
        return {pages, queryResult};
      }
  
      const queryResult = await this.prismaService.borrowers.findMany();
      const pages = Math.ceil(queryResult.length/rowsPerPage);
      return {pages, queryResult};
    }catch(e){console.error(e.message)}
  }

  async findOne(borrowerId: number):Promise<Borrower> {
    return await this.prismaService.borrowers.findFirst({
      where:{
        id: {equals: Number(borrowerId)}
      }
    });
  }

  async getFields():Promise<string[]>{
    const data = await this.prismaService.borrowers.findFirst();
    const fields:string[] = Object.keys(data);
    return fields;
  }

  update(id: number, updateBorrowerDto: UpdateBorrowerDto) {
    return `This action updates a #${id} borrower`;
  }

  remove(id: number) {
    return `This action removes a #${id} borrower`;
  }
}
