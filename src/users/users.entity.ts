import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({type: "varchar", nullable:false})
  name: string;

  @Column({type: "varchar", nullable:false})
  password: string;
}