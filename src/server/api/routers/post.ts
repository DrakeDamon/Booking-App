import { z } from "zod";
import { appRouter } from "../../trpc/trpc";

export const postRouter = appRouter({
  hello: t.procedure // Assuming 't' is correctly defined elsewhere in your context or supposed to be another object like 'publicProcedure'
    .input(z.object({ text: z.string() }))
    .query(async ({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: t.procedure // Assuming 't' is correctly defined, replace 't' with the correct procedure object if different
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // simulate a slow db call
      return ctx.prisma.post.create({ // Assuming 'ctx.prisma' is correctly set up in your context
        data: {
          name: input.name,
        },
      });
    }),

  getLatest: t.procedure // Replace 't' with your actual procedure object
    .query(({ ctx }) => {
      return ctx.prisma.post.findFirst({
        orderBy: { createdAt: 'desc' },
      });
    }),
});
