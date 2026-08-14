import { auth } from "@/auth";
import { headers } from "next/headers";
import { db } from "@/db";
import { sessions, users } from "@/db/schema";
import { eq, gte, and } from "drizzle-orm";

export interface ConnectedUserInfo {
  id: string;
  name: string | null;
  email: string;
  role: "admin" | "manager" | "customer";
  status: "active" | "suspended";
  image: string | null;
  sessionToken: string | null;
}

/**
 * Retrieves the currently connected user and active session token.
 */
export async function getConnectedUser(): Promise<ConnectedUserInfo | null> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.email) {
    return null;
  }

  // Look up user from database
  const user = await db.query.users.findFirst({
    where: eq(users.email, session.user.email),
  });

  if (!user) return null;

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: (user.role as "admin" | "manager" | "customer") || "customer",
    status: (user.status as "active" | "suspended") || "active",
    image: user.image,
    sessionToken: session.session.token,
  };
}

/**
 * Looks up a connected user directly from the database sessions table using a sessionToken.
 */
export async function getConnectedUserByToken(sessionToken: string) {
  if (!sessionToken) return null;

  const activeSession = await db.query.sessions.findFirst({
    where: and(
      eq(sessions.token, sessionToken),
      gte(sessions.expiresAt, new Date())
    ),
  });

  if (!activeSession) return null;

  const user = await db.query.users.findFirst({
    where: eq(users.id, activeSession.userId),
  });

  if (!user) return null;

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      image: user.image,
    },
    sessionToken: activeSession.token,
    expires: activeSession.expiresAt,
  };
}

/**
 * Helper to get only the active session token string of the connected user.
 */
export async function getActiveSessionToken(): Promise<string | null> {
  const connected = await getConnectedUser();
  return connected?.sessionToken || null;
}
