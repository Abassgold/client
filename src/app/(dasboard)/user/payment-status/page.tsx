"use client";

// import { useEffect } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import { toast } from "sonner";

export default function PaymentStatusPage() {
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   useEffect(() => {
//     const status = searchParams.get("status");
//     const reference = searchParams.get("reference");

//     if (status === "success") {
//       toast.success(`Payment successful! Ref: ${reference}`);
//     } else if (status === "failed") {
//       toast.error("Payment failed ❌, please try again.");
//     } else {
//       toast("⚠️ Payment status unknown");
//     }

//     // Optional: redirect after a delay
//     const timer = setTimeout(() => {
//       if (status === "success") {
//         router.push("/user/dashboard");
//       } else {
//         router.back();
//       }
//     }, 3000);

//     return () => clearTimeout(timer);
//   }, [searchParams, router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <p className="text-xl font-semibold">Checking payment status...</p>
    </div>
  );
}
