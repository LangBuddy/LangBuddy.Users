import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { join } from 'path';

@Injectable()
export class DataBaseSource implements TypeOrmOptionsFactory {
  constructor(private readonly config: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.config.get('DATABASE_HOST'),
      port: this.config.get('DATABASE_PORT'),
      username: this.config.get('DATABASE_USERNAME'),
      password: this.config.get('DATABASE_PASSWORD'),
      database: this.config.get('DATABASE_NAME'),
      schema: this.config.get('DATABASE_SCHEMA'),
      logging: true,
      synchronize: true,
      entities: [
        join(
          process.cwd(),
          'dist',
          'database',
          'entities',
          '**',
          '*.entity.js',
        ),
      ],
    };
  }
}
