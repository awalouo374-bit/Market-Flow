

import {
  pgTable,
  uuid,
  integer,
  text,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";
import { productVariants } from "./catalog";
import { users } from "./users";

export const inventoryLogTypeEnum = pgEnum("inventory_log_type", [
  "restock",
  "sale",
  "adjustment",
  "return",
  "damaged",
]);

export const inventoryLogs = pgTable("inventory_logs", {
  id: uuid("id").defaultRandom().primaryKey(),
  variantId: uuid("variant_id")
    .notNull()
    .references(() => productVariants.id, { onDelete: "cascade" }),
  changeQuantity: integer("change_quantity").notNull(),
  type: inventoryLogTypeEnum("type").notNull(),
  notes: text("notes"),
  performedBy: uuid("performed_by").references(() => users.id, { onDelete: "set null" }),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});
