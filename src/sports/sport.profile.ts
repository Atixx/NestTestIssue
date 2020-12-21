import { AutoMapper, Profile, ProfileBase, mapFrom } from "nestjsx-automapper";
import { ShowSportDto } from "./dto/show-sport.dto";
import { Sport } from "./entity/sport.entity";

@Profile()
export class SportProfile extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(Sport, ShowSportDto)
      .forMember(
        (dest: ShowSportDto) => dest.sport_id,
        mapFrom((src: Sport) => src.id)
      );
  }
}
