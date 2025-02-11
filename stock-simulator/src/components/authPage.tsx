"use client";
import Cookies from "js-cookie";
import { useEffect } from "react";

type AuthProps = {
  children: React.ReactNode;
};

export function AuthPage({ children }: AuthProps) {
  useEffect(() => {
    async function authenticateUser() {
      const userID = Cookies.get("stockSimUser");
      if (!userID) {
        window.location.href = "/login";
        return;
      }
      const res = await fetch(`/api/users/${userID}`);
      if (!res.ok) {
        window.location.href = "/login";
      }
    }

    authenticateUser();
  }, []);

  return <>{children}</>;
}
