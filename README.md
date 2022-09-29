# API Documentation - Praava Patient Portal

## Requirements

- node v18.9.0
- npm 8.19.12
- psql (PostgreSQL) 14.5

## Getting Started

Clone the repo:

```sh
git clone https://github.com/zahidhasanpapon/server-developer-praava.git
cd server-developer-praava
```

Install dependencies:

```js
npm install
```

## Environment Variables

Create a new file .env:

```sh
touch .env
```

Required fileds so far:

- NODE_ENV
- PORT
- PG_USER
- PG_PASSWORD
- PG_HOST
- PG_PORT
- PG_DATABASE
- JWT_SECRET_ACCESS

See .env.example file for better understanding

## Database

Create Database:

```sql
CREATE DATABASE praava_patient_portal_v2;
```

<!-- Add extension for UUID:

```sql
CREATE extension "uuid-ossp";
``` -->

Running migrations:

```js
npm run migrate:up
```

Start the server for development:

```sh
npm run dev-start
```

Ignore if you do not want to create any further migrations.

Migration Commands:

```js
node node_modules/db-migrate/bin/db-migrate
```

To create a new migration:

```js
node node_modules/db-migrate/bin/db-migrate create <migration_name> --config ./database/config/database.json
```

## Tech Stack

1.  Node.js
2.  Express
3.  PostgreSQL
4.  JsonWebToken
5.  Bcrypt
6.  CORS
7.  uuid
8.  dotenv

## API Documentation

To view the list of available APIs and their specifications, run the server and go to ``

## Logging

Import the logger from `configs/logger.js`. It is using the [Winston](https://github.com/winstonjs/winston) logging library.

Logging should be done according to the following severity levels (ascending order form most important to least important):

```javascript

```

In development mode, log messages of all severity levels will be printed to the console.
