import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { FindManySportsDto } from "./dto/find-many-sports.dto";
import { Sport } from "./entity/sport.entity";

@Injectable()
export class SportsService {
  constructor(
    @InjectRepository(Sport)
    private readonly sportsRepository: Repository<Sport>
  ) { }

  find(params: FindManySportsDto, options: IPaginationOptions): Promise<Pagination<Sport>> {
    const query = this.sportsRepository.createQueryBuilder('sport');

    if(params.ids) query.andWhereInIds(params.ids);
    return paginate<Sport>(query, options);
  }
}
