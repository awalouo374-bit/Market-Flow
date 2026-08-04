import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// Force the Neon driver to use Node's native fetch (available in Node 18+).
// Without this, Turbopack may inject its own fetch polyfill which lacks the
// TLS options required for the Neon HTTP endpoint → "fetch failed" errors.
if (typeof globalThis.fetch === "undefined") {
  // Node <18 fallback — should not happen with Node 22
  neonConfig.fetchEndpoint = (host) =>
    `https://${host}/sql`;
} else {
  // Explicitly bind to Node's native global fetch, bypassing any polyfill
  neonConfig.fetchFunction = globalThis.fetch.bind(globalThis);
}

// DATABASE_URL is injected by Next.js at runtime from .env / .env.local.
// The placeholder keeps the build from failing when the env var is absent
// during static analysis — actual queries only run at request time.
const url =
  process.env.DATABASE_URL ??
  "postgresql://placeholder:placeholder@placeholder/placeholder";

const sql = neon(url);

export const db = drizzle(sql, { schema });
