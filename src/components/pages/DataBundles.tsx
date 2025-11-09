"use client";

import React, { useState } from "react";
import { CheckCircleIcon, WifiIcon, XCircleIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui copy/Card";
import { Button } from "../ui copy/Button";
import { Input } from "../ui copy/Input";
import dataPlans from "@/lib/dataplan/dataplans";
import { getNetworkByRegex } from '../verifyNetwork/verifyNextwork';
import axios, { AxiosError } from "axios";
import { getToken } from "@/lib/Token";
import { useRouter } from "next/navigation";
import Link from "next/link";


type NetworkType = "MTN" | "AIRTEL" | "GLO" | "9MOBILE" | "";
type dataRes ={
    msg: string;
    ref: string;
  }
type dataResponse = {
  ok: boolean;
  msg?: string;
  result?: dataRes
}
type DataType = {
  size: string;
  price: number;
  validity: string;
  plan_id: number;
};
type payloadType = {
  size: string;
  price: number;
  validity: string;
  plan_id: number;
  mobile_number: string;
}
export const DataBundles = () => {
  const router = useRouter();
  const [message, setMessage] = useState<dataRes>()
  const [step, setStep] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [selectedNetwork, setSelectedNetwork] = useState<NetworkType>("");
  const [selectedPlanId, setSelectedPlanId] = useState<number | undefined>(undefined);
  const [payload, setPayload] = useState<payloadType>({
    size: '',
    price: 0,
    validity: '',
    plan_id: 0,
    mobile_number: ''
  });
  console.log(payload)
  
  const handleReset = () => {
    setStep('form');
  }
  const handleNetworkChange = (network: NetworkType) => {
    setSelectedNetwork(network);
    setSelectedPlanId(undefined);
  };
  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const res = await axios.post<dataResponse>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/data/buy-data`,
        {
          ...payload,
          network: selectedNetwork
        },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "application/json"
          }
        })
      setMessage(res.data.result ?? undefined)
      setStep('success')
    } catch (error) {
      const err = error as AxiosError;
      if (err.status === 401 || err.status === 404) return router.push('/login')
      console.log(err.status)
      const errorResponse = err.response?.data as dataResponse;
      setError(errorResponse.msg || 'Data purchase could not be completed')
      setStep('error');
    } finally {
      setIsLoading(false)
    }

  }
  const renderConfirmation = () =>
    <div className="fixed inset-0 bg-black opacity-95  flex items-center justify-center z-50">
      <div className=" rounded-xl shadow-xl max-w-sm w-full relative">
        <div className="space-y-4">
          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
            <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-3">
              Transaction Details
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  Network:
                </span>
                <span className="text-sm font-medium text-slate-900 dark:text-white">
                  {getNetworkByRegex(payload.mobile_number)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  Phone Number:
                </span>
                <span className="text-sm font-medium text-slate-900 dark:text-white">
                  {payload.mobile_number}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  Amount:
                </span>
                <span className="text-sm font-medium text-slate-900 dark:text-white">
                  ₦{payload.price}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  Payment Method:
                </span>
                <span className="text-sm font-medium text-slate-900 dark:text-white">
                  Wallet Balance
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  Fee:
                </span>
                <span className="text-sm font-medium text-slate-900 dark:text-white">
                  ₦0.00
                </span>
              </div>
              <div className="border-t border-slate-200 dark:border-slate-700 pt-2 mt-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-slate-900 dark:text-white">
                    Total:
                  </span>
                  <span className="text-sm font-medium text-slate-900 dark:text-white">
                    ₦{payload.price}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex space-x-3">
            <Button variant="slate" onClick={() => setStep('form')} fullWidth>
              Back
            </Button>
            <Button onClick={handleSubmit} fullWidth>
              {isLoading ? 'Wait...' : 'Confirm Payment'}
            </Button>
          </div>
        </div>
      </div>
    </div>

  const renderSuccess = () =>
    <div className="fixed inset-0 bg-black opacity-95  flex items-center justify-center z-50">
      <div className=" rounded-xl shadow-xl max-w-sm w-full relative">
        <div className="text-center bg-slate-100 dark:bg-slate-800 p-2 rounded-md">
          <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mb-4">
            <CheckCircleIcon size={32} />
          </div>
          <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
            Data Activated
          </h3>

          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
            {message?.msg}
          </p>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mb-6">
            <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-2">
              Transaction Details
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  Transaction ID:
                </span>
                <span className="text-sm font-medium text-slate-900 dark:text-white">
                  {message?.ref}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  Date:
                </span>
                <span className="text-sm font-medium text-slate-900 dark:text-white">
                  {new Date().toLocaleString()}
                </span>
              </div>
            </div>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={handleReset} fullWidth>
              New Transaction
            </Button>
            <Button fullWidth>
              Download Receipt
            </Button>
          </div>
        </div>
      </div>
    </div>

  const renderError = () =>
    <div className="fixed inset-0 bg-black opacity-95  flex items-center justify-center z-50">
      <div className=" rounded-xl shadow-xl max-w-sm w-full relative">
        <div className="text-center bg-slate-100 dark:bg-slate-800 p-2 rounded-md">
          <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 mb-4">
            <XCircleIcon size={32} />
          </div>
          <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
            Transaction Failed
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
            Your data subscription could not be completed. Please try
            again.
          </p>
          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mb-6">
            <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-2">
              Error Details
            </h4>
            <p className="text-sm text-red-600 dark:text-red-400">
              {error}
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={handleReset} fullWidth>
              Try Again
            </Button>

            <Button variant="outline" fullWidth>
              <Link
                className="w-full h-full"
                target="_blank"
                href="https://wa.me/qr/BHKITMXTHP2PE1"
              >
                Contact Support
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>

  const renderStep = (step: string) => {
    switch (step) {

      case 'confirm':
        return renderConfirmation();
      case 'success':
        return renderSuccess();
      case 'error':
        return renderError();
      default:
        return '';
    }
  };

  return (
    <div>
      {renderStep(step)}
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Data Bundles</h1>
      <div className="">
        {/* LEFT SIDE FORM */}
        <div className="">
          <Card>
            <CardHeader>
              <CardTitle>Purchase Data</CardTitle>
              <CardDescription>Select a network and data plan</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={(e) => {
                e.preventDefault();
                setStep("confirm");
              }}
              >
                {/* SELECT NETWORK */}
                <div>
                  <label className="block text-sm font-medium text-slate-900 dark:text-slate-200 mb-1">
                    Network Provider
                  </label>
                  <select
                    value={selectedNetwork}
                    onChange={(e) => handleNetworkChange(e.target.value as NetworkType)}
                    className="block w-full px-3 py-2 border rounded-md bg-white dark:bg-slate-900 dark:text-white"
                  >

                    <option value="">Select Network</option>
                    <option value="MTN">MTN</option>
                    <option value="AIRTEL">AIRTEL</option>
                    <option value="GLO">GLO</option>
                    <option value="9MOBILE">9MOBILE</option>
                  </select>
                </div>

                {/* PHONE NUMBER INPUT */}
                <Input
                  label="Phone Number"
                  type="tel"
                  placeholder="Enter mobile number"
                  leftIcon={<WifiIcon size={16} />}
                  fullWidth
                  required
                  onChange={(e) => {
                    setPayload((prev) => ({
                      ...prev,
                      mobile_number: e.target.value,
                    }))
                  }}
                />
                {/* SELECT PLAN */}
                <div>
                  <label className="block text-sm font-medium text-slate-900 dark:text-slate-200 mb-1">
                    Select Plan
                  </label>
                  <select
                    disabled={!selectedNetwork || isLoading}
                    value={selectedPlanId}
                    onChange={(e) => {
                      const id = Number(e.target.value);
                      setSelectedPlanId(id);

                      if (selectedNetwork) {
                        const selectedPlan = dataPlans[selectedNetwork].find(
                          (plan) => plan.plan_id === id
                        );
                        if (selectedPlan) {
                          setPayload((prev) => ({
                            ...prev,
                            size: selectedPlan.size,
                            price: selectedPlan.price,
                            validity: selectedPlan.validity,
                            plan_id: selectedPlan.plan_id,
                          }));
                        }
                      }
                    }}
                    className="block w-full px-3 py-2 border rounded-md bg-white dark:bg-slate-900 dark:text-white"
                  >
                    <option value="">Select Plan</option>
                    {selectedNetwork &&
                      dataPlans[selectedNetwork].map((plan: DataType) => (
                        <option key={plan.plan_id} value={plan.plan_id}>
                          {plan.size} - ₦{plan.price} ({plan.validity})
                        </option>
                      ))}
                  </select>
                </div>
                <Button type="submit" fullWidth disabled={!selectedPlanId}>Continue</Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT SIDE DISPLAY OF PLANS */}

      </div>
    </div>
  );
};
