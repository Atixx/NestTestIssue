## Description

Repo for typeorm module connection issue.

Steps to reproduce:

create a database called `api_testing` with owner `api_testing` with password `api_testing` (or change configuration in app.e2e-spec.ts).

run `npm run test:e2e`

### To verify the app is working working correctly:

Setup .env file with values as in the example (can be used same as testing values).

run `npm run build`
run `npm run migration:run`
run `npm run start:dev` and verify server is running (you can check endpoint at `api/v1/sports` for empty paginated response).
