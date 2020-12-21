import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Sport } from "./entity/sport.entity";
import { SportsController } from "./sports.controller";
import { SportsService } from "./sports.service";

// Module level profile imports

@Module({
  imports: [TypeOrmModule.forFeature([Sport])],
  providers: [SportsService],
  exports: [],
  controllers: [SportsController]
})

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class SportsModule { }
