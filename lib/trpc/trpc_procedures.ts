import { z } from "zod";
import { procedure, router } from "./trpc_server";
import { completeSentence } from "../chatgpt";
import { CategoryWithPecsItems, listCategories } from "../database/categories";
import { PecsItem } from "../schema/pecs-item";
import { homescreenPecsItems } from "../database/pecs-item";

export const appRouter = router({
  generative: {
    completeSentence: procedure
      .input(z.string())
      .output(z.string())
      .mutation(async ({ input: sentence }) => {
        return await completeSentence(sentence);
      }),
  },
  categories: {
    list: procedure.output(CategoryWithPecsItems.array()).query(async () => {
      return await listCategories();
    }),
  },
  pecsItems: {
    homescreen: procedure.output(PecsItem.array()).query(async () => {
      return await homescreenPecsItems();
    }),
  },
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
