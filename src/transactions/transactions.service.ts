import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from 'src/prisma.service';
import { uid } from 'uid';
import { TransactionsSearchDto } from './dto/transactions-search-dto';
import { SearchAndPagination } from './search_and_pagination/search_and_pagination';

@Injectable()
export class TransactionsService {
  constructor(private readonly prismaService: PrismaService, private readonly searchAndPagination: SearchAndPagination){}


  getMaxId(){

  }

  async findAllTx(querykeys:TransactionsSearchDto){
    const rowsPerPage = Number(querykeys.rowsPerPage || 20);
    try{
      if(querykeys.pageIndex && querykeys.searchQuery && querykeys.searchKey){
        const getallFields = await this.getFields();
        const getdata = await this.prismaService.transaction.findMany({
          orderBy: {id: 'desc'}
        });
        const myResult = await this.searchAndPagination.transactionFunc(getallFields, getdata, rowsPerPage, querykeys.searchQuery, querykeys.searchKey, querykeys.pageIndex, "by-key")
        return myResult;
      }

      if(querykeys.pageIndex && querykeys.searchQuery){
        
        const getallFields = await this.getFields();
        const getdata = await this.prismaService.transaction.findMany({orderBy: {id: 'desc'}});

        const myResult = await this.searchAndPagination.transactionFunc(getallFields, getdata, rowsPerPage, querykeys.searchQuery, querykeys.searchKey, querykeys.pageIndex, "for-all")
        return myResult;
      }

      if(querykeys.pageIndex){
        const queryResult = await this.prismaService.transaction.findMany({
          take: rowsPerPage,
          skip: rowsPerPage*(Number(querykeys.pageIndex)?Number(querykeys.pageIndex)-1:0),
          select:{
        id: true,
        txid: true,
        t_type: true,
        acctno: true,
        amount: true,
        fn: true,
        phone: true,
        username: true,
        isSync: true,
        date_time: true
      },
          orderBy: {id: "desc"}
        })
        const result = await this.prismaService.transaction.findMany({
          select:{
        id: true,
        txid: true,
        t_type: true,
        acctno: true,
        amount: true,
        fn: true,
        phone: true,
        username: true,
        isSync: true,
        date_time: true
      },
          orderBy: {id: "desc"}
        });
        const pages = Math.ceil(result.length/rowsPerPage);
        console.log("if(querykeys.pageIndex){")
        return {pages, queryResult};
      }
  
      const queryResult = await this.prismaService.transaction.findMany({
        select:{
          id: true,
          txid: true,
          t_type: true,
          acctno: true,
          amount: true,
          fn: true,
          phone: true,
          username: true,
          isSync: true,
          date_time: true
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

  async create(createTransactionDto: CreateTransactionDto) {

    try{
      return this.prismaService.transaction.create({
        data:{
          id:createTransactionDto.id,
          acctno: createTransactionDto.acctno || "",
          amount: createTransactionDto.amount || "",
          email: createTransactionDto.email || "_@_",
          fn: createTransactionDto.fn || "",
          ln: createTransactionDto.ln || "",
          phone: createTransactionDto.phone || "",
          t_type: createTransactionDto.t_type || "Deposit",
          txid: `TXID-${uid()}`,
          username: createTransactionDto.username || "Agent B",//login username
          isSync: createTransactionDto.isSync || ((process.env.IS_SYNC == 'true')?true:false)
        },
        select: {id:true, acctno: true, email:true, amount: true, date_time: true, txid:true}
      });

    }catch(e){
      console.error(e.message);
    }
  }

  async getFields():Promise<string[]>{
    const data = await this.prismaService.transaction.findFirst({
      select: {
        id: true,
        txid: true,
        t_type: true,
        acctno: true,
        amount: true,
        fn: true,
        phone: true,
        username: true,
        isSync: true,
        date_time: true
      }
    });
    const fields:string[] = Object.keys(data);
    return fields;
  }

  async findAll() {
    return this.prismaService.transaction.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
