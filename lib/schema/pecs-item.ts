import { z } from "zod";
import { pecsItem } from "./schema";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const PecsItem = createSelectSchema(pecsItem);
export const InsertPecsItem = createInsertSchema(pecsItem);

export type PecsItem = z.infer<typeof PecsItem>;
export type InsertPecsItem = z.infer<typeof InsertPecsItem>;
