import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// Keep neonConfig.fetchFunction undefined so the driver uses its own default.
// serverExternalPackages in next.config.ts ensures this module runs in Node's
// native context and is never bundled by Turbopack for the browser.

const url =
  process.env.DATABASE_URL ??
  "postgresql://placeholder:placeholder@placeholder/placeholder";

const sql = neon(url);

export const db = drizzle(sql, { schema });
