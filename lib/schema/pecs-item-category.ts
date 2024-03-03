import { z } from "zod";
import { pecsItemCategory } from "./schema";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const PecsItemCategory = createSelectSchema(pecsItemCategory);
export const InsertPecsItemCategory = createInsertSchema(pecsItemCategory);

export type PecsItemCategory = z.infer<typeof PecsItemCategory>;
export type InsertPecsItemCategory = z.infer<typeof InsertPecsItemCategory>;
