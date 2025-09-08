"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";

export default function PaymentStatusPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
const status = searchParams.get("status");
    const reference = searchParams.get("reference");
    console.log(status, reference);

  useEffect(() => {
    const verifyPaymentStatus = async () => {
      // Simulate an API call to verify payment status
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/wallet/kora/verify-payment-status?reference=${reference}`);
      const data = await res.json();
      console.log(status, reference);
      if (status === "success") {
        toast.success(`Payment successful! Ref: ${reference}`);
      } else if (status === "failed") {
        toast.error("Payment failed ❌, please try again.");
    } else {
      toast("⚠️ Payment status unknown");
    }

    // Optional: redirect after a delay
    const timer = setTimeout(() => {
      if (status === "success") {
        router.push("/user/dashboard");
      } else {
        router.back();
      }
    }, 3000);

    return () => clearTimeout(timer);
  }
    verifyPaymentStatus();
  }, [searchParams, router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <p className="text-xl font-semibold">Checking payment status...</p>
    </div>
  );
}
