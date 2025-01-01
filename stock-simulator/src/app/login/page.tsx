"use client";
import { H2 } from "@/components/headers";
import { Separator } from "@/components/separator";
import { InputForm } from "@/components/textInput";
import { useRouter } from "next/navigation";

async function loginUser(userID: string, password: string) {
  const res = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userID: userID, password: password }),
  });
  if (res.ok) {
    window.location.href = "/";
  } else {
    alert("Invalid Login");
  }
}

export default function Login() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <H2>Login</H2>
      <InputForm
        buttonText="Login"
        onClick={async ({ name, amount }) => {
          await loginUser(name, amount);
        }}
        firstText="Username"
        secondText="Password"
        secondButton
      />

      <Separator size="xl" />
      <Separator size="xl" />
    </div>
  );
}
