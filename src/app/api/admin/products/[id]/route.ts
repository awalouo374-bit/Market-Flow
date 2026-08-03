import { NextResponse } from "next/server";
import { getConnectedUser } from "@/lib/session";
import { deleteProduct } from "@/lib/admin-products";

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getConnectedUser();

  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    await deleteProduct(id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
