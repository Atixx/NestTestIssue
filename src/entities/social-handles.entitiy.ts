import { IsOptional, IsString } from "class-validator";
import { Column } from "typeorm";

export class SocialHandles {

  @Column({
    type: String,
    nullable: true
  })
  @IsString()
  @IsOptional()
  facebookUser: string;

  @Column({
    type: String,
    nullable: true
  })
  @IsString()
  @IsOptional()
  twitterUser: string;

  @Column({
    type: String,
    nullable: true
  })
  @IsString()
  @IsOptional()
  instagramUser: string;
}
