import { z } from "zod";
import { procedure, router } from "./trpc_server";
import { completeSentence } from "../chatgpt";

export const appRouter = router({
  generative: {
    completeSentence: procedure
      .input(z.string())
      .output(z.string())
      .mutation(async ({ input: sentence }) => {
        return await completeSentence(sentence);
      }),
  },
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
