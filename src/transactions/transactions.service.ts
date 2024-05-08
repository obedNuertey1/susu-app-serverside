import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from 'src/prisma.service';
import { uid } from 'uid';

@Injectable()
export class TransactionsService {
  constructor(private readonly prismaService: PrismaService){}


  getMaxId(){

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
          isSync: createTransactionDto.isSync || false
        },
        select: {id:true, acctno: true, email:true, amount: true, date_time: true, txid:true}
      });

    }catch(e){
      console.error(e.message);
    }
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
