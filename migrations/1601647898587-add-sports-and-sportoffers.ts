import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class addSportsAndSportOffers1601647898587 implements MigrationInterface {
  name: string = 'addSportsAndSportOffers1601647898587';

  public async up(queryRunner: QueryRunner): Promise<void> {

    await queryRunner.createTable(new Table({
      name: 'sports',
      columns: [
        {
          name: 'id',
          type: 'serial',
          isPrimary: true,
          isNullable: false,
        },
        {
          name: 'name',
          type: 'varchar',
          isNullable: false
        },
        {
          name: 'is_team_sport',
          type: 'bool',
          isNullable: false
        },
        {
          name: 'logo_url',
          type: 'varchar',
          isNullable: true
        },
        {
          name: 'created_at',
          type: 'timestamp with time zone',
          isNullable: false,
          default: 'now()'
        },
        {
          name: 'updated_at',
          type: 'timestamp with time zone',
          isNullable: false,
          default: 'now()'
        },
        {
          name: 'deleted_at',
          type: 'timestamp with time zone',
          isNullable: true
        }
      ]
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('sports');
  }
}
