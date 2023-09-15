import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class EntityBase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  createDate: Date;

  @Column()
  updateDate: Date;

  @Column()
  deleteDate: Date;

  setCreateDate() {
    this.createDate = new Date();
  }

  setUpdateDate() {
    this.createDate = new Date();
  }

  setDeleteDate() {
    this.createDate = new Date();
  }
}
