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

// Exported to use in tests
export async function getApp() {
  const app = express()

  app.use(graphqlUploadExpress())
  registerMiddlewares(app)

  const httpServer = http.createServer(app)
  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => buildContext({ req, res, prisma }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })

  await apolloServer.start()

  apolloServer.applyMiddleware({
    app,
    cors: {
      origin: 'https://studio.apollographql.com',
      credentials: true,
    },
  })

  return { app, httpServer, apolloServer }
}

async function main() {
  const { httpServer, apolloServer } = await getApp()

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve),
  )
  console.log(
    `🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`,
  )
}

main()
