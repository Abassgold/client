interface walletDetails {
      ok: boolean,
      wallet: {
        address: string;
        qrCode: string;
        network: string;
      }
}
import {
  AlertCircleIcon,
  InfoIcon,
} from 'lucide-react'
import { Button } from '@/components/ui copy/Button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui copy/Card';
import CopyWallet from './CopyWallet';
import { cookies } from 'next/headers';
const DepositCrypto = async() => {
 const token = (await cookies()).get('accessToken')?.value;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/wallet/get-wallet/cryptomus`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
})

if (!res.ok) {
  throw new Error(`Request failed: ${res.status}`)
}

const data: walletDetails = await res.json()

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Deposit USDT
        </h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Deposit USDT to Your Wallet</CardTitle>
          <CardDescription>
            Send USDT to the address below to fund your FloZap wallet
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center py-4">
            <div className="bg-white p-4 rounded-lg mb-4">
              <img src={data.wallet.qrCode} alt="" />
              {/* <QrCode
                value={currentAddress}
                size={200}
                style={{
                  height: 'auto',
                  maxWidth: '100%',
                  width: '100%',
                }}
                viewBox={`0 0 256 256`}
              /> */}
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
              Scan this QR code with your wallet app
            </p>
          </div>
          {/* Wallet Address */}
          <div>
            <label className="block text-sm font-medium text-slate-900 dark:text-white mb-1">
              USDT Wallet Address TRC20
            </label>
            <div className="flex">
              <div className="flex-grow bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-l-md p-3">
                <p className="text-sm text-slate-900 dark:text-white font-mono break-all">
                  {data.wallet.address}
                </p>
              </div>
             <CopyWallet currentAddress={data.wallet.address}/>
            </div>
          </div>
          {/* Warning Messages */}
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
            <div className="flex">
              <AlertCircleIcon
                size={20}
                className="text-amber-600 dark:text-amber-500 mt-0.5 mr-3 flex-shrink-0"
              />
              <div>
                <h4 className="text-sm font-medium text-amber-800 dark:text-amber-500 mb-1">
                  Important Information
                </h4>
                <ul className="text-sm text-amber-700 dark:text-amber-400 space-y-1 list-disc pl-4">
                  <li>
                    Only send USDT via the TRC20 {' '}
                    network to this address
                  </li>
                  <li>
                    Sending any other token may result in permanent loss of
                    funds
                  </li>
                  <li>Minimum deposit: 10 USDT</li>
                </ul>
              </div>
            </div>
          </div>
          {/* Processing Information */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex">
              <InfoIcon
                size={20}
                className="text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0"
              />
              <div>
                <h4 className="text-sm font-medium text-blue-800 dark:text-blue-400 mb-1">
                  Processing Time
                </h4>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Your deposit will be credited automatically after 1-5 confirmations. This typically takes 1-5 minutes depending on network congestion.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="w-full bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
            <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-2">
              Need Help?
            </h4>
            <a
              target="_blank"
              href="https://wa.me/qr/BHKITMXTHP2PE1"
              className="text-sm text-slate-600 dark:text-slate-400 block"
            >
              If you need assistance with your deposit, please contact our
              support team.
            </a>
            <Button variant="outline" className="mt-3" size="sm">
              Contact Support
            </Button>
          </div>
        </CardFooter>
      </Card>
      {/* How to deposit guide */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>How to Deposit USDT</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex">
              <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-700 dark:text-teal-400 mr-3 flex-shrink-0">
                <span className="text-sm font-bold">1</span>
              </div>
              <div>
                <h4 className="text-sm font-medium text-slate-900 dark:text-white">
                  Select the Network
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Choose the network you want to use for the transfer. We
                  recommend TRC20 for lower fees.
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-700 dark:text-teal-400 mr-3 flex-shrink-0">
                <span className="text-sm font-bold">2</span>
              </div>
              <div>
                <h4 className="text-sm font-medium text-slate-900 dark:text-white">
                  Copy the Address or Scan the QR Code
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Use the copy button to copy the wallet address or scan the QR
                  code with your wallet app.
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-700 dark:text-teal-400 mr-3 flex-shrink-0">
                <span className="text-sm font-bold">3</span>
              </div>
              <div>
                <h4 className="text-sm font-medium text-slate-900 dark:text-white">
                  Send USDT from Your Wallet
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Go to your wallet app and send USDT to the copied address.
                  Make sure you&apos;re sending on the correct network.
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-700 dark:text-teal-400 mr-3 flex-shrink-0">
                <span className="text-sm font-bold">4</span>
              </div>
              <div>
                <h4 className="text-sm font-medium text-slate-900 dark:text-white">
                  Wait for Confirmation
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Once the transaction is confirmed on the blockchain, your
                  FloZap wallet will be credited automatically.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


export default DepositCrypto;