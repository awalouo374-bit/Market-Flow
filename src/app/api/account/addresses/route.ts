import { NextResponse } from "next/server";
import { getConnectedUser } from "@/lib/session";
import { db } from "@/db";
import { userAddresses } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET() {
  const connected = await getConnectedUser();
  if (!connected) return NextResponse.json({ error: "Non authentifie" }, { status: 401 });

  const addresses = await db
    .select()
    .from(userAddresses)
    .where(eq(userAddresses.userId, connected.id))
    .orderBy(desc(userAddresses.isDefault), desc(userAddresses.createdAt));

  return NextResponse.json(addresses);
}

export async function POST(request: Request) {
  const connected = await getConnectedUser();
  if (!connected) return NextResponse.json({ error: "Non authentifie" }, { status: 401 });

  const body = await request.json();
  const { title, recipientName, phone, streetAddress, city, state, postalCode, country, isDefault } = body;

  if (!recipientName || !streetAddress || !city || !postalCode || !country) {
    return NextResponse.json({ error: "Champs obligatoires manquants." }, { status: 400 });
  }

  // If new address is default, unset others
  if (isDefault) {
    await db
      .update(userAddresses)
      .set({ isDefault: false })
      .where(eq(userAddresses.userId, connected.id));
  }

  const [created] = await db
    .insert(userAddresses)
    .values({
      userId: connected.id,
      title: title ?? null,
      recipientName,
      phone: phone ?? null,
      streetAddress,
      city,
      state: state ?? null,
      postalCode,
      country,
      isDefault: isDefault ?? false,
    })
    .returning();

  return NextResponse.json(created, { status: 201 });
}
