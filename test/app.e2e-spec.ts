import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { APISettings, IDatabaseSettings } from '../src/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const TestDBSettings: IDatabaseSettings = {
  name: 'testing',
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'bn_api_testing',
  password: 'bn_api_testing',
  database: 'bn_api_testing',
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*.js'],
  migrationsRun: true,
  cli: {
    migrationsDir: 'migrations'
  },
  namingStrategy: new SnakeNamingStrategy(),
  maxQueryExecutionTime: 3000,
  dropSchema: true,
};

const testConfig: APISettings = {
  name: 'TestSettings',
  port: 3001,
  database: TestDBSettings
};

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [await AppModule.forRoot(testConfig)]
    }).compile();

    app = await moduleFixture.createNestApplication();

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', async () => await request(app.getHttpServer())
    .get('/')
    .expect(404));

  describe('/sports', () => {
    it('returns sports list paginated', async () => {
      const req = await request(app.getHttpServer());

      console.log(req);

      return req
        .get('/api/v1/sports/')
        .expect(200);
    });
  });
});
