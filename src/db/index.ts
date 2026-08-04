import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// Use a placeholder during build so static analysis succeeds.
// At runtime the real DATABASE_URL is always present via .env / .env.local.
const url =
  process.env.DATABASE_URL ??
  "postgresql://placeholder:placeholder@placeholder/placeholder";

const sql = neon(url);

export const db = drizzle(sql, { schema });
