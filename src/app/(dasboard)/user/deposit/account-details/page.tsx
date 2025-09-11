'use client';
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { motion } from "framer-motion";

export default function AccountDetailsPage() {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const accountDetails = {
    accountName: "John Doe",
    accountNumber: "1234567890",
    bankName: "Wema Bank",
  };

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-2">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-xl rounded-xl border-0 bg-white/90 backdrop-blur-md">
          <CardContent className="p-4">
            <h1 className="md:text-xl font-bold text-center text-teal-800 mb-4">
              Your FloZap Account Details
            </h1>

            {/* Instructions */}
            <div className="mb-4 bg-[#F3F2FF] border border-[#E0DFFF] rounded-lg p-3 text-sm text-gray-700">
              <h2 className="font-semibold text-teal-700 mb-2">Instructions:</h2>
              <ul className="list-disc list-inside space-y-1 text-xs md:text-base">
                <li>Use these account details to fund your FloZap wallet at any time.</li>
                <li>Make sure the account name matches before making payment.</li>
                <li>Transfer only from your registered bank account for faster confirmation.</li>
                <li>Your wallet will be credited automatically after successful transfer.</li>
                <li>If you face any delay, contact support with your transaction reference.</li>
              </ul>
            </div>

            {/* Account Name */}
            <div className="mb-2 flex items-center justify-between bg-gray-50 p-2.5 rounded-lg">
              <div>
                <p className="text-xs text-gray-500">Account Name</p>
                <p className="font-semibold text-gray-800">
                  {accountDetails.accountName}
                </p>
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => handleCopy(accountDetails.accountName, "accountName")}
              >
                <Copy className="h-5 w-5 text-gray-600" />
              </Button>
            </div>
            {copiedField === "accountName" && (
              <p className="text-green-600 text-xs mb-1">Copied!</p>
            )}

            {/* Account Number */}
            <div className="mb-2 flex items-center justify-between bg-gray-50 p-2.5 rounded-lg">
              <div>
                <p className="text-xs text-gray-500">Account Number</p>
                <p className="font-semibold text-gray-800">
                  {accountDetails.accountNumber}
                </p>
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => handleCopy(accountDetails.accountNumber, "accountNumber")}
              >
                <Copy className="h-5 w-5 text-gray-600" />
              </Button>
            </div>
            {copiedField === "accountNumber" && (
              <p className="text-green-600 text-xs mb-1">Copied!</p>
            )}

            {/* Bank Name */}
            <div className="mb-4 flex items-center justify-between bg-gray-50 p-2.5 rounded-lg">
              <div>
                <p className="text-xs text-gray-500">Bank Name</p>
                <p className="font-semibold text-gray-800">
                  {accountDetails.bankName}
                </p>
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => handleCopy(accountDetails.bankName, "bankName")}
              >
                <Copy className="h-5 w-5 text-gray-600" />
              </Button>
            </div>
            {copiedField === "bankName" && (
              <p className="text-green-600 text-xs mb-1">Copied!</p>
            )}

            <p className="text-center text-xs text-gray-500">
              Use the above details anytime to fund your FloZap wallet.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
