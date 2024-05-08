import { Prisma } from "@prisma/client";
export class User implements Prisma.userCreateInput {
    id: string;
    addr1: string;
    addr2: string;
    city: string;
    comment: string;
    country: string;
    email: string;
    image: string;
    name: string;
    password: string;
    phone: string;
    role: string;
    state: string;
    username: string;
    zip: string;
}
