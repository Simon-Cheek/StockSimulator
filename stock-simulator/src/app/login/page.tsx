"use client";
import { H2 } from "@/components/headers";
import { InputForm } from "@/components/textInput";
import { register } from "@/functions/register";
import { useRouter } from "next/router";

async function submit(data: { name: string; amount: string }) {
  const router = useRouter();
  await register(data.name, data.amount);
  router.push("/");
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
        onClick={submit}
        firstText="Username"
        secondText="Password"
      />
    </div>
  );
}
