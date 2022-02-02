import { createContext } from './context'
import schema from './schema/schema'
import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import express from 'express'
import http from 'http'

import { registerMiddlewares } from './middleware'
import { channelWrapper } from './store/uploadFile'

let origin: string

switch (process.env.NODE_ENV) {
  case 'production':
    if (!process.env.PUBLIC_URL) {
      throw new Error('PUBLIC_URL var not set')
    }

    origin = process.env.PUBLIC_URL
    break
  case 'development':
    origin = 'https://studio.apollographql.com'
    break
  case 'test':
    // Test
    origin = 'localhost:4000'
    break

  default:
    throw new Error('no NODE_ENV, cors origin cannot be determined')
}

// Exported to use in tests
export async function getApp() {
  const app = express()

  registerMiddlewares(app)

  const httpServer = http.createServer(app)
  const apolloServer = new ApolloServer({
    schema,
    context: createContext,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })

  await apolloServer.start()

  apolloServer.applyMiddleware({
    app,
    cors: {
      origin: [
        process.env.PUBLIC_URL || 'http://localhost',
        'https://studio.apollographql.com',
      ],
      credentials: true,
    },
    bodyParserConfig: {
      limit: '250mb',
    },
  })

  return { app, httpServer, apolloServer }
}

function shutdown() {
  console.log('Shutting down...')
  shutdownAsync()
  process.exit()
}

async function shutdownAsync() {
  await channelWrapper.close()
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
