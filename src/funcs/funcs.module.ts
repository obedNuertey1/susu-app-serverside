import { Module } from '@nestjs/common';
import { RandomizeService } from './randomize/randomize.service';

@Module({
    providers: [RandomizeService],
    exports: [RandomizeService]
})
export class FuncsModule {}
