import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User.entity';

@Entity({ name: 'user_posts' })
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.posts, {
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT', // si tengo un usuario con post ya creados y tengo esta propiedad en RESTRICT significa que si el user se actualiza y tiene post asociados , no actualizo lo nuevo de post q traiga,lanzo un error ,en caso contrario poner cascade y si se podra, siempre deberia ser restrict a mi entender
  })
  user: User;
}
