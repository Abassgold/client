import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export interface SentType {
  ok: boolean;
  msg?: string;
  user?: string;
}

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const Verify = async (props: { searchParams: SearchParams }) => {
  const referer = (await headers()).get("referer");
  const searchParams = await props.searchParams;
  const token = searchParams.token;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/verify-email?token=${token}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        cache: "no-store",
      },
    }
  );

  const data: SentType = await res.json();

  if (res.status === 401 || !data?.ok) {
    if (referer) return redirect(referer);
    return redirect("/");
  }

  if (data.ok) {
    return (
      <section className="h-screen flex flex-col items-center justify-center bg-zinc-100 px-4 text-center">
        {/* Logo */}
        <div className="mb-6">
          <Image
            src="/myflozap_logo.png"
            alt="floZap-logo"
            width={200}
            height={80}
            className="mx-auto md:hidden block"
          />
          <Image
            src="/myflozap_logo.png"
            alt="floZap-logo"
            width={280}
            height={100}
            className="mx-auto hidden md:block"
          />
        </div>

        {/* Success Message */}
        <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-md">
          <h1 className="text-2xl font-bold text-teal-700 mb-2">
            🎉 Account Verified Successfully!
          </h1>
          <p className="text-gray-600 mb-6">
            Your email has been confirmed. You can now log in to your account.
          </p>
          <Link
            href="/login"
            className="inline-block bg-teal-500 text-white px-5 py-2 rounded-lg font-medium hover:bg-teal-600 transition"
          >
            Proceed to Sign In
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="h-screen flex flex-col items-center justify-center bg-red-50 px-4 text-center">
      {/* Failure Message */}
      <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-red-600 mb-2">
          ❌ Verification Failed
        </h1>
        <p className="text-gray-600 mb-6">
          Sorry, we couldn&apos;t verify your account. The link may be invalid or expired.
        </p>
        <Link
          href="/"
          className="inline-block bg-gray-700 text-white px-5 py-2 rounded-lg font-medium hover:bg-gray-800 transition"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
};

export default Verify;
