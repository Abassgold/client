'use client';

import axios, { AxiosError } from 'axios';
import { SaveIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getToken } from '@/lib/Token';
import { toast } from 'sonner';
type priceResponse = {
  ok: boolean;
  msg: string;
}
interface fetchPriceResponse {
  ok: boolean;
  msg?: string;
  price?: PriceInput;
}
type PriceInput = {
  price: number;
  gain: number;
};

const PriceManagement: React.FC = () => {
  const router = useRouter();
  const [virtualNumber, setVirtualNumber] = useState<PriceInput>({ price: 0, gain: 0 });
  const [price, setPrice] = useState<number>()
  const [gain, setGain] = useState<number>()
  const [loading, setLoading] = useState(false);

  const handleSaveChanges = async () => {
    setLoading(true)
    const token = getToken();
    try {
      const { data } = await axios.post<priceResponse>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/set-price/ngn`,
        virtualNumber,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      if (!data.ok) return toast.error(data.msg)
      toast.success(data.msg)
      router.refresh()
    } catch (error: unknown) {
      const err = error as AxiosError
      if (err.response?.status === 401) return router.push('/login')
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  };
  useEffect(() => {
    const fetchPrices = async () => {
      setLoading(true)
      try {
        const { data } = await axios.get<fetchPriceResponse>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/get-prices`,
          {
            headers: {
              Authorization: `Bearer ${getToken()}`
            }
          }
        )
        if (!data.ok) return toast.error(data.msg)
        setPrice(data.price?.price)
        setGain(data.price?.gain)
      } catch (error: unknown) {
        const err = error as AxiosError
        if (err.response?.status === 401) return router.push('/login')
        toast.error('Something went wrong')
      } finally {
        setLoading(false)
      }
    };
    fetchPrices();
  }, [])
  return (
    <div className=" max-w-4xl mx-auto">
      
      <div className="sm:flex sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">Price Management</h1>
          <p className="mt-2  text-gray-700">Update prices for all FloZap services.</p>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-medium mb-4">Virtual Number Pricing</h2>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price: ₦{price}</label>
              <input
                type="number"
                value={virtualNumber.price}
                onChange={(e) =>
                  setVirtualNumber({ ...virtualNumber, price: Number(e.target.value) })
                }
                className="border-gray-300 p-2 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm rounded-md"
                placeholder="Enter price"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gain: ₦{gain}</label>
              <input
                type="number"
                value={virtualNumber.gain}
                onChange={(e) =>
                  setVirtualNumber({ ...virtualNumber, gain: Number(e.target.value) })
                }
                className="border-gray-300 p-2 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm rounded-md"
                placeholder="Enter gain"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleSaveChanges}
              disabled={loading}
              className={` cursor-pointer inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${loading ? 'bg-teal-400 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-700'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500`}
            >
              {loading ? (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
              ) : (
                <SaveIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              )}
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PriceManagement;
