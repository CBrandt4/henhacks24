import { z } from "zod";
import { Category } from "../schema/category";
import { PecsItem } from "../schema/pecs-item";
import database from "./database";

export const CategoryWithPecsItems = Category.extend({
  pecsItemCategories: z.object({ pecsItem: PecsItem }).array(),
});
export type CategoryWithPecsItems = z.infer<typeof CategoryWithPecsItems>;

export async function listCategories() {
  return CategoryWithPecsItems.array().parse(
    await database.query.categories.findMany({
      with: {
        pecsItemCategories: {
          columns: {},
          with: {
            pecsItem: true,
          },
        },
      },
    }),
  );
}
