import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

import { neon } from "@neondatabase/serverless";

async function migrateDatabase() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("DATABASE_URL not found!");
    process.exit(1);
  }

  const sql = neon(url);

  console.log("Applying Better Auth schema migration SQL directly to Neon...");

  // Drop existing foreign key constraints on tables referencing users.id before altering users.id type
  await sql`ALTER TABLE IF EXISTS "user_addresses" DROP CONSTRAINT IF EXISTS "user_addresses_user_id_users_id_fk";`;
  await sql`ALTER TABLE IF EXISTS "carts" DROP CONSTRAINT IF EXISTS "carts_user_id_users_id_fk";`;
  await sql`ALTER TABLE IF EXISTS "orders" DROP CONSTRAINT IF EXISTS "orders_user_id_users_id_fk";`;
  await sql`ALTER TABLE IF EXISTS "product_reviews" DROP CONSTRAINT IF EXISTS "product_reviews_user_id_users_id_fk";`;
  await sql`ALTER TABLE IF EXISTS "inventory_logs" DROP CONSTRAINT IF EXISTS "inventory_logs_performed_by_users_id_fk";`;

  // Drop next-auth old sessions and accounts
  await sql`DROP TABLE IF EXISTS "sessions" CASCADE;`;
  await sql`DROP TABLE IF EXISTS "accounts" CASCADE;`;
  await sql`DROP TABLE IF EXISTS "verifications" CASCADE;`;

  // Alter users table
  await sql`ALTER TABLE "users" ALTER COLUMN "id" TYPE text USING id::text;`;
  await sql`ALTER TABLE "users" ALTER COLUMN "name" SET NOT NULL;`;
  await sql`ALTER TABLE "users" ALTER COLUMN "email_verified" TYPE boolean USING false;`;
  await sql`ALTER TABLE "users" ALTER COLUMN "email_verified" SET DEFAULT false;`;
  await sql`ALTER TABLE "users" ALTER COLUMN "email_verified" SET NOT NULL;`;

  // Alter referencing columns to text
  await sql`ALTER TABLE IF EXISTS "user_addresses" ALTER COLUMN "user_id" TYPE text USING user_id::text;`;
  await sql`ALTER TABLE IF EXISTS "carts" ALTER COLUMN "user_id" TYPE text USING user_id::text;`;
  await sql`ALTER TABLE IF EXISTS "orders" ALTER COLUMN "user_id" TYPE text USING user_id::text;`;
  await sql`ALTER TABLE IF EXISTS "product_reviews" ALTER COLUMN "user_id" TYPE text USING user_id::text;`;
  await sql`ALTER TABLE IF EXISTS "inventory_logs" ALTER COLUMN "performed_by" TYPE text USING performed_by::text;`;

  // Re-add foreign keys
  await sql`ALTER TABLE IF EXISTS "user_addresses" ADD CONSTRAINT "user_addresses_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;`;
  await sql`ALTER TABLE IF EXISTS "carts" ADD CONSTRAINT "carts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;`;
  await sql`ALTER TABLE IF EXISTS "orders" ADD CONSTRAINT "orders_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL;`;
  await sql`ALTER TABLE IF EXISTS "product_reviews" ADD CONSTRAINT "product_reviews_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;`;
  await sql`ALTER TABLE IF EXISTS "inventory_logs" ADD CONSTRAINT "inventory_logs_performed_by_users_id_fk" FOREIGN KEY ("performed_by") REFERENCES "users"("id") ON DELETE SET NULL;`;

  // Create Better Auth tables
  await sql`
    CREATE TABLE IF NOT EXISTS "accounts" (
      "id" text PRIMARY KEY NOT NULL,
      "account_id" text NOT NULL,
      "provider_id" text NOT NULL,
      "user_id" text NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
      "access_token" text,
      "refresh_token" text,
      "id_token" text,
      "access_token_expires_at" timestamp,
      "refresh_token_expires_at" timestamp,
      "scope" text,
      "password" text,
      "created_at" timestamp DEFAULT now() NOT NULL,
      "updated_at" timestamp DEFAULT now() NOT NULL
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS "sessions" (
      "id" text PRIMARY KEY NOT NULL,
      "expires_at" timestamp NOT NULL,
      "token" text UNIQUE NOT NULL,
      "created_at" timestamp DEFAULT now() NOT NULL,
      "updated_at" timestamp DEFAULT now() NOT NULL,
      "ip_address" text,
      "user_agent" text,
      "user_id" text NOT NULL REFERENCES "users"("id") ON DELETE CASCADE
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS "verifications" (
      "id" text PRIMARY KEY NOT NULL,
      "identifier" text NOT NULL,
      "value" text NOT NULL,
      "expires_at" timestamp NOT NULL,
      "created_at" timestamp,
      "updated_at" timestamp
    );
  `;

  console.log("Better Auth schema migration applied successfully!");
}

migrateDatabase().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
