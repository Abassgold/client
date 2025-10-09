import { Copy } from 'lucide-react';
import { useState } from 'react';
import PurchaseNumberModalSkeleton from './PurchaseNumberSkeleton';
interface PurchaseNumberModalProps {
  service?: string;
  country?: string;
  number?: string;
  otp?: string;
  timeout: number | null | string;
  onClose: () => void;
  markAsDone:()=>void;
  canCel:()=>void
  isCancelling: boolean;
}
const PurchaseNumberModal = (
  {
    service,
    country,
    number,
    otp,
    timeout,
    onClose,
    markAsDone,
    canCel,
    isCancelling
  }: PurchaseNumberModalProps
) => {
  const [copiedField, setCopiedField] = useState('');


  const done = async() => {
    await markAsDone()
    await onClose()
  }

  
  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(field);
      setTimeout(() => setCopiedField(''), 2000);
    });
  };
  if (!number) return (
    <PurchaseNumberModalSkeleton />
  )
  return (
    <div className="p-4">
      <div className="fixed inset-0 bg-black opacity-95  flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6 relative">
          <h2 className="text-teal-800 text-lg font-bold mb-6 text-center">
            Number Purchase Details
          </h2>
          <div className="space-y-4 text-sm">
            {/* Service */}
            <div className="flex justify-between text-gray-900">
              <span className="">Service:</span>
              <span className="font-medium">{service}</span>
            </div>
            {/* Country */}
            <div className="flex justify-between text-gray-900">
              <span className="">Country:</span>
              <span className="font-medium">{country}</span>
            </div>
            <div className="flex justify-between text-gray-900">
              <span className="">Time-left:</span>
              <span className="font-medium">{timeout}</span>
            </div>
            {/* Number */}
            <div>
              <div className="flex justify-between items-center text-gray-900">
                <span className="text-gray-900">Number:</span>
                <span className="font-medium flex gap-1 items-center">
                  {number}
                  <button
                    onClick={() => copyToClipboard(number, 'number')}
                    className="mt-1  text-teal-800 cursor-pointer"
                  >
                    {copiedField === 'number' ? 'Copied!' : <Copy size={20} />}
                  </button>
                </span>
              </div>

            </div>

            {/* Status */}
            <div className="flex justify-between text-gray-900">
              <span className="">Status:</span>
              <span className="font-medium">{otp ? 'OTP Received' : 'Waiting for OTP...'}</span>
            </div>

            {/* OTP */}
            {otp ? (
              <div>
                <div className="flex justify-between items-center text-gray-900">
                  <span className="">OTP:</span>
                  <span className="font-semibold text-green-700 flex items-center gap-1">
                    {otp}
                    <button
                      onClick={() => copyToClipboard(otp, 'otp')}
                      className="mt-1  text-teal-800  cursor-pointer"
                    >
                      {copiedField === 'otp' ? 'Copied!' : <Copy size={20}
                      />}
                    </button>
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center animate-pulse text-gray-900">
                <span className=" h-4 w-fit rounded">OTP:</span>
                <span className="bg-gray-700 h-4 w-32 rounded"></span>
              </div>
            )}
          </div>
          {!otp || otp === '' ? <button className='mt-6 text-[13px] w-full cursor-pointer bg-red-800 text-white py-2 rounded-md'
          onClick={canCel}
          disabled={isCancelling}
          >
            {isCancelling ? 'Cancelling...' : 'Cancel'}
          </button>: <button
            onClick={done}
            className={`mt-6 text-[13px] w-full cursor-pointer bg-teal-800 text-white py-2 rounded-md`}
          >
            Done
          </button>
          }
        </div>
      </div>
    </div>
  );
};

export default PurchaseNumberModal;
