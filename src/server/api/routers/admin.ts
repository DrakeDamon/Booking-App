// Assuming the corrected import path for context
import { createTRPCRouter, publicProcedure } from '../trpc';
import { z } from 'zod';
import { SignJWT } from 'jose'; // Ensure correct import for signJWT
import { nanoid } from 'nanoid';
import { Context } from './context'; // Corrected import path as an example

// Ensure environment variables are safely accessed
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? '';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? '';
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY ?? '';

export const adminRouter = createTRPCRouter({
  login: publicProcedure
    .input(z.object({
      email: z.string().email(),
      password: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { email, password } = input;

      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        const token = await new SignJWT({ email })
          .setProtectedHeader({ alg: 'HS256' })
          .setJti(nanoid())
          .setIssuedAt()
          .setExpirationTime('2h')
          .sign(new TextEncoder().encode(JWT_SECRET_KEY));

        // Assuming ctx includes a response (res) object
        ctx.res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=${2 * 60 * 60};`);
        return { success: true, token };
      } else {
        throw new Error('Invalid login credentials');
      }
    }),
});
