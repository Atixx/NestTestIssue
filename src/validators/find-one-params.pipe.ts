import { ParseIntPipe } from '@nestjs/common';
import { IsNumberString } from 'class-validator';

export class FindOneParams extends ParseIntPipe{
  @IsNumberString()
  id: number;
}
