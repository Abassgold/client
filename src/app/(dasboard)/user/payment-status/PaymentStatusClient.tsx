"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";

interface PaymentStatusResponse {
  status: string;
}

export default function PaymentStatusClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const reference = searchParams.get("reference") ?? "";

  useEffect(() => {
    if (!reference) return;

    const verifyPaymentStatus = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/wallet/kora/verify-payment-status?reference=${reference}`
        );
        const data: PaymentStatusResponse = await res.json();

        if (data.status === "success") {
          toast.success("Payment successful!");
          router.push("/user/dashboard");
        } else if (data.status === "failed") {
          toast.error("Payment failed ❌, please try again.");
          router.push("/user/deposit/korapay");
        } else if (data.status === "pending") {
          toast("⚠️ Payment pending...");
          router.push("/user/deposit/korapay");
        } else {
          toast("⚠️ Payment status unknown");
          router.push("/user/deposit/korapay");
        }
      } catch (error) {
        console.error("Payment verification error:", error);
        toast.error("An error occurred while verifying payment.");
        router.push("/user/deposit/korapay");
      }
    };

    verifyPaymentStatus();
  }, [reference, router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <p className="text-sm md:text-xl font-semibold">
        Checking payment status...
      </p>
    </div>
  );
}
