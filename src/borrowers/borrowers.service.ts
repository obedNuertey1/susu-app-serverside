import { Injectable } from '@nestjs/common';
import { CreateBorrowerDto } from './dto/create-borrower.dto';
import { UpdateBorrowerDto } from './dto/update-borrower.dto';
import { Borrower } from 'borrowers/entities/borrower.entity';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BorrowersService {

  constructor(private prismaService: PrismaService){}

  create(createBorrowerDto: CreateBorrowerDto) {
    return 'This action adds a new borrower';
  }

  async findAll():Promise<Borrower[]> {
    return await this.prismaService.borrowers.findMany()
  }

  findOne(id: number) {
    return `This action returns a #${id} borrower`;
  }

  update(id: number, updateBorrowerDto: UpdateBorrowerDto) {
    return `This action updates a #${id} borrower`;
  }

  remove(id: number) {
    return `This action removes a #${id} borrower`;
  }
}
