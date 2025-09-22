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
  const accessCode = searchParams.get("access-code") ?? "";
  useEffect(() => {
    if (!accessCode) return;

    const verifyPaymentStatus = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/wallet/etegram/verify-payment-status?accessCode=${accessCode}`
        );
        const data: PaymentStatusResponse = await res.json();
        
        if (data.status === "success") {
          toast.success("Payment successful!");
          router.push("/user/dashboard");
        } else if (data.status === "failed") {
          toast.error("Payment failed ❌, please try again.");
          router.push("/user/deposit/etegram");
        } else if (data.status === "pending") {
          toast("⚠️ Payment pending...");
          router.push("/user/deposit/etegram");
        } else {
          toast("⚠️ Payment status unknown");
          router.push("/user/deposit/etegram");
        }
      } catch (error) {
        console.error("Payment verification error:", error);
        toast.error("An error occurred while verifying payment.");
        router.push("/user/deposit/etegram");
      }
    };

    verifyPaymentStatus();
  }, [accessCode, router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <p className="text-sm md:text-xl font-semibold">
        Checking payment status...
      </p>
    </div>
  );
}
