import { sql } from "drizzle-orm";
import { db } from "./index";

async function testConnection() {
  try {
    const result = await db.execute(sql`SELECT NOW()`);

    console.log("✅ Connexion à la base de données réussie !");
    console.log("🕐 Heure de la base :", result);
    process.exit(0);
  } catch (error) {
    console.error("❌ Connexion à la base de données échouée !");
    console.error(error);
    process.exit(1);
  }
}

testConnection();