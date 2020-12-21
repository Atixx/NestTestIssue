import { Transform, Type } from "class-transformer";
import { IsArray, IsNumberString, IsOptional } from "class-validator";

export class FindManySportsDto {

  @IsOptional()
  @IsArray()
  @IsNumberString({ no_symbols: true }, { each: true })
  @Type(() => String)
  @Transform((value: string) => value.split(','))
  ids: number[];
}
