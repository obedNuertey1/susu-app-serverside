import { Injectable } from '@nestjs/common';
import { CreateBorrowerDto } from './dto/create-borrower.dto';
import { UpdateBorrowerDto } from './dto/update-borrower.dto';
import { Borrower } from './entities/borrower.entity';
import { PrismaService } from 'src/prisma.service';
import { BorrowerSearchDto } from './dto/borrower-search.dto';
import { SearchAndPagination } from './search_and_pagination/search_and_pagination';

@Injectable()
export class BorrowersService {

  constructor(private prismaService: PrismaService, private readonly searchAndPagination: SearchAndPagination){}

  create(createBorrowerDto: CreateBorrowerDto) {
    return 'This action adds a new borrower';
  }

  async findAll(querykeys:BorrowerSearchDto) {
    const rowsPerPage = Number(querykeys.rowsPerPage || 20);
    try{

      if(querykeys.pageIndex && querykeys.searchQuery && querykeys.searchKey){
       
        const getallFields = await this.getFields();
        const getdata = await this.prismaService.borrowers.findMany({orderBy: {id: 'desc'}});
        const myResult = await this.searchAndPagination.funcs(getallFields, getdata, rowsPerPage, querykeys.searchQuery, querykeys.searchKey, querykeys.pageIndex, "by-key")

      }
  
      if(querykeys.pageIndex && querykeys.searchQuery){
        
        const getallFields = await this.getFields();
        const getdata = await this.prismaService.borrowers.findMany({orderBy: {id: 'desc'}});
        const myResult = await this.searchAndPagination.funcs(getallFields, getdata, rowsPerPage, querykeys.searchQuery, querykeys.searchKey, querykeys.pageIndex, "for-all")
        return myResult;
      }
  
      if(querykeys.pageIndex){
        const queryResult = await this.prismaService.borrowers.findMany({
          take: rowsPerPage,
          skip: rowsPerPage*(Number(querykeys.pageIndex)?Number(querykeys.pageIndex)-1:0),
          select:{
            id: true,
            fname: true,
            account: true,
            phone: true,
            date_time: true,
            country: true,
            status: true,
          },
          orderBy: {id: "desc"}
        })
        const result = await this.prismaService.borrowers.findMany({
          select:{
            id: true,
            fname: true,
            account: true,
            phone: true,
            date_time: true,
            country: true,
            status: true,
          },
          orderBy: {id: "desc"}
        });
        const pages = Math.ceil(result.length/rowsPerPage);
        console.log("if(querykeys.pageIndex){")
        return {pages, queryResult};
      }
  
      const queryResult = await this.prismaService.borrowers.findMany({
        select:{
          id: true,
          fname: true,
          account: true,
          phone: true,
          date_time: true,
          country: true,
          status: true,
        },
        orderBy:{id: "desc"}
      });
      console.log("any")
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

  async getAccountNumber(num: string){
    return await this.prismaService.borrowers.findFirst({
      where:{
        account: {equals: num}
      }
    })
  }

  async getFields():Promise<string[]>{
    const data = await this.prismaService.borrowers.findFirst({
      select:{
        id: true,
        fname: true,
        account: true,
        phone: true,
        date_time: true,
        country: true,
        status: true,
      }
    });
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
