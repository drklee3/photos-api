# GraphQL Photos Album API

Uses the following stack:

- [**Apollo Server**](https://github.com/apollographql/apollo-server): HTTP server for GraphQL APIs   
- [**GraphQL Nexus**](https://nexusjs.org/docs/): GraphQL schema definition and resolver implementation 
- [**GraphQL Shield**](https://github.com/maticzav/graphql-shield): Authorization/permission layer for GraphQL schemas
- [**Prisma Client**](https://www.prisma.io/docs/concepts/components/prisma-client): Databases access (ORM)                  
- [**Prisma Migrate**](https://www.prisma.io/docs/concepts/components/prisma-migrate): Database migrations               
- [**PostgreSQL**](https://www.postgresql.org/)

## Contents

- [GraphQL Photos Album API](#graphql-photos-album-api)
  - [Contents](#contents)
  - [Getting Started](#getting-started)
    - [1. Install Dependencies](#1-install-dependencies)
    - [2. Create and seed the database](#2-create-and-seed-the-database)
    - [3. Start the server](#3-start-the-server)

## Getting Started

### 1. Install Dependencies

You will need a PostgreSQL database.

```bash
yarn install
```

### 2. Create and seed the database

Run migrations

```
yarn prisma migrate dev
```

Seed the database with the sample data.

```
yarn prisma db seed
```


### 3. Start the server

Run the server

```
yarn dev
```

The server will by default listen on [http://localhost:4000](http://localhost:4000) 
