import { redirect } from "next/navigation";
import { getConnectedUser } from "@/lib/session";
import AdminClientLayout from "./AdminClientLayout";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getConnectedUser();

  // Not logged in — redirect to login
  if (!user) {
    redirect("/login");
  }

  // Not an admin — redirect to unauthorized page
  if (user.role !== "admin") {
    redirect("/unauthorized");
  }

  return <AdminClientLayout>{children}</AdminClientLayout>;
}
