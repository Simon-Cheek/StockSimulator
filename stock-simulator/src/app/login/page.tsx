"use client";
import { H2 } from "@/components/headers";
import { InputForm } from "@/components/textInput";
import { register } from "@/functions/register";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
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
          await register(name, amount);
          router.push("/");
        }}
        firstText="Username"
        secondText="Password"
      />
    </div>
  );
}
