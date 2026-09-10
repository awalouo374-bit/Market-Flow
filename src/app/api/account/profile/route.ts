import { NextResponse } from "next/server";
import { getConnectedUser } from "@/lib/session";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function PATCH(request: Request) {
  const connected = await getConnectedUser();
  if (!connected) {
    return NextResponse.json({ error: "Non authentifie" }, { status: 401 });
  }

  const body = await request.json();
  const { name, image } = body as { name?: string; image?: string };

  if (name !== undefined && name.trim().length < 2) {
    return NextResponse.json(
      { error: "Le prenom doit contenir au moins 2 caracteres." },
      { status: 400 }
    );
  }

  const updates: Record<string, unknown> = { updatedAt: new Date() };
  if (name !== undefined) updates.name = name.trim();
  if (image !== undefined) updates.image = image;

  await db.update(users).set(updates).where(eq(users.id, connected.id));

  return NextResponse.json({ success: true });
}
