import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

import { db } from "./index";
import { users } from "./schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

async function fixPasswords() {
  console.log("[INFO] Fixing password hashes for seeded users...");

  if (!process.env.DATABASE_URL) {
    console.error("[ERROR] DATABASE_URL not set");
    process.exit(1);
  }

  const demoPasswordHash = await bcrypt.hash("demo123456", 10);

  // Update admin user
  const adminResult = await db
    .update(users)
    .set({ passwordHash: demoPasswordHash })
    .where(eq(users.email, "admin@marketflow.com"))
    .returning({ id: users.id, email: users.email });

  if (adminResult.length > 0) {
    console.log(`[OK] Updated password for: ${adminResult[0].email}`);
  } else {
    console.log("[WARN] admin@marketflow.com not found in database");
  }

  // Update customer user
  const customerResult = await db
    .update(users)
    .set({ passwordHash: demoPasswordHash })
    .where(eq(users.email, "jane@example.com"))
    .returning({ id: users.id, email: users.email });

  if (customerResult.length > 0) {
    console.log(`[OK] Updated password for: ${customerResult[0].email}`);
  } else {
    console.log("[WARN] jane@example.com not found in database");
  }

  console.log("[SUCCESS] Password fix completed! Demo password: demo123456");
}

fixPasswords()
  .catch((err) => {
    console.error("[ERROR]", err);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
