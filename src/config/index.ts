import * as dotenv from 'dotenv';
import { ROLLBAR_CONFIG_KEY } from '../rollbar/rollbar.constants';
import { DatabaseType } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { LoggerOptions } from 'typeorm/logger/LoggerOptions';

const PRODUCTION_ENV_NAME = 'production';

if (!(process.env.NODE_ENV == PRODUCTION_ENV_NAME)) { // Docker deployment must set NODE_ENV
  const filePath = '.env';
  dotenv.config({ path: filePath });
}

export class APISettings {
  name: string;
  port: number;
  database: IDatabaseSettings;
}

export class IDatabaseSettings {
  name?: string;
  type: DatabaseType;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  entities: [string];
  migrations: [string];
  migrationsRun: boolean;
  cli: {
    migrationsDir: string;
  };
  logging?: LoggerOptions;
  namingStrategy: SnakeNamingStrategy;
  maxQueryExecutionTime: number;
  synchronize?: boolean;
  dropSchema?: boolean;
}

export class RollbarConfigSettings {
  accessToken: string;
  environment: string;
}

interface AwsCommonSettings {
  access_key_id?: string;
  secret_access_key?: string;
  region: string;
}

interface AwsS3Settings {
  private_bucket_name?: string;
  api_version: string | '2006-03-01';
}

export interface AwsConfigSettings {
  common: AwsCommonSettings;
  s3: AwsS3Settings;
}

export interface Auth0AdminConfigSettings {
  domain: string;
  clientId: string;
  clientSecret: string;
  connection: string;
}

export interface SendgridConfigSettings {
  apiKey: string;
  fromEmailAddress: string;
}

// this should only return true in production, regardless of env var setting
export const checkRunMigrations = (): boolean => process.env.RUN_MIGRATIONS === 'true'
  && process.env.NODE_ENV == PRODUCTION_ENV_NAME;

const logConfig = (): LoggerOptions => process.env.NODE_ENV == PRODUCTION_ENV_NAME ? ['warn'] : 'all';

export const dbConfig: IDatabaseSettings = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'username',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'database',
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*.js'],
  migrationsRun: checkRunMigrations(),
  cli: {
    migrationsDir: 'migrations'
  },
  logging: logConfig(),
  namingStrategy: new SnakeNamingStrategy(),
  maxQueryExecutionTime: Number(process.env.LONG_QUERY_THRESHOLD) || 3000
};

export const rollbarConfig = (): Record<string, RollbarConfigSettings>  => ({
  [ROLLBAR_CONFIG_KEY]: {
    accessToken: process.env.ROLLBAR_TOKEN || '',
    environment: process.env.ROLLBAR_ENV || 'development'
  }
});


export const config: APISettings = {
  name: 'api',
  port: Number(process.env.PORT) || 3000,
  database: dbConfig
};
