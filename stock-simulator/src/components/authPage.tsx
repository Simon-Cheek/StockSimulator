"use client";
import Cookies from "js-cookie";
import { useEffect } from "react";

type AuthProps = {
  children: React.ReactNode;
};

export function AuthPage({ children }: AuthProps) {
  useEffect(() => {
    async function authenticateUser() {
      console.log(Cookies.get());
      const userID = Cookies.get("stockSimUser");
      console.log(userID);
      if (!userID) {
        window.location.href = "/login";
        return;
      }
      const res = await fetch(`/api/user/${userID}`);
      if (!res.ok) {
        window.location.href = "/login";
      }
    }

    authenticateUser();
  }, []);

  return <>{children}</>;
}
