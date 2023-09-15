import { Column, Entity } from 'typeorm';
import { EntityBase } from './commons/entity.base';

@Entity()
export class User extends EntityBase {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  birthday: Date;

  @Column()
  gender: 'man' | 'woman';
}
