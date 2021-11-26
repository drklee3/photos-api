import session, { SessionOptions } from 'express-session'
import type { Express } from 'express'
import cors from 'cors'

export default function registerSessionMiddleware(app: Express) {
  const config: SessionOptions = {
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { sameSite: 'none' },
  }

  app.use(
    cors({
      origin: 'https://studio.apollographql.com',
      credentials: true,
    }),
  )

  if (process.env.NODE_ENV === 'production') {
    // use https only
    config.cookie!.secure = true
  }

  app.use(session(config))
}
