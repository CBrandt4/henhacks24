import { z } from "zod";
import { categories } from "./schema";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { PecsItem } from "./pecs-item";

export const Category = createSelectSchema(categories);
export const InsertCategory = createInsertSchema(categories);

export type Category = z.infer<typeof Category>;
export type InsertCategory = z.infer<typeof InsertCategory>;
