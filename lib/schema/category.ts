import { z } from "zod";
import { category } from "./schema";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const Category = createSelectSchema(category);
export const InsertCategory = createInsertSchema(category);

export type Categoy = z.infer<typeof Category>;
export type InsertCategory = z.infer<typeof InsertCategory>;
