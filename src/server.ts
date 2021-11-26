import { createContext } from './context'
import schema from './schema/schema'
import { ApolloServer, ApolloServerExpressConfig } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import express from 'express'
import http from 'http'

import { registerMiddlewares } from './middleware'
import { buildContext } from 'graphql-passport'
import prisma from './prisma'
import { graphqlUploadExpress } from 'graphql-upload'

async function main() {
  const app = express()

  app.use(graphqlUploadExpress())
  registerMiddlewares(app)

  const httpServer = http.createServer(app)
  const server = new ApolloServer({
    schema,
    context: ({ req, res }) => buildContext({ req, res, prisma }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })

  await server.start()

  server.applyMiddleware({
    app,
    cors: {
      origin: 'https://studio.apollographql.com',
      credentials: true,
    },
  })

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve),
  )
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
}

main()
