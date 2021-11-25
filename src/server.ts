import { createContext } from './context'
import schema from './schema/schema'
import { ApolloServer, ApolloServerExpressConfig } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import express from 'express'
import http from 'http'

import {
  registerLoginRoute,
  registerRecoveryRoute,
  registerRegistrationRoute,
  registerSettingsRoute,
  registerVerificationRoute,
} from './routes'

async function main() {
  const app = express()
  const httpServer = http.createServer(app)
  const server = new ApolloServer({
    schema,
    context: createContext,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })

  await server.start()

  registerLoginRoute(app)
  registerRecoveryRoute(app)
  registerRegistrationRoute(app)
  registerSettingsRoute(app)
  registerVerificationRoute(app)

  server.applyMiddleware({ app })

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve),
  )
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
}

main()
