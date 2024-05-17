import { Injectable } from '@nestjs/common';
import { CreateSystemSettingDto } from './dto/create-system_setting.dto';
import { UpdateSystemSettingDto } from './dto/update-system_setting.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SystemSettingsService {
  constructor(private readonly prismaService: PrismaService ){}

  create(createSystemSettingDto: CreateSystemSettingDto) {
    return 'This action adds a new systemSetting';
  }

  async findAll() {
    try{
      return await this.prismaService.systemset.findFirst();
    }catch(e){
      throw new Error(e.message);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} systemSetting`;
  }

  async update(id: number, updateSystemSettingDto: UpdateSystemSettingDto) {
    try{
      const getSystemvals = await this.findAll();

      return await this.prismaService.systemset.update({
        data: {
          name: updateSystemSettingDto.name?updateSystemSettingDto.name:getSystemvals.name?getSystemvals.name:"N/A",
          abb: updateSystemSettingDto.abb?updateSystemSettingDto.abb: getSystemvals.abb?getSystemvals.abb:"N/A",
          address: updateSystemSettingDto.address?updateSystemSettingDto.address: getSystemvals.address?getSystemvals.address:"N/A",
          currency: updateSystemSettingDto.currency?updateSystemSettingDto.currency:getSystemvals.currency?getSystemvals.currency:"N/A",
          email: updateSystemSettingDto.email?updateSystemSettingDto.email:getSystemvals.email?getSystemvals.email:"N/A",
          fax: updateSystemSettingDto.fax?updateSystemSettingDto.fax:getSystemvals.fax?getSystemvals.fax:"N/A",
          footer: updateSystemSettingDto.footer?updateSystemSettingDto.footer:getSystemvals.footer?getSystemvals.footer:"N/A",
          image: updateSystemSettingDto.image || getSystemvals.image,
          map: updateSystemSettingDto.map?updateSystemSettingDto.map:getSystemvals.map?getSystemvals.map:"N/A",
          mobile: updateSystemSettingDto.mobile?updateSystemSettingDto.mobile:getSystemvals.mobile?getSystemvals.mobile:"N/A",
          sms_charges: updateSystemSettingDto.sms_charges?updateSystemSettingDto.sms_charges:getSystemvals.sms_charges?getSystemvals.sms_charges:"N/A",
          stamp: updateSystemSettingDto.stamp?updateSystemSettingDto.stamp:getSystemvals.stamp?getSystemvals.stamp:"N/A",
          timezone: updateSystemSettingDto.timezone?updateSystemSettingDto.timezone:getSystemvals.timezone?getSystemvals.timezone:"N/A",
          title: updateSystemSettingDto.title?updateSystemSettingDto.title:getSystemvals.title?getSystemvals.title:"N/A",
          website: updateSystemSettingDto.website?updateSystemSettingDto.website:getSystemvals.website?getSystemvals.website:"N/A"
        },
        where: {
          sysid: id
        }
      });
    }catch(e){
      throw new Error(e.message);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} systemSetting`;
  }
}
