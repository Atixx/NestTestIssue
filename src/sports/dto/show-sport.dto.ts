import { AutoMap } from "nestjsx-automapper";

export class ShowSportDto {

  @AutoMap()
  sport_id: number;

  @AutoMap()
  name: string;

  @AutoMap()
  is_team_sport: string;

  @AutoMap()
  logo_url: string;
}
