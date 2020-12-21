import { validateOrReject } from "class-validator";
import { AutoMap } from "nestjsx-automapper";
import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, BeforeUpdate,
  BeforeInsert } from "typeorm";

export abstract class Base {

  @PrimaryGeneratedColumn()
  @AutoMap() // TODO: Remove once we implement external IDs on org (unless needed elsewhere)
  id: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp with time zone',
    nullable: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp with time zone',
    nullable: false,
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp with time zone',
  })
  deletedAt: Date;

  // HOOKS
  @BeforeInsert()
  @BeforeUpdate()
  async validate(): Promise<void> {
    return validateOrReject(this);
  }
}
