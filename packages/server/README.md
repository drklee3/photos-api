# GraphQL Photos & Album API <!-- omit in toc --> 

GraphQL API for photo backup and sharable photo albums with data stored in a s3
compatible bucket. This ideally is to replace basic functionality of Google
Photos with a companion React Native app.

Still an early WIP.

## Contents

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

Seed the database (there isn't any valid useful seed data right now).

```
yarn prisma db seed
```


### 3. Start the server

Run the server

```
yarn dev
```

The server will by default listen on [http://localhost:4000](http://localhost:4000) 

