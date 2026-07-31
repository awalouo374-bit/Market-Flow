import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const databaseUrl = process.env.DATABASE_URL || "postgresql://neondb_owner:npg_CFSj0o2bZQqA@ep-wandering-meadow-ay0s10d0-pooler.c-5.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require";



const sql = neon(databaseUrl);

export const db = drizzle(sql, { schema });
