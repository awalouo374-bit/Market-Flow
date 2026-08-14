import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

import { Client } from "pg";
import bcrypt from "bcryptjs";

async function createAdmin() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("DATABASE_URL not defined!");
    process.exit(1);
  }

  const client = new Client({
    connectionString: url,
    ssl: { rejectUnauthorized: false },
  });

  await client.connect();

  const email = "admin@marketflow.com";
  const password = "Galabdon09";
  const name = "Marketflow Admin";
  const userId = crypto.randomUUID();
  const accountId = crypto.randomUUID();

  console.log(`[INFO] Creating admin account via native pg client for ${email}...`);

  // Delete any existing record for this email
  await client.query(`DELETE FROM users WHERE email = $1`, [email]);

  // Hash password with bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert user
  await client.query(
    `INSERT INTO users (id, name, email, email_verified, role, status, created_at, updated_at)
     VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())`,
    [userId, name, email, true, "admin", "active"]
  );

  // Insert account credential for Better Auth
  await client.query(
    `INSERT INTO accounts (id, account_id, provider_id, user_id, password, created_at, updated_at)
     VALUES ($1, $2, $3, $4, $5, NOW(), NOW())`,
    [accountId, email, "credential", userId, hashedPassword]
  );

  console.log(`[SUCCESS] Admin user created!`);
  console.log(`Email: ${email}`);
  console.log(`Password: ${password}`);

  await client.end();
}

createAdmin().catch((err) => {
  console.error("Error creating admin:", err);
  process.exit(1);
});
