// https://stackoverflow.com/questions/65805015/extending-session-object-in-express-session

declare module 'express-session' {
  interface SessionData {
    userId?: string
  }
}

export {}
