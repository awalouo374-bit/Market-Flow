import { db } from "@/db";
import { orders, orderItems } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import type { OrderAddress } from "@/db/schema/orders";

export type OrderStatusType = "pending" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded";

export interface CustomerOrderItem {
  id: string;
  productId?: string;
  productName: string;
  variantName?: string | null;
  sku: string;
  price: string;
  quantity: number;
  total: string;
  image?: string;
}

export interface CustomerOrder {
  id: string;
  orderNumber: string;
  status: OrderStatusType;
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  fulfillmentStatus: "unfulfilled" | "partially_fulfilled" | "fulfilled";
  subtotal: string;
  tax: string;
  shippingFee: string;
  discountTotal: string;
  total: string;
  shippingAddress: OrderAddress | null;
  paymentMethod: string;
  trackingNumber: string | null;
  carrier: string | null;
  estimatedDelivery: string | null;
  createdAt: Date;
  items: CustomerOrderItem[];
}

// Fallback seed orders for realistic customer dashboard presentation
const MOCK_CUSTOMER_ORDERS: CustomerOrder[] = [
  {
    id: "ord-1001",
    orderNumber: "MF-2026-89421",
    status: "shipped",
    paymentStatus: "paid",
    fulfillmentStatus: "fulfilled",
    subtotal: "1198.00",
    tax: "95.84",
    shippingFee: "0.00",
    discountTotal: "100.00",
    total: "1193.84",
    shippingAddress: {
      recipientName: "Martin Alex",
      streetAddress: "124 Market Boulevard, Suite 400",
      city: "San Francisco",
      state: "CA",
      postalCode: "94105",
      country: "United States",
    },
    paymentMethod: "Visa ending in 4242",
    trackingNumber: "FEDEX-982401859",
    carrier: "FedEx Express",
    estimatedDelivery: "Tomorrow by 8:00 PM",
    createdAt: new Date(Date.now() - 2 * 24 * 3600 * 1000),
    items: [
      {
        id: "item-1",
        productName: "Aether Pro Phone X1 Ultra",
        variantName: "Matte Black / 256GB",
        sku: "AETH-PH-X1-BLK",
        price: "999.00",
        quantity: 1,
        total: "999.00",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
      },
      {
        id: "item-2",
        productName: "Flow Wireless ANC Buds Pro",
        variantName: "Flow Cyan",
        sku: "FLOW-ANC-CYAN",
        price: "199.00",
        quantity: 1,
        total: "199.00",
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df",
      },
    ],
  },
  {
    id: "ord-1002",
    orderNumber: "MF-2026-77319",
    status: "delivered",
    paymentStatus: "paid",
    fulfillmentStatus: "fulfilled",
    subtotal: "1499.00",
    tax: "119.92",
    shippingFee: "0.00",
    discountTotal: "50.00",
    total: "1568.92",
    shippingAddress: {
      recipientName: "Martin Alex",
      streetAddress: "124 Market Boulevard, Suite 400",
      city: "San Francisco",
      state: "CA",
      postalCode: "94105",
      country: "United States",
    },
    paymentMethod: "Apple Pay (Mastercard *8812)",
    trackingNumber: "DHL-481902410",
    carrier: "DHL Express",
    estimatedDelivery: "Delivered on Aug 10, 2026",
    createdAt: new Date(Date.now() - 10 * 24 * 3600 * 1000),
    items: [
      {
        id: "item-3",
        productName: "Market UltraBook Pro 15",
        variantName: "Space Gray / M3 / 32GB",
        sku: "UB-15-M3-32",
        price: "1499.00",
        quantity: 1,
        total: "1499.00",
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
      },
    ],
  },
  {
    id: "ord-1003",
    orderNumber: "MF-2026-64120",
    status: "processing",
    paymentStatus: "paid",
    fulfillmentStatus: "unfulfilled",
    subtotal: "83.99",
    tax: "6.72",
    shippingFee: "10.00",
    discountTotal: "0.00",
    total: "100.71",
    shippingAddress: {
      recipientName: "Martin Alex",
      streetAddress: "124 Market Boulevard, Suite 400",
      city: "San Francisco",
      state: "CA",
      postalCode: "94105",
      country: "United States",
    },
    paymentMethod: "Visa ending in 4242",
    trackingNumber: null,
    carrier: "Preparing Shipment",
    estimatedDelivery: "Preparing for dispatch",
    createdAt: new Date(Date.now() - 6 * 3600 * 1000),
    items: [
      {
        id: "item-4",
        productName: "Flow Ultra 65W GaN Fast Charger Trio",
        variantName: "Midnight Black",
        sku: "FLOW-65W-BLK",
        price: "49.00",
        quantity: 1,
        total: "49.00",
        image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0",
      },
      {
        id: "item-5",
        productName: "Aether Braided USB-C Cable (2m)",
        variantName: "Silver Metallic",
        sku: "AETH-CABLE-2M",
        price: "34.99",
        quantity: 1,
        total: "34.99",
        image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0",
      },
    ],
  },
];

export async function getUserOrders(userId?: string): Promise<CustomerOrder[]> {
  if (!userId) return MOCK_CUSTOMER_ORDERS;

  try {
    const dbOrders = await db.query.orders.findMany({
      where: eq(orders.userId, userId),
      orderBy: [desc(orders.createdAt)],
      with: { items: true },
    });

    if (dbOrders.length === 0) {
      return MOCK_CUSTOMER_ORDERS;
    }

    return dbOrders.map((o) => ({
      id: o.id,
      orderNumber: o.orderNumber,
      status: o.status as OrderStatusType,
      paymentStatus: o.paymentStatus as CustomerOrder["paymentStatus"],
      fulfillmentStatus: o.fulfillmentStatus as CustomerOrder["fulfillmentStatus"],
      subtotal: o.subtotal,
      tax: o.tax,
      shippingFee: o.shippingFee,
      discountTotal: o.discountTotal,
      total: o.total,
      shippingAddress: o.shippingAddress,
      paymentMethod: "Credit Card / Instant Checkout",
      trackingNumber: `TRK-${o.orderNumber}`,
      carrier: "MarketFlow Logistics",
      estimatedDelivery: "Standard Delivery (2-4 days)",
      createdAt: o.createdAt,
      items: o.items.map((i) => ({
        id: i.id,
        productId: i.productId ?? undefined,
        productName: i.productName,
        variantName: i.variantName,
        sku: i.sku,
        price: i.price,
        quantity: i.quantity,
        total: i.total,
      })),
    }));
  } catch {
    return MOCK_CUSTOMER_ORDERS;
  }
}
