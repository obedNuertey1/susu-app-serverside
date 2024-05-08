import { Prisma } from "@prisma/client";
import { DecimalJsLike } from "@prisma/client/runtime/library";
export class Transaction implements Prisma.transactionCreateInput{
    id:number;
    txid: string;
    t_type: string;
    acctno: string;
    fn: string;
    ln: string;
    email: string;
    phone: string;
    amount: string | number | Prisma.Decimal | DecimalJsLike;
    date_time?: string | Date;
    username?: string;
    isSync?: boolean;
}