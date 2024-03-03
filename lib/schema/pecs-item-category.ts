import { z } from "zod";
import { pecsItemCategories } from "./schema";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const PecsItemCategory = createSelectSchema(pecsItemCategories);
export const InsertPecsItemCategory = createInsertSchema(pecsItemCategories);

export type PecsItemCategory = z.infer<typeof PecsItemCategory>;
export type InsertPecsItemCategory = z.infer<typeof InsertPecsItemCategory>;
