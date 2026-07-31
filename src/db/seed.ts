import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

import { db } from "./index";
import {
  users,
  categories,
  brands,
  products,
  productVariants,
  productImages,
  inventoryLogs,
  productReviews,
} from "./schema";

async function main() {
  console.log("[INFO] Starting MarketFlow database seeding...");

  if (!process.env.DATABASE_URL) {
    console.warn("[WARN] DATABASE_URL environment variable is not defined. Skipping live database insertion.");
    return;
  }

  // 1. Seed Admin & Customer Users
  const [adminUser] = await db
    .insert(users)
    .values({
      name: "Marketflow Admin",
      email: "admin@marketflow.com",
      role: "admin",
      status: "active",
    })
    .onConflictDoNothing()
    .returning();

  const [customerUser] = await db
    .insert(users)
    .values({
      name: "Jane Doe",
      email: "jane@example.com",
      role: "customer",
      status: "active",
    })
    .onConflictDoNothing()
    .returning();

  console.log("[OK] Users seeded/verified");

  // 2. Seed Categories
  const [electronicsCategory] = await db
    .insert(categories)
    .values({
      name: "Electronics",
      slug: "electronics",
      description: "Consumer electronics and smart gadgets",
    })
    .onConflictDoNothing()
    .returning();

  const parentCatId = electronicsCategory?.id;

  const [smartphonesCategory] = await db
    .insert(categories)
    .values({
      name: "Smartphones",
      slug: "smartphones",
      description: "Next-gen flagship smartphones",
      parentId: parentCatId,
    })
    .onConflictDoNothing()
    .returning();

  console.log("[OK] Categories seeded");

  // 3. Seed Brand
  const [aetherBrand] = await db
    .insert(brands)
    .values({
      name: "Aether Tech",
      slug: "aether-tech",
      website: "https://aethertech.example.com",
    })
    .onConflictDoNothing()
    .returning();

  console.log("[OK] Brands seeded");

  // 4. Seed Product
  const [flagshipPhone] = await db
    .insert(products)
    .values({
      name: "Aether Pro Phone X1",
      slug: "aether-pro-phone-x1",
      sku: "AETH-PH-X1",
      description: "High-performance smartphone with AI-accelerated chip and AMOLED screen.",
      price: "999.00",
      compareAtPrice: "1099.00",
      costPrice: "650.00",
      categoryId: smartphonesCategory?.id || electronicsCategory?.id,
      brandId: aetherBrand?.id,
      status: "active",
      isFeatured: true,
    })
    .onConflictDoNothing()
    .returning();

  if (flagshipPhone) {
    // Seed Variant
    const [variant] = await db
      .insert(productVariants)
      .values({
        productId: flagshipPhone.id,
        name: "Matte Black / 256GB",
        sku: "AETH-PH-X1-BLK-256",
        price: "999.00",
        attributes: { color: "Matte Black", storage: "256GB" },
        stock: 50,
        lowStockThreshold: 10,
      })
      .onConflictDoNothing()
      .returning();

    // Seed Product Image
    await db
      .insert(productImages)
      .values({
        productId: flagshipPhone.id,
        url: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
        altText: "Aether Pro Phone X1 Front and Back",
        isPrimary: true,
        displayOrder: 1,
      })
      .onConflictDoNothing();

    // Seed Initial Inventory Audit Log
    if (variant) {
      await db
        .insert(inventoryLogs)
        .values({
          variantId: variant.id,
          changeQuantity: 50,
          type: "restock",
          notes: "Initial inventory allocation from main warehouse",
          performedBy: adminUser?.id,
        })
        .onConflictDoNothing();
    }

    // Seed Review if customer exists
    if (customerUser) {
      await db
        .insert(productReviews)
        .values({
          productId: flagshipPhone.id,
          userId: customerUser.id,
          rating: 5,
          title: "Incredible build quality and camera!",
          comment: "The speed and screen resolution exceeded my expectations. Highly recommended.",
          isVerifiedPurchase: true,
          status: "approved",
        })
        .onConflictDoNothing();
    }
  }

  console.log("[SUCCESS] Database seeding completed successfully!");
}

main()
  .catch((err) => {
    console.error("[ERROR] Error during seeding:", err);
    process.exit(1);
  })
  .finally(async () => {
    process.exit(0);
  });
