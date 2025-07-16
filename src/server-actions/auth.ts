"use server";

import { signOut } from "@/auth";

export async function signOutServerAction() {
  await signOut({
    redirect: true,
    redirectTo: "/login",
  });
}
