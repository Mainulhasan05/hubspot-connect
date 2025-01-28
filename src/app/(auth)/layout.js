// src/app/(auth)/layout.js
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export default async function AuthLayout({ children }) {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  return <>{children}</>;
}
