import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataBaseSource } from './config/database.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DataBaseSource,
    }),
  ],
})
export class DatabaseModule {}
