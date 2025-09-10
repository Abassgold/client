import Link from "next/link";
import React from "react";

export default function PaymentSupportNotice() {
  const whatsappNumber = "+2348103875405";
  const waLink = `https://wa.me/${whatsappNumber.replace("+", "")}?text=${encodeURIComponent(
    "Hello, I’m having issues funding my wallet. Please assist."
  )}`;

  return (
    <div className="mt-6 p-4 rounded-xl border bg-white shadow-sm">
      <h3 className="text-base font-semibold text-gray-800">
        Having trouble funding your wallet?
      </h3>
      <p className="mt-1 text-sm text-gray-600">
        If you’re experiencing issues, please contact our support team on
        WhatsApp and we’ll help you complete the payment.
      </p>

      <div className="mt-3 flex items-center gap-3">
        <Link
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-lg bg-teal-500 text-white text-sm font-medium shadow hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
        >
          Message us on WhatsApp
        </Link>

        <span className="text-sm text-gray-700">
          or call <strong>{whatsappNumber}</strong>
        </span>
      </div>
    </div>
  );
}
