import { relations } from "drizzle-orm";
import {
  bigint,
  boolean,
  mysqlTable,
  serial,
  varchar,
} from "drizzle-orm/mysql-core";

// Items

const pecsItems = mysqlTable("pecs_items", {
  id: serial("id").primaryKey(),
  word: varchar("word", { length: 255 }).unique().notNull(),
  homescreen: boolean("homescreen").notNull().default(false),
});

const pecsItemRelations = relations(pecsItems, ({ many }) => ({
  pecsItemCategories: many(pecsItemCategories),
}));

// Categories

const categories = mysqlTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).unique().notNull(),
});

const categoryRelations = relations(categories, ({ many }) => ({
  pecsItemCategories: many(pecsItemCategories),
}));

// Relations table

const pecsItemCategories = mysqlTable("pecs_item_categories", {
  id: serial("id").primaryKey(),
  pecsItemId: bigint("pecs_item_id", { mode: "number", unsigned: true })
    .references(() => pecsItems.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    })
    .notNull(),
  categoryId: bigint("category_id", { mode: "number", unsigned: true })
    .references(() => categories.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    })
    .notNull(),
});

const pecsItemCategoryRelations = relations(pecsItemCategories, ({ one }) => ({
  pecsItem: one(pecsItems, {
    fields: [pecsItemCategories.pecsItemId],
    references: [pecsItems.id],
  }),
  category: one(categories, {
    fields: [pecsItemCategories.categoryId],
    references: [categories.id],
  }),
}));

export {
  pecsItems,
  categories,
  pecsItemCategories,
  pecsItemRelations,
  categoryRelations,
  pecsItemCategoryRelations,
};
