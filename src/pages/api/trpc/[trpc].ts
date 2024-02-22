import { createNextApiHandler } from "@trpc/server/adapters/next";

import { env } from "../../../server/env/server.mjs";
import { appRouter } from "../../../pages";
import { createTRPCContext } from "../../../server/trpc/context";

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  onError:
    env.NODE_ENV === "development"
      ? ({ path, error }) => {
          console.error(
            `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`
          );
        }
      : undefined,
});
