import {
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const BacklogGameTable = pgTable("games", {
  id: serial("id").primaryKey(),
  rawgId: integer("rawgId"),
  // status
  // rating
  // notes?
  // userId
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});
