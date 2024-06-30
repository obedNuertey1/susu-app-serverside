import { Injectable } from '@nestjs/common';
import { CreateBorrowerDto } from './dto/create-borrower.dto';
import { UpdateBorrowerDto } from './dto/update-borrower.dto';
import { Borrower } from './entities/borrower.entity';
import { PrismaService } from 'src/prisma.service';
import { BorrowerSearchDto } from './dto/borrower-search.dto';
import { SearchAndPagination } from './search_and_pagination/search_and_pagination';
import { RandomizeService } from 'src/funcs/randomize/randomize.service';

@Injectable()
export class BorrowersService {


  constructor(private prismaService: PrismaService, private readonly searchAndPagination: SearchAndPagination, private readonly randomizeService: RandomizeService){}

  async create(createBorrowerDto: CreateBorrowerDto) {

    try{
      let newAccountNum:string = await this.getFieldIncreaseBy1(this.prismaService.borrowers, "id");
      return await this.prismaService.borrowers.create({
        data: {
          account: `${newAccountNum}`,
          fname: createBorrowerDto.fname || "N/A",
          lname: createBorrowerDto.lname || "N/A",
          addrs1: createBorrowerDto.addrs1 || "N/A",
          city: createBorrowerDto.city || "N/A",
          state: createBorrowerDto.state || "N/A",
          zip: createBorrowerDto.zip || "N/A",
          country: createBorrowerDto.country || "GH",
          email: createBorrowerDto.email || "N/A",
          comment: createBorrowerDto.comment || "N/A",
          image: createBorrowerDto.image || "N/A",
          addrs2: createBorrowerDto.addrs2 || "N/A",
          balance: createBorrowerDto.balance || 0,
          phone: createBorrowerDto.phone || "N/A",
          status: createBorrowerDto.status || "pending"
        },
        select:{
          account: true,
          fname: true,
          lname: true,
          addrs1: true,
          city: true,
          state: true,
          zip: true,
          country: true,
          email: true,
          comment: true,
          image: true,
          addrs2: true,
          balance: true,
          phone: true,
          status: true
        }
      })

    }catch(e){
      throw new Error(e.message);
    }
  }

  async getFieldIncreaseBy1(handler:any, field:string ):Promise<string>{
    try{
      const {_max} = await handler.aggregate({
        orderBy:{
          [field]: 'desc'
        },
        take: 1,
        select: {
          _max: true
        }
      })
      

      
      console.log("I am a radom text= ", await this.randomizeService.generate(8));
      // console.log("result",testResult['_max']);
      console.log(_max);
      
      if(field == 'id'){
        let raw = _max[field];
        if(Boolean(raw) || raw > 0){
          console.log('raw',raw);
          let newResult = `BOR${raw+1}${await this.randomizeService.generate(5)}`;
          return `${newResult}`;
        }

        let newResult = `BOR${1}${await this.randomizeService.generate(5)}`;
        return `${newResult}`;
      }
      // return await this.randomizeService.generate(5)
    }catch(e){
      throw new Error(e.message);
    }
  }


  async findAll(querykeys:BorrowerSearchDto) {
    const rowsPerPage = Number(querykeys.rowsPerPage || 20);
    try{

      if(querykeys.pageIndex && querykeys.searchQuery && querykeys.searchKey){
       
        const getallFields = await this.getFields();
        const getdata = await this.prismaService.borrowers.findMany({orderBy: {id: 'desc'}});
        const myResult = await this.searchAndPagination.funcs(getallFields, getdata, rowsPerPage, querykeys.searchQuery, querykeys.searchKey, querykeys.pageIndex, "by-key")
        return myResult;
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
      const pages = Math.ceil(queryResult.length/rowsPerPage);
      return {pages, queryResult};
    }catch(e){console.error(e.message)}
  }

  async updateWithAccountNum(num:string, updateBorrowerDto:UpdateBorrowerDto){
    try{
      const borrower = await this.findOneWithAccountNum(num);
      return await this.prismaService.borrowers.update({
        data:{
          addrs1: updateBorrowerDto.addrs1?updateBorrowerDto.addrs1:borrower.addrs1?borrower.addrs1:"N/A",
          addrs2: updateBorrowerDto.addrs2?updateBorrowerDto.addrs2:borrower.addrs2?borrower.addrs2:"N/A",
          city: updateBorrowerDto.city?updateBorrowerDto.city:borrower.city?borrower.city:"N/A",
          comment: updateBorrowerDto.comment?updateBorrowerDto.comment:borrower.comment?borrower.comment:"N/A",
          fname: updateBorrowerDto.fname?updateBorrowerDto.fname:borrower.fname?borrower.fname:"N/A",
          country: updateBorrowerDto.country?updateBorrowerDto.country:borrower.country?borrower.country:"N/A",
          email: updateBorrowerDto.email?updateBorrowerDto.email:borrower.email?borrower.email:"N/A",
          image: updateBorrowerDto.image?updateBorrowerDto.image:borrower.image?borrower.image:"N/A",
          lname: updateBorrowerDto.lname?updateBorrowerDto.lname:borrower.lname?borrower.lname:"N/A",
          phone: updateBorrowerDto.phone?updateBorrowerDto.phone:borrower.phone?borrower.phone:"N/A",
          state: updateBorrowerDto.state?updateBorrowerDto.state:borrower.state?borrower.state:"N/A",
          status: updateBorrowerDto.status?updateBorrowerDto.status:borrower.status?borrower.status:"N/A",
          zip:updateBorrowerDto.zip?updateBorrowerDto.zip:borrower.zip?borrower.zip:"N/A"
        },
        where:{
          id: borrower.id
        }
      })
    }catch(e){
      console.log(e.message);
      throw new Error(e.message);
    }
  }

  async findOne(borrowerId: number):Promise<Borrower> {
    return await this.prismaService.borrowers.findFirst({
      where:{
        id: {equals: Number(borrowerId)}
      }
    });
  }

  async deleteWithAccountNum(num:string){
    return await this.prismaService.borrowers.deleteMany({
      where:{
        account: {equals: num}
      }
    })
  }

  async findOneWithAccountNum(borrowerAccountNum: string){
    return await this.prismaService.borrowers.findFirst({
      where:{
        account: {equals: borrowerAccountNum}
      }
    })
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
