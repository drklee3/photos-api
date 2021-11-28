import session, { SessionOptions } from 'express-session'
import type { Express } from 'express'

export default function registerSessionMiddleware(app: Express) {
  const config: SessionOptions = {
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { sameSite: 'none' },
  }

  if (process.env.NODE_ENV === 'production') {
    // use https only
    config.cookie!.secure = true
  }

  app.use(session(config))
}
