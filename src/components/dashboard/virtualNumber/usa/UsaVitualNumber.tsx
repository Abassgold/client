'use client';

import axios, { AxiosError } from "axios";
import { GlobeIcon, ShoppingCart } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from 'react-toastify'
import { getToken } from "@/lib/Token";
import { CardDescription, CardHeader } from "@/components/ui/card";
import { CardTitle } from "@/components/ui copy/Card";
import PurchaseNumberModal from "../PuchaseNumberModal";


//  {
//     serviceID: 'ac',
//     countryCode: '187',
//     name: 'DoorDash',
//     ttl: 180,
//     cost: 1654,
//     count: 100,
//     provider: 'daisy',
//     repeatable: true
//   }
interface NumberInfo {
    number: string;
    activationId: string;
    provider: string;
    cost: string;
    name: string;
    country: string;
}

type purchaseNumberType =  ServiceFull;
type rentalCancelType = {
    ok: boolean;
    msg?: string;
}
interface OtpType {
    ok: boolean;
    msg?: string;
    code: string;
    status: 'pending' | 'completed' | 'cancelled';
}

interface GetNumberResponse {
    ok: boolean;
    msg?: string;
    data?: NumberInfo;
    code?: string;
}





interface ServiceFull {
    serviceID: string;
    countryCode: string;
    name: string;
    ttl: number;
    count: number;
    cost: number;
    repeatable: boolean;
    provider: string;
    country: string;
}




interface ServiceResponse {
    ok: boolean;
    msg?: string;
    result: ServiceFull[];
}

