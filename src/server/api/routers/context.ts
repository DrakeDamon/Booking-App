import { type inferAsyncReturnType } from '@trpc/server'
import { type CreateNextContextOptions } from '@trpc/server/adapters/next'
import { db } from '../../../server/db';

export const createContext = async (opts: CreateNextContextOptions) => {
  const { req, res } = opts;
  return {
    req,
    res,
    prisma: db, // Here, we use the db imported from your setup
  };
};


export type Context = inferAsyncReturnType<typeof createContext>