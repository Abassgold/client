import Link from "next/link";
import React from "react";
import VerificationButton from "./VerificationButton";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Image from "next/image";

interface SentType {
  ok: boolean;
  msg?: string;
  user?: string;
}

const Verification = async () => {
  const token = (await cookies()).get("accessToken")?.value;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/verification`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  const data: SentType = await res.json();
  const mail = data?.user || "your email";

  if (res.status === 401 || !data?.ok) {
    return redirect("/login");
  }

  return (
    <section className="p-4 h-screen text-center bg-zinc-100">
      <div className="max-w-xl mx-auto h-full flex items-center">
        <div className="w-full">
          <Image
            src="/myflozap_logo.png"
            alt="floZap-logo"
            width={250}
            height={100}
            className="mx-auto md:hidden block"
          />
          <Image
            src="/myflozap_logo.png"
            alt="floZap-logo"
            width={350}
            height={100}
            className="mx-auto hidden md:block"
          />

          <h1 className="font-semibold text-xl md:text-2xl text-gray-700 mt-6">
            Please verify your email
          </h1>

          <p className="mt-4 mb-6 font-medium text-gray-600">
            We&apos;ve sent an email verification link to{" "}
            <span className="font-semibold">
              <strong className="text-gray-800 italic">{mail}</strong>
            </span>
            . Kindly check your inbox or spam folder and click the link to
            activate your account.
          </p>

          <div>
            <Link
              href="/login"
              className="underline underline-offset-2 mx-auto text-gray-600 p-2"
            >
              Proceed to Sign In
            </Link>
            <p className="text-sm mt-4 text-gray-500">
              Didn&apos;t get the email?{" "}
              <VerificationButton>resend</VerificationButton>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Verification;
