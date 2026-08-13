

import type { InferSelectModel, InferInsertModel } from "drizzle-orm";
import * as usersSchema from "./users";
import * as catalogSchema from "./catalog";
import * as inventorySchema from "./inventory";
import * as ordersSchema from "./orders";
import * as reviewsSchema from "./reviews";

export * from "./users";
export * from "./catalog";
export * from "./inventory";
export * from "./orders";
export * from "./reviews";
export * from "./relations";

// Inferred TypeScript Types
export type User = InferSelectModel<typeof usersSchema.users>;
export type NewUser = InferInsertModel<typeof usersSchema.users>;

export type UserAddress = InferSelectModel<typeof usersSchema.userAddresses>;
export type NewUserAddress = InferInsertModel<typeof usersSchema.userAddresses>;

export type Category = InferSelectModel<typeof catalogSchema.categories>;
export type NewCategory = InferInsertModel<typeof catalogSchema.categories>;

export type Brand = InferSelectModel<typeof catalogSchema.brands>;
export type NewBrand = InferInsertModel<typeof catalogSchema.brands>;

export type Product = InferSelectModel<typeof catalogSchema.products>;
export type NewProduct = InferInsertModel<typeof catalogSchema.products>;

export type ProductVariant = InferSelectModel<typeof catalogSchema.productVariants>;
export type NewProductVariant = InferInsertModel<typeof catalogSchema.productVariants>;

export type ProductImage = InferSelectModel<typeof catalogSchema.productImages>;
export type NewProductImage = InferInsertModel<typeof catalogSchema.productImages>;

export type InventoryLog = InferSelectModel<typeof inventorySchema.inventoryLogs>;
export type NewInventoryLog = InferInsertModel<typeof inventorySchema.inventoryLogs>;

export type Cart = InferSelectModel<typeof ordersSchema.carts>;
export type NewCart = InferInsertModel<typeof ordersSchema.carts>;

export type CartItem = InferSelectModel<typeof ordersSchema.cartItems>;
export type NewCartItem = InferInsertModel<typeof ordersSchema.cartItems>;

export type Order = InferSelectModel<typeof ordersSchema.orders>;
export type NewOrder = InferInsertModel<typeof ordersSchema.orders>;

export type OrderItem = InferSelectModel<typeof ordersSchema.orderItems>;
export type NewOrderItem = InferInsertModel<typeof ordersSchema.orderItems>;

export type Payment = InferSelectModel<typeof ordersSchema.payments>;
export type NewPayment = InferInsertModel<typeof ordersSchema.payments>;

export type ProductReview = InferSelectModel<typeof reviewsSchema.productReviews>;
export type NewProductReview = InferInsertModel<typeof reviewsSchema.productReviews>;
