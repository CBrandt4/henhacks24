import { z } from "zod";
import { pecsItems } from "./schema";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const PecsItem = createSelectSchema(pecsItems);
export const InsertPecsItem = createInsertSchema(pecsItems);

export type PecsItem = z.infer<typeof PecsItem>;
export type InsertPecsItem = z.infer<typeof InsertPecsItem>;
