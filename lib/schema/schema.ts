import { bigint, mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";

const pecsItem = mysqlTable("pecs_item", {
  id: serial("id").primaryKey(),
  word: varchar("word", { length: 255 }).unique().notNull(),
  imageUrl: varchar("image_url", { length: 255 }).notNull(),
});

const category = mysqlTable("category", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).unique().notNull(),
  imageUrl: varchar("image_url", { length: 255 }).notNull(),
});

const pecsItemCategory = mysqlTable("pecs_item_category", {
  pecsItemId: bigint("pecs_item_id", { mode: "number", unsigned: true })
    .references(() => pecsItem.id)
    .notNull(),
  categoryId: bigint("category_id", { mode: "number", unsigned: true })
    .references(() => category.id)
    .notNull(),
});

export { pecsItem, category, pecsItemCategory };
