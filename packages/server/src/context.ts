import { PrismaClient } from '@prisma/client'
import { Request } from 'express'

const prisma = new PrismaClient()

export interface Context {
  prisma: PrismaClient
  req: Request // HTTP request carrying the `Authorization` header
}

export function createContext(req: Request) {
  return {
    ...req,
    prisma,
  }
}
