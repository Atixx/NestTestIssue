import { AutoMap } from "nestjsx-automapper";
import { Base } from "../../entities/base.entity";
import { Column, Entity } from "typeorm";

@Entity({ name: 'sports' })
export class Sport extends Base {

  @Column({
    type: String,
    nullable: false
  })
  @AutoMap()
  name: string;

  @Column({
    name: 'is_team_sport',
    type: Boolean,
    nullable: false
  })
  @AutoMap()
  isTeamSport: boolean;

  @Column({
    type: String,
    nullable: true
  })
  @AutoMap()
  logoUrl: string;
}
