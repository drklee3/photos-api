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

  // Use authorization header as session id if cookie not set
  app.use((req, res, next) => {
    if (!req.cookies?.['_sid']) {
      const authHeader = req.header('Authorization')
      if (authHeader) {
        req.cookies['_sid'] = authHeader.replace('Bearer', '').trim()
      }
    }

    next()
  })

  app.use(session(config))
}
