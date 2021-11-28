import { getApp } from './server'

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
