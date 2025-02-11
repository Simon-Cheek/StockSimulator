"use client";
import { Button } from "./button";

async function logout() {
  await fetch("/api/logout", {
    method: "POST",
  });
}

export function LogoutButton() {
  return (
    <Button href="/login" onClick={logout}>
      Logout
    </Button>
  );
}
