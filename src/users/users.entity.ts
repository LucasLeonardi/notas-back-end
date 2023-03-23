import { Note } from "src/notes/notes.entity";
import { BaseEntity, Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({type: "varchar", nullable:false})
  name: string;

  @Column({type: "varchar", nullable:false})
  password: string;

  @OneToMany(type => Note, notes => notes.id)
  @JoinColumn({name: 'notes', referencedColumnName: 'id'})
  notes: Note[];
}