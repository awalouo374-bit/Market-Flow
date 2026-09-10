import { NextResponse } from "next/server";
import { getConnectedUser } from "@/lib/session";
import { db } from "@/db";
import { userAddresses } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const connected = await getConnectedUser();
  if (!connected) return NextResponse.json({ error: "Non authentifie" }, { status: 401 });

  const { id } = await params;
  const body = await request.json();

  const existing = await db.query.userAddresses.findFirst({
    where: and(eq(userAddresses.id, id), eq(userAddresses.userId, connected.id)),
  });
  if (!existing) return NextResponse.json({ error: "Introuvable" }, { status: 404 });

  if (body.isDefault) {
    await db
      .update(userAddresses)
      .set({ isDefault: false })
      .where(eq(userAddresses.userId, connected.id));
  }

  const [updated] = await db
    .update(userAddresses)
    .set({ ...body, isDefault: body.isDefault ?? existing.isDefault })
    .where(and(eq(userAddresses.id, id), eq(userAddresses.userId, connected.id)))
    .returning();

  return NextResponse.json(updated);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const connected = await getConnectedUser();
  if (!connected) return NextResponse.json({ error: "Non authentifie" }, { status: 401 });

  const { id } = await params;

  const existing = await db.query.userAddresses.findFirst({
    where: and(eq(userAddresses.id, id), eq(userAddresses.userId, connected.id)),
  });
  if (!existing) return NextResponse.json({ error: "Introuvable" }, { status: 404 });

  await db
    .delete(userAddresses)
    .where(and(eq(userAddresses.id, id), eq(userAddresses.userId, connected.id)));

  return NextResponse.json({ success: true });
}
