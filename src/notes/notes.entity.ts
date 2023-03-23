import { User } from "src/users/users.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('notes')
export class Note extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({type: "varchar", nullable:false})
  note: string;

  @Column({name: 'user_id', type: "uuid", nullable: false})
  userId: string;

  @ManyToOne(type => User, users => users.id)
  @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
  user: User;

}