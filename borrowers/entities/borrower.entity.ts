import { Prisma } from "@prisma/client";
import { DecimalJsLike } from "@prisma/client/runtime/library";

export class Borrower implements Prisma.borrowersCreateInput{
    id:number;
    fname: string;
    lname: string;
    email: string;
    phone: string;
    addrs1: string;
    addrs2: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    comment: string;
    account: string;
    balance: string | number | Prisma.Decimal | DecimalJsLike;
    image?: string;
    date_time: Date;
    status: string;
}
