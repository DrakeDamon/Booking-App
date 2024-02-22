import { type inferAsyncReturnType } from '@trpc/server'
import { type CreateNextContextOptions } from '@trpc/server/adapters/next'
// Adjust the path as necessary to correctly point to your db module
import { prisma } from "../db/db";

export const createContext = async (opts: CreateNextContextOptions) => {
  const { req, res } = opts;
  return {
    req,
    res,
    prisma, // Here, we use the db imported from your setup
  };
};


export type Context = inferAsyncReturnType<typeof createContext>