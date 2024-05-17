import { Prisma } from "@prisma/client";
export class SystemSetting implements Prisma.systemsetCreateInput {
    abb: string;
    address: string;
    currency: string;
    email: string;
    fax: string;
    footer: string;
    image: string;
    map: string;
    mobile: string;
    name: string;
    sms_charges: string;
    stamp: string;
    timezone: string;
    title: string;
    website: string;
}
