import { z } from "zod";
import { Category } from "../schema/category";
import { PecsItem } from "../schema/pecs-item";
import database from "./database";
import { eq } from "drizzle-orm";
import { pecsItems } from "../schema/schema";

export const PecsItemWithCategories = PecsItem.extend({
  pecsItemCategories: z.object({ category: Category }).array(),
});
export type PecsItemWithCategories = z.infer<typeof PecsItemWithCategories>;

export async function listPecsItems() {
  return PecsItemWithCategories.array().parse(
    await database.query.pecsItems.findMany({
      with: {
        pecsItemCategories: {
          columns: {},
          with: {
            category: true,
          },
        },
      },
    }),
  );
}

export async function homescreenPecsItems() {
  return PecsItem.array().parse(
    await database.query.pecsItems.findMany({
      where: eq(pecsItems.homescreen, true),
    }),
  );
}
