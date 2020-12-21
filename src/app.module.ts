import { DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';
import { AutomapperModule, CamelCaseNamingConvention, SnakeCaseNamingConvention } from 'nestjsx-automapper';
import { APISettings, rollbarConfig } from './config';
import { SportsModule } from './sports/sports.module';
import { KnownErrorFilter } from './errors/filters/known-error.filter';
import { RollbarModule } from './rollbar/rollbar.module';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health/health.controller';

// We need to import the profile so Nest runs the constructor, see https://automapper.netlify.app/docs/nest
// and https://stackoverflow.com/questions/61461133/using-profiles-with-nestjsx-automapper-in-nest-js
// App level profile imports, consider moving these as we expand
import './sports/sport.profile';

export class AppModule { // eslint-disable-line @typescript-eslint/no-extraneous-class
  static forRoot(settings: APISettings): DynamicModule {
    return {
      module: AppModule,
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres', // need to specify this due to wierd error in DatabaseType being wrong
          name: settings.database.name,
          host: settings.database.host,
          port: settings.database.port,
          username: settings.database.username,
          password: settings.database.password,
          database: settings.database.database,
          entities: settings.database.entities,
          migrations: settings.database.migrations,
          cli: settings.database.cli,
          migrationsRun: settings.database.migrationsRun,
          logging: settings.database.logging,
          namingStrategy: settings.database.namingStrategy,
          maxQueryExecutionTime: settings.database.maxQueryExecutionTime,
          dropSchema: settings.database.dropSchema,
        }),
        AutomapperModule.withMapper({
          sourceNamingConvention: CamelCaseNamingConvention,
          destinationNamingConvention: SnakeCaseNamingConvention
        }),
        TerminusModule,
        SportsModule,
        ConfigModule.forRoot({
          load: [
            rollbarConfig,
          ],
          isGlobal: true
        }),
        RollbarModule,
      ],
      controllers: [HealthController],
      providers: [
        {
          provide: APP_FILTER,
          useClass: KnownErrorFilter,
        },
      ]
    };
  }
}
