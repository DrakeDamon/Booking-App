import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import { SignJWT } from 'jose';
import { nanoid } from 'nanoid';
import cookie from 'cookie';

// Ensure environment variables are safely accessed
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? '';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? '';
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY ?? '';

export const adminRouter = router({
  login: publicProcedure
    .input(z.object({
      email: z.string().email(),
      password: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { res } = ctx;
      const { email, password } = input;

      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        const token = await new SignJWT({ email })
          .setProtectedHeader({ alg: 'HS256' })
          .setJti(nanoid())
          .setIssuedAt()
          .setExpirationTime('2h')
          .sign(new TextEncoder().encode(JWT_SECRET_KEY));

        res.setHeader('Set-Cookie', cookie.serialize('user-token', token, {
          httpOnly: true,
          path: '/',
          secure: process.env.NODE_ENV === 'production',
          maxAge: 7200, // 2 hours in seconds
        }));

        return { success: true, message: "Login successful" };
      } else {
        throw new Error('Invalid login credentials');
      }
    }),
});
