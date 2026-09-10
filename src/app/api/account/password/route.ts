import { NextResponse } from "next/server";
import { getConnectedUser } from "@/lib/session";
import { auth } from "@/auth";
import { headers } from "next/headers";

export async function POST(request: Request) {
  const connected = await getConnectedUser();
  if (!connected) {
    return NextResponse.json({ error: "Non authentifie" }, { status: 401 });
  }

  const body = await request.json();
  const { currentPassword, newPassword } = body as {
    currentPassword?: string;
    newPassword?: string;
  };

  if (!newPassword || newPassword.length < 8) {
    return NextResponse.json(
      { error: "Le nouveau mot de passe doit contenir au moins 8 caracteres." },
      { status: 400 }
    );
  }

  try {
    await auth.api.changePassword({
      headers: await headers(),
      body: {
        currentPassword: currentPassword ?? "",
        newPassword,
        revokeOtherSessions: false,
      },
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Erreur lors du changement de mot de passe.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
