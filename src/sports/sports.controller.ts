import { Controller, Get, Query, ValidationPipe } from "@nestjs/common";
import { InjectMapper, AutoMapper } from "nestjsx-automapper";
import { Pagination } from 'nestjs-typeorm-paginate';
import { FindManySportsDto } from "./dto/find-many-sports.dto";
import { ShowSportDto } from "./dto/show-sport.dto";
import { Sport } from "./entity/sport.entity";
import { SportsService } from "./sports.service";
import { DEFAULT_PAGINATION_PAGE, LIMIT_PARAM_NAME, PAGE_PARAM_NAME } from "../constants";
import { Route } from "../decorators/route.decorator";

// Sports is paginated but we need to retrieve all of them defaulty
const SPORTS_DEFAULT_LIMIT = 100;

@Controller('sports')
export class SportsController {
  constructor(
    public readonly sportService: SportsService,
    @InjectMapper() private readonly mapper: AutoMapper) { }

  @Get()
  async findMany(
    @Query(new ValidationPipe(
      { whitelist: true, skipMissingProperties: true, transform: true }
    )) params: FindManySportsDto,
      @Query(PAGE_PARAM_NAME) page: number = DEFAULT_PAGINATION_PAGE,
      @Query(LIMIT_PARAM_NAME) limit: number = SPORTS_DEFAULT_LIMIT,
      @Route() route: string
  ): Promise<Pagination<ShowSportDto>> {
    const sports = await this.sportService.find(params, { page, limit, route });

    return { // TODO: We must use generics to extract the serialization logic.
      ...sports,
      items: this.mapper.mapArray(sports.items, ShowSportDto, Sport)
    };
  }
}
