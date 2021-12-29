# Picatch v2 <!-- omit in toc --> 

React Native App & GraphQL API for photo backup and sharable photo albums with
data stored in a s3 compatible bucket. This ideally is to replace basic
functionality of Google Photos with a companion React Native app.

Still an early WIP.

## Stack

## Frontend

- React Native via Expo
- NativeBase

### Backend

- Express.js
- [**Apollo Server**](https://github.com/apollographql/apollo-server): HTTP server for GraphQL APIs
- [**GraphQL Nexus**](https://nexusjs.org/docs/): GraphQL schema definition and resolver implementation 
- [**GraphQL Shield**](https://github.com/maticzav/graphql-shield): Authorization/permission layer for GraphQL schemas
- [**Prisma Client**](https://www.prisma.io/docs/concepts/components/prisma-client): Databases access (ORM)
- [**Prisma Migrate**](https://www.prisma.io/docs/concepts/components/prisma-migrate): Database migrations
- [**PostgreSQL**](https://www.postgresql.org/)
