import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const gameStatus = pgEnum("game_status", [
  "backlog",
  "playing",
  "completed",
  "dropped",
]);

export const UserTable = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 255 }).unique().notNull(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const BacklogEntryTable = pgTable("backlog_entries", {
  id: serial("id").primaryKey(),
  rawgId: integer("rawg_id"),
  userId: integer("user_id")
    .references(() => UserTable.id)
    .notNull(),
  rating: integer("rating"),
  status: gameStatus("status").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => new Date())
    .notNull(),
});
