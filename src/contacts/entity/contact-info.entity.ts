import { IsEmail, IsUrl, IsString, IsPhoneNumber, IsOptional } from "class-validator";
import { Column } from "typeorm";

export class ContactInfo {

  @Column({
    type: String,
    nullable: true
  })
  @IsEmail()
  @IsOptional()
  email: string;

  @Column({
    type: String,
    nullable: true
  })
  @IsString()
  @IsPhoneNumber('US')
  @IsOptional()
  phone: string;

  @Column({
    type: String,
    nullable: true
  })
  @IsUrl()
  @IsOptional()
  website: string;

  minimumFieldsCompleted(): boolean {
    return this.email ? true : false;
  }
}
