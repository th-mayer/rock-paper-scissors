# How to use the Database

## Make the Databse work

To make the database work, you need a ``.env`` file at the root of the server project. This file needs to contain the following: 
``"DATABASE_URL="file:./dev.db"``

## How to migrate the Database

- after changing something in the ``schema.prisma`` file, the db needs to be migrated
- use this command: ``prisma migrate dev --name <<name of the migration>>``
- a new ``migration.sql`` file will appear in the prisma/migrations directory

Further details: <https://www.prisma.io/docs/orm/prisma-migrate/getting-started>
