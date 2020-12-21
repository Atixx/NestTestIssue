import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

import { MigrationExecutor, createConnection } from 'typeorm';
import { config, checkRunMigrations, dbConfig } from './config';

async function runServer(): Promise<void> {

  const typeOrmConnection = await createConnection({
    ...dbConfig,
    migrationsRun: false,
    type: 'postgres'
  });

  const migrations = await new MigrationExecutor(typeOrmConnection, typeOrmConnection.createQueryRunner('master'))
    .getPendingMigrations();

  if (migrations.length > 0) {
    if (checkRunMigrations()) {
      Logger.log('Migrations are pending and will be run');
    } else {
      await typeOrmConnection.close(); // TODO: check if this is needed, not sure how typeOrm handles connection pools and might maintain them open hanging the DB
      return Promise.reject("Migrations are pending and will not run, make sure you run 'npm run migration:run'");
    }
  }
  await typeOrmConnection.close();

  const app = await NestFactory.create(AppModule.forRoot(config));

  app.setGlobalPrefix('api/v1');

  app.enableCors();
  await app.listen(config.port || 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

runServer().catch(
  (error: unknown) => Logger.error(error)
);
