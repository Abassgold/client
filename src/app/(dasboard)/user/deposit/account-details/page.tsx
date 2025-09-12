"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import { getToken } from "@/lib/Token";

interface AccountDetails {
  accountName: string;
  accountNumber: string;
  bankName: string;
}

export default function AccountDetailsPage() {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [bankAccounts, setBankAccounts] = useState<AccountDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/wallet/paymentPoint/generate-account-details`,
          {
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          }
        );

        setBankAccounts(response.data.bankAccounts || []);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch account details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAccountDetails();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-2">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-xl rounded-xl border-0 bg-white/90 backdrop-blur-md bg">
          <CardContent className="p-4">
            <h1 className="md:text-xl font-bold text-center text-teal-800 mb-4">
              Your FloZap Account Details
            </h1>

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

            {loading && <p className="text-center text-gray-500">Loading account details...</p>}
            {error && <p className="text-center text-red-600">{error}</p>}

            {!loading &&
              bankAccounts.map((acc, index) => (
                <div
                  key={index}
                  className="mb-4 border border-gray-200 rounded-lg p-3 bg-gray-50 shadow-sm"
                >
                  <h3 className="text-sm font-semibold text-teal-700 mb-2">
                    Account Option {index + 1}
                  </h3>

                  {/* Account Name */}
                  <div className="mb-2 flex items-center justify-between bg-white p-2.5 rounded-lg">
                    <div>
                      <p className="text-xs text-gray-500">Account Name</p>
                      <p className="font-semibold text-gray-800">{acc.accountName}</p>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleCopy(acc.accountName, `accountName-${index}`)}
                    >
                      <Copy className="h-5 w-5 text-gray-600" />
                    </Button>
                  </div>
                  {copiedField === `accountName-${index}` && (
                    <p className="text-green-600 text-xs mb-1">Copied!</p>
                  )}

                  {/* Account Number */}
                  <div className="mb-2 flex items-center justify-between bg-white p-2.5 rounded-lg">
                    <div>
                      <p className="text-xs text-gray-500">Account Number</p>
                      <p className="font-semibold text-gray-800">{acc.accountNumber}</p>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleCopy(acc.accountNumber, `accountNumber-${index}`)}
                    >
                      <Copy className="h-5 w-5 text-gray-600" />
                    </Button>
                  </div>
                  {copiedField === `accountNumber-${index}` && (
                    <p className="text-green-600 text-xs mb-1">Copied!</p>
                  )}

                  {/* Bank Name */}
                  <div className="mb-2 flex items-center justify-between bg-white p-2.5 rounded-lg">
                    <div>
                      <p className="text-xs text-gray-500">Bank Name</p>
                      <p className="font-semibold text-gray-800">{acc.bankName}</p>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleCopy(acc.bankName, `bankName-${index}`)}
                    >
                      <Copy className="h-5 w-5 text-gray-600" />
                    </Button>
                  </div>
                  {copiedField === `bankName-${index}` && (
                    <p className="text-green-600 text-xs mb-1">Copied!</p>
                  )}
                </div>
              ))}

            {!loading && bankAccounts.length === 0 && (
              <p className="text-center text-gray-500">No account details found.</p>
            )}

            <p className="text-center text-xs text-gray-500 mt-2">
              Use any of the above details anytime to fund your FloZap wallet.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