const VirtualNumberServices = () => {
    const router = useRouter();
    const pathname = usePathname();
    const isFirstLoad = useRef(true);
    const [isCancelling, setIsCancelling] = useState(false)
    const [loading, setLoading] = useState(false);
    const [numberInfo, setNumberInfo] = useState<NumberInfo | null>(null);
    const otpRef = useRef<string | null>(null);
    const isPollingActive = useRef(false);
    const [otp, setOtp] = useState<string | null>(null);
    const [timeoutRemaining, setTimeoutRemaining] = useState<string>('00:00');
    const pollingInterval = useRef<NodeJS.Timeout | null>(null);
    const countdownInterval = useRef<NodeJS.Timeout | null>(null);


    const [usaServices, setUsaServices] = useState<ServiceFull[]>([]);
    const [selectedService, setSelectedService] = useState<ServiceFull | null>(null);
    const [searchServices, setSearchServices] = useState('');

    const [price, setPrice] = useState<ServiceFull | null>(null);
    //   const [priceLoading, setPriceLoading] = useState(false);

    const purchaseNumber = async (item: purchaseNumberType, index?: number) => {
        setLoading(true);
        try {
            const { data } = await axios.post<GetNumberResponse>(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/virtual-numbers/purchase/usa-sms`,
                { ...item, index },
                {
                    headers: {
                        Authorization: `Bearer ${getToken()}`
                    }
                }
            );

            if (!data.ok) {
                toast.error(data.msg);
                setLoading(false);
                return;
            }

            setNumberInfo(data.data || null);
            sessionStorage.setItem('numberInfo', JSON.stringify(data.data));

            if (data.data) {
                await pollForSMS(data.data.activationId, data.data.provider);
            } else {
                setLoading(false);
            }

        } catch (error: unknown) {
            const err = error as AxiosError;
            if (err.status === 401) return router.push('/login');
            if (err.status === 403) return router.push('/account-suspended');
            toast.error('Error occurred while trying to rent a number');
            setLoading(false);
        }
    };
    const markAsDone = async (activation?: string) => {
        const activationId = numberInfo?.activationId ?? activation;
        if (numberInfo?.provider.toLocaleLowerCase() === 'daisy') {
            await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/virtual-numbers/markAsDone`, { activationId });
        }
        setLoading(false);
        clearInfo();
    }

    const cancelRental = async (activationId: string, provider: string) => {
        setIsCancelling(true)
        const { data } = await axios.get<rentalCancelType>(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/virtual-numbers/cancelRental/${activationId}`,
            {
                headers: { Authorization: `Bearer ${getToken()}` },
                params: { provider }
            }
        );
        if (data.ok) {
            clearPolling()
            setLoading(false)
            clearInfo();
            setIsCancelling(false)
            toast.success(data.msg);
        } else {
            setIsCancelling(false)
            toast.error(data.msg);
        }
    }


    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    const updateOtp = (code: string | null) => {
        otpRef.current = code;
        setOtp(code);
    };
    const updateCountdownDisplay = (ms: number) => {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const formatted = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        setTimeoutRemaining(formatted);
    };

    const pollForSMS = async (activationId: string, provider: string, initialRemainingTime?: number) => {
        isPollingActive.current = true;
        const pollingDuration = 5 * 60 * 1000;
        const startTime = Date.now();
        let endTime = startTime + pollingDuration;

        if (initialRemainingTime) {
            endTime = startTime + initialRemainingTime;
        } else {
            sessionStorage.setItem('pollStartTime', startTime.toString());
        }

        // Start countdown interval
        if (countdownInterval.current) clearInterval(countdownInterval.current);
        countdownInterval.current = setInterval(async () => {
            const now = Date.now();
            const timeLeft = endTime - now;
            if (timeLeft <= 0) {
                clearInterval(countdownInterval.current!);
                await cancelRental(activationId, provider);
                clearPolling();
                setLoading(false);
                setNumberInfo(null);
                updateOtp(null);
                sessionStorage.removeItem('numberInfo');
                sessionStorage.removeItem('pollStartTime');
                sessionStorage.removeItem('otp');
                setTimeoutRemaining('00:00');
                toast.error('Timeout: No response after 5 minutes.');
                return;
            } else {
                updateCountdownDisplay(timeLeft);
            }
        }, 1000);

        const poll = async () => {
            if (!isPollingActive.current) {
                return;
            }
            try {
                const { data } = await axios.get<OtpType>(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/virtual-numbers/activation/${activationId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${getToken()}`
                        },
                        params: { provider }
                    }
                );

                if (data.status === 'completed') {
                    updateOtp(data.code)
                    sessionStorage.setItem('otp', data.code);
                    // clearPolling();
                    return;
                } else if (data.status === 'cancelled') {
                    clearPolling();
                    setLoading(false)
                    setNumberInfo(null)
                    updateOtp(null);
                    sessionStorage.removeItem('numberInfo');
                    sessionStorage.removeItem('pollStartTime');
                    sessionStorage.removeItem('otp');
                    setTimeoutRemaining('00:00');
                    toast.error('Activation cancelled.');
                    setNumberInfo(null);
                    return;
                } else {
                    await delay(5000);
                    poll();
                }
            } catch (error) {
                clearPolling();
                console.error('Error polling for code:', error);
                toast.error('Error polling for code.');
                setLoading(false)
                setNumberInfo(null)
                updateOtp(null);
                sessionStorage.removeItem('numberInfo');
                sessionStorage.removeItem('pollStartTime');
                sessionStorage.removeItem('otp');
                setTimeoutRemaining('00:00');
            }
        };
        poll();
    };
    const clearPolling = () => {
        isPollingActive.current = false;
        if (pollingInterval.current) clearInterval(pollingInterval.current);
        if (countdownInterval.current) clearInterval(countdownInterval.current);
        pollingInterval.current = null;
        countdownInterval.current = null;
    };
    const clearInfo = () => {
        clearPolling();
        sessionStorage.removeItem('numberInfo');
        sessionStorage.removeItem('otp');
        sessionStorage.removeItem('pollStartTime');
        setTimeoutRemaining('00:00');
        setNumberInfo(null);
        updateOtp(null);
        setLoading(false);
    };

    useEffect(() => {
        const savedNumberStr = sessionStorage.getItem('numberInfo');
        const savedOtp = sessionStorage.getItem('otp');
        const savedStartTime = sessionStorage.getItem('pollStartTime');
        const pollingDuration = 5 * 60 * 1000;
        const now = Date.now();


        const fetchUSAServices = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/virtual-numbers/services/usa`);
            const data: ServiceResponse = await res.json();
            if (data.ok) setUsaServices(data.result);
        };

        if (savedOtp) {
            updateOtp(savedOtp);
        }

        if (savedNumberStr) {
            try {
                const parsedNumber = JSON.parse(savedNumberStr) as NumberInfo;
                setNumberInfo(parsedNumber);

                if (savedStartTime) {
                    const elapsed = now - parseInt(savedStartTime);
                    const remainingTime = pollingDuration - elapsed;

                    if (remainingTime > 0) {
                        const totalSeconds = Math.floor(remainingTime / 1000);
                        const minutes = Math.floor(totalSeconds / 60);
                        const seconds = totalSeconds % 60;
                        const formatted = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
                        setTimeoutRemaining(formatted);

                        if (!savedOtp) {
                            setLoading(true);
                            pollForSMS(parsedNumber.activationId, parsedNumber.provider, remainingTime);
                        }
                    } else {
                        setTimeoutRemaining('00:00');
                        clearPolling();
                        sessionStorage.removeItem('numberInfo');
                        sessionStorage.removeItem('pollStartTime');
                    }
                }
            } catch {
                sessionStorage.removeItem('numberInfo');
                clearPolling();
            }
        }

        fetchUSAServices();

    }, []);

    useEffect(() => {
        if (isFirstLoad.current) {
            isFirstLoad.current = false;
            return;
        }
        sessionStorage.removeItem('numberInfo');
        sessionStorage.removeItem('otp');
        sessionStorage.removeItem('pollStartTime');
        setTimeoutRemaining('00:00');
        setLoading(false);
    }, [pathname]);

    console.log(selectedService)

    const selectService = (service: ServiceFull) => {
        setSelectedService(service);
        setPrice({ ...service });
    };

    const filteredServices = usaServices.filter(s =>
        s.name.toLowerCase().includes(searchServices.toLowerCase())
    );

    return (
        <>
            <section className='text-gray-800 dark:text-white mb-4'>

                {loading && <PurchaseNumberModal
                    service={numberInfo?.name}
                    country={numberInfo?.country}
                    number={numberInfo?.number}
                    otp={otp || ''}
                    timeout={timeoutRemaining}
                    onClose={() => clearInfo()}
                    markAsDone={() => markAsDone()}
                    canCel={() => cancelRental(numberInfo?.activationId ?? '', numberInfo?.provider ?? '')}
                    isCancelling={isCancelling}
                />}
                <div className="border border-zinc-200 rounded-md mb-2">
                    <CardHeader className="bg-[#0f172b] rounded-t-md border-b border-teal-100 dark:border-teal-800/30">
                        <CardTitle className="flex items-center mt-2">
                            <GlobeIcon
                                className="mr-2 text-teal-600 dark:text-teal-400"
                                size={20}
                            />
                            <p className='text-white'>
                                Get a Virtual Number
                            </p>
                        </CardTitle>
                        <CardDescription>
                            Select your preferences to find available numbers
                        </CardDescription>
                    </CardHeader>
                </div>
                {/* Service Selection */}
                {/* bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 */}
                <div className='p-2 border border-zinc-200 rounded-md scroll-mt-24'>
                    <h1 className='py-2'>Select service</h1>
                    <input
                        value={searchServices}
                        onChange={(e) => setSearchServices(e.target.value)}
                        placeholder='Search service'
                        type="text"
                        className='p-2 text-[15px] rounded-md w-full outline-none border border-zinc-200 mb-2'
                        disabled={!!selectedService}
                    />
                    {selectedService ? (
                        <div className='my-4 border border-zinc-200 rounded-md pt-8 pb-4 px-4 relative'>
                            <div>
                                {price !== null ? (
                                    <>
                                        <button
                                            disabled={loading}
                                            onClick={() => purchaseNumber(price)}
                                            className="flex w-full items-center justify-between text-[14px] cursor-pointer text-white gap-3 bg-teal-800 rounded-lg py-2 px-3"
                                        >
                                            <h2 className="text-[12px] font-semibold">{selectedService.name}</h2>
                                            <p className="text-[11px] text-gray-200">
                                                Stock: {price.count ?? 0}
                                            </p>
                                            <div className="flex gap-1 items-center">
                                                <p>₦{price.cost.toLocaleString()}</p>
                                                <ShoppingCart size={16} />
                                            </div>
                                        </button>
                                        <div className="bg-yellow-100 my-3 text-yellow-800 p-3 rounded-md text-sm">
                                            <strong>Note:</strong> Kindly click on the <strong>price above</strong> to receive your number and code. Turn your VPN <strong>on or off</strong> if needed to get your SMS. No code? You’ll get a <strong>full refund</strong>. We aren’t responsible for issues after you receive your code, such as account bans on WhatsApp, Telegram or other platforms.
                                        </div>
                                    </>
                                ) : (
                                    <p>No price available</p>
                                )}
                            </div>
                            <button
                                onClick={() => {
                                    setSelectedService(null);
                                    setPrice(null);
                                }}
                                className='text-red-500 text-xl font-bold px-2 absolute top-0 right-1 cursor-pointer'
                            >
                                ×
                            </button>
                        </div>
                    ) : (
                        <div className="max-h-[30rem] overflow-y-auto my-2 border-zinc-200 rounded-md py-2">
                            <ul>
                                {filteredServices.map((service, index) => (
                                    <li key={index} className='my-2'>
                                        <button
                                            type="button"
                                            onClick={() => selectService(service)}
                                            className='flex items-center justify-between rounded-md p-1 border border-zinc-200 w-full cursor-pointer'
                                        >
                                            <div className='flex items-center gap-2'>
                                                <input type="radio" name="service" readOnly />
                                                <p>{service.name}</p>
                                            </div>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default VirtualNumberServices;
