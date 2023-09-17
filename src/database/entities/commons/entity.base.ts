import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class EntityBase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  createDate: Date;

  @Column({
    nullable: true,
  })
  updateDate?: Date;

  @Column({
    nullable: true,
  })
  deleteDate?: Date;

  setCreateDate() {
    this.createDate = new Date();
  }

  setUpdateDate() {
    this.updateDate = new Date();
  }

  setDeleteDate() {
    this.deleteDate = new Date();
  }
}
