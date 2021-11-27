import request from 'supertest'
import { getApp } from '../../server'
import { PrismaClient } from '.prisma/client'
import type { Express } from 'express'
import { Server } from 'http'
import { ApolloServer } from 'apollo-server-express'
import { getSdk } from '../../client/graphqlRequest'
import { GraphQLClient } from 'graphql-request'

const client = new GraphQLClient('http://localhost:4000/graphql', {
  credentials: 'include',
})
const sdk = getSdk(client)

let httpServer: Server
let apolloServer: ApolloServer<unknown>

beforeAll(async () => {
  const app = await getApp()
  httpServer = app.httpServer
  apolloServer = app.apolloServer

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve),
  )
})

afterAll(async () => {
  await apolloServer.stop()
  httpServer.close()
})
/*
describe('basic', () => {
  test('/ should 404', async () => {
    await request(httpServer).get('/').expect(404)
  })
})
*/

describe('auth', () => {
  const prisma = new PrismaClient()

  beforeAll(async () => {
    // Clear database users
    await prisma.user.deleteMany({})
  })

  afterAll(async () => {
    // Clear database users
    await prisma.user.deleteMany({})
  })

  test('signup', async () => {
    const res = await sdk.Signup({
      username: 'bob',
      password: 'Hunter2',
      email: 'me@example.com',
    })

    expect(res.signup).toBeDefined()

    expect(res.signup?.username).toBe('bob')
    expect(res.signup?.email).toBe('me@example.com')
  })

  test('query currentUser', async () => {
    const res = await sdk.currentUserQuery()

    expect(res.currentUser).toBeDefined()

    expect(res.currentUser?.username).toBe('bob')
    expect(res.currentUser?.email).toBe('me@example.com')
  })
})
