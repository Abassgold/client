"use client";

import { Suspense } from "react";
import PaymentStatusClient from "./PaymentStatusClient";

export const dynamic = "force-dynamic"; // prevent pre-render

export default function PaymentStatusPage() {
  return (
    <Suspense fallback={<></>}>
      <PaymentStatusClient />
    </Suspense>
  );
}
