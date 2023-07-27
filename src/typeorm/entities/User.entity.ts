import {
  Column,
  Entity, JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { Profile } from './Profile.entity';
import { Post } from './Post.entity';
import { Group } from './group.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  createdAt: Date;

  @Column({ nullable: true })
  authStrategy: string;

  @OneToOne(() => Profile, (profile) => profile.user, {
    eager: true,
    cascade: true,
  })
  profile: Profile;

  @OneToMany(() => Post, (post) => post.user, { eager: true, cascade: true })
  posts: Post[];

  @ManyToMany(() => Group, (group) => group.users, {
    eager: true,
    cascade: true,
  })
  @JoinTable({
    name: 'user_groups',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'group_id',
      referencedColumnName: 'id',
    },
  })
  groups: Group[];
}
