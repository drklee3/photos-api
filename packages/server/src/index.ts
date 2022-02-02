import { getApp } from './server'
import { log } from './utils/logger'

async function main() {
  const { httpServer, apolloServer } = await getApp()

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve),
  )
  log.info(
    `🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`,
  )
}

main()
