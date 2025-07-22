'use client';

import axios, { AxiosError } from "axios";
import { ShoppingCart } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import PurchaseNumberModal from "./PuchaseNumberModal";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { getToken } from "@/lib/Token";

interface NumberInfo {
  number: string;
  activationId: string;
  provider: string;
  cost: string;
  name: string;
  country: string;
}

type purchaseNumberType = PriceType | ServiceFull;

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

interface CountryType {
  flags: { png?: string; svg?: string; alt?: string };
  name: { common: string; official: string };
  cca2: string;
  cca3: string;
}

interface PriceType {
  countryID: string;
  cost: string;
  value: number;
  price: number;
  successRate: string;
  name: string;
  stock: number;
  provider: string;
  serviceID: string;
  country: string;
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

interface ServiceBasic {
  ID: number;
  provider: string;
  name: string;
  favourite: number;
  country: string;
}

type ServiceType = ServiceFull | ServiceBasic;

interface ServiceResponse {
  ok: boolean;
  msg?: string;
  result: ServiceType[];
}

const VirtualNumberServices = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isFirstLoad = useRef(true);
  const [loading, setLoading] = useState(false);
  const [numberInfo, setNumberInfo] = useState<NumberInfo | null>(null);
  const otpRef = useRef<string | null>(null);
  const [otp, setOtp] = useState<string | null>(null);
  const [timeoutRemaining, setTimeoutRemaining] = useState<number | string | null>(null);

  const [countries, setCountries] = useState<CountryType[]>([]);
  const [searchCountries, setSearchCountries] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<CountryType | null>(null);

  const [services, setServices] = useState<ServiceType[]>([]);
  const [usaServices, setUsaServices] = useState<ServiceType[]>([]);
  const [otherServices, setOtherServices] = useState<ServiceType[]>([]);
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null);
  const [searchServices, setSearchServices] = useState('');

  const [price, setPrice] = useState<ServiceFull | PriceType[] | null>(null);
  const [priceLoading, setPriceLoading] = useState(false);

  const purchaseNumber = async (item: purchaseNumberType, index?: number) => {
    const token = getToken();
    setLoading(true);
    try {
      const { data } = await axios.post<GetNumberResponse>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/virtual-numbers/purchase/sms`,
        { ...item, index },
        { headers: { Authorization: `Bearer ${token}` } }
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
  const delay = (ms:number) => new Promise((resolve) => setTimeout(resolve, ms));

  const cancelPolling = async (activationId: string, provider: string) => {
    const token = getToken();

    await delay(100000); // delay for 2 seconds before printing

  console.log(token);
    // try {
    //   const { data } = await axios.get<OtpType>(
    //     `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/virtual-numbers/activation/${activationId}`,
    //     { headers: { Authorization: `Bearer ${token}` }, params: { provider } }
    //   );
    //   if (data.ok && data.status === 'completed') {
    //     otpRef.current = data.code;
    //     sessionStorage.setItem('otp', data.code);
    //   } else if (data.status === 'cancelled') {
    //     sessionStorage.removeItem('numberInfo');
    //     sessionStorage.removeItem('otp');
    //     sessionStorage.removeItem('pollStartTime');
    //     toast.error('Activation cancelled. Please try again.');
    //     setTimeoutRemaining(null);
    //     setLoading(false);
    //   }
    // } catch (error) {

    // }
  }

  const updateOtp = (code:string | null) => {
  otpRef.current = code; // for synchronous logic
  setOtp(code);          // for re-rendering UI
};
console.log(otpRef)

  const pollForSMS = async(activationId: string, provider: string) => {
    const token = getToken();
    const pollingDuration = 1 * 60 * 1000;
    let startTime = parseInt(sessionStorage.getItem('pollStartTime') || '0');

    if (!startTime) {
      startTime = Date.now();
      sessionStorage.setItem('pollStartTime', startTime.toString());
    }

    let timeLeft = pollingDuration - (Date.now() - startTime);


    // Countdown display function
    const updateCountdownDisplay = (ms: number) => {
      const totalSeconds = Math.floor(ms / 1000);
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      const formatted = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      setTimeoutRemaining(formatted);
    };

    // Initial display
    updateCountdownDisplay(timeLeft);

    // Countdown interval
    const countdownInterval = setInterval(async() => {
      timeLeft -= 1000;

      if (timeLeft <= 0) {
        updateCountdownDisplay(0); // show 0:00

        // Stop polling when countdown ends
        clearInterval(countdownInterval);
        clearInterval(interval);
        clearTimeout(timeout);
         await cancelPolling(activationId, provider)
        if (otpRef.current) return;
        setNumberInfo(null);
        sessionStorage.removeItem('numberInfo');
        sessionStorage.removeItem('otp');
        sessionStorage.removeItem('pollStartTime');
        console.log('Timeout: No response after 5 minutes.')
        setTimeoutRemaining(null);
        setLoading(false);
        toast.error('Timeout: No response after 5 minutes.');
      } else {
        updateCountdownDisplay(timeLeft);
      }
    }, 1000);

    // Polling interval
    const interval = setInterval(async () => {
      console.log('send polling')
      if(!numberInfo || otpRef.current) return clearInterval(interval);
      try {
        const { data } = await axios.get<OtpType>(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/virtual-numbers/activation/${activationId}`,
          { headers: { Authorization: `Bearer ${token}` }, params: { provider } }
        );

        if (data.ok && data.status === 'completed') {
          updateOtp(data.code);
          sessionStorage.setItem('otp', data.code);
          clearInterval(interval);
        } else if (data.status === 'cancelled') {
          sessionStorage.removeItem('numberInfo');
          sessionStorage.removeItem('otp');
          clearInterval(interval);
          clearInterval(countdownInterval);
          clearTimeout(timeout);
          updateOtp(null)
          sessionStorage.removeItem('pollStartTime');
          toast.error('Activation cancelled. Please try again.');
          setTimeoutRemaining(null);
          setLoading(false);
        }
      } catch {
        sessionStorage.removeItem('numberInfo');
        sessionStorage.removeItem('otp');
        toast.error('Something went wrong');
        console.log('Somethint wrong')
        setNumberInfo(null);
        updateOtp(null);
        clearInterval(interval);
        clearInterval(countdownInterval);
        clearTimeout(timeout);
        sessionStorage.removeItem('pollStartTime');
        setTimeoutRemaining(null);
        setLoading(false);
      }
    }, 5000);

    // Optional timeout as fallback safety (can remove since countdown handles it)
    const timeout = setTimeout(() => {
      clearInterval(interval);
      clearInterval(countdownInterval);

      if (!otpRef.current) {
        sessionStorage.removeItem('numberInfo');
        sessionStorage.removeItem('otp');
        sessionStorage.removeItem('pollStartTime');
        toast.error('Timeout: No response after 5 minutes.');
        console.log('Timeout: No response after 5 minutes.')
        setNumberInfo(null);
        updateOtp(null);
        setTimeoutRemaining(null);
        setLoading(false);
      }

    }, pollingDuration);
  };
  const clearInfo = () => {
    sessionStorage.removeItem('numberInfo');
    sessionStorage.removeItem('otp');
    sessionStorage.removeItem('pollStartTime');
    setTimeoutRemaining(null);
    setNumberInfo(null);
    updateOtp(null);
    setLoading(false);
  };

  useEffect(() => {
    const savedNumberStr = sessionStorage.getItem('numberInfo');
    const savedOtp = sessionStorage.getItem('otp');

    const fetchCountries = async () => {
      const res = await fetch(`https://restcountries.com/v3.1/all?fields=name,flags,cca2,cca3`);
      const data: CountryType[] = await res.json();
      const priority = ['United States', 'United Kingdom', 'Canada', 'Australia', 'France', 'Spain'];

      const sorted = data.sort((a, b) => {
        const aName = a.name.common;
        const bName = b.name.common;
        const aPriority = priority.indexOf(aName);
        const bPriority = priority.indexOf(bName);
        if (aPriority !== -1 && bPriority !== -1) return aPriority - bPriority;
        if (aPriority !== -1) return -1;
        if (bPriority !== -1) return 1;
        return aName.localeCompare(bName);
      });

      setCountries(sorted);
    };

    const fetchUSAServices = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/virtual-numbers/services/usa`);
      const data: ServiceResponse = await res.json();
      if (data.ok) setUsaServices(data.result);
    };

    const fetchOtherCountriesServices = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/virtual-numbers/services/countries`);
      const data: ServiceResponse = await res.json();
      if (data.ok) setOtherServices(data.result);
    };

    fetchCountries();
    fetchUSAServices();
    fetchOtherCountriesServices();

    if (savedOtp) {
      updateOtp(savedOtp);
    }

    if (savedNumberStr) {
      try {
        const parsedNumber = JSON.parse(savedNumberStr) as NumberInfo;
        setNumberInfo(parsedNumber);
        const savedStartTime = sessionStorage.getItem('pollStartTime');
        const now = Date.now();
        const pollingDuration = 1 * 60 * 1000;
        if (savedStartTime) {
          const elapsed = now - parseInt(savedStartTime);
          const remainingTime = pollingDuration - elapsed;

          if (remainingTime > 0) {
            const totalSeconds = Math.floor(remainingTime / 1000);
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;
            const formatted = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            setTimeoutRemaining(formatted);

            if (!savedOtp || savedOtp === '') {
              setLoading(true);
              pollForSMS(parsedNumber.activationId, parsedNumber.provider);
            }
          } else {
            // sessionStorage.removeItem('numberInfo');
            // sessionStorage.removeItem('otp');
            // sessionStorage.removeItem('pollStartTime');
            setTimeoutRemaining('00:00');
          }
        }

      } catch {
        console.log('Error parsing saved number, clearing it...');
        sessionStorage.removeItem('numberInfo');
      }
    }
  }, []);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }

    sessionStorage.removeItem('numberInfo');
    sessionStorage.removeItem('otp');
    sessionStorage.removeItem('pollStartTime');
    setTimeoutRemaining(null);
    setLoading(false);
  }, [pathname]);

  const fetchServices = (countryCode: string) => {
    setServices(countryCode === 'US' ? usaServices : otherServices);
  };

  const addPrices = async (serviceID: number, serviceName: string) => {
    setPriceLoading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/virtual-numbers/services/price`,
        { serviceID, countryCode: selectedCountry?.cca2 }
      );

      if (res.status === 200 && res.data && Array.isArray(res.data.prices)) {
        const updatedPrices = res.data.prices.map((item: PriceType) => ({
          ...item,
          name: serviceName,
          country: selectedCountry?.name.common || ''
        }));
        setPrice(updatedPrices);
      } else {
        setPrice([]);
      }
    } catch (error) {
      console.error("Error fetching price", error);
      setPrice(null);
    } finally {
      setPriceLoading(false);
    }
  };

  const selectCountry = (country: CountryType) => {
    setSelectedCountry(country);
    fetchServices(country.cca2);
    setSelectedService(null);
    setPrice(null);
  };

  const selectService = (service: ServiceType) => {
    setSelectedService(service);
    setPrice(null);
    const serviceName = 'name' in service ? service.name : '';

    if (selectedCountry?.cca2 === 'US') {
      if ('cost' in service) setPrice({ ...service, country: selectedCountry.name.common });
    } else {
      if ('ID' in service) addPrices(service.ID, serviceName);
    }
  };

  const filteredCountries = countries.filter(c =>
    c.name.common.toLowerCase().includes(searchCountries.toLowerCase())
  );

  const filteredServices = services.filter(s =>
    'name' in s && s.name.toLowerCase().includes(searchServices.toLowerCase())
  );

  return (
    <section className='text-gray-800'>
      <Toaster richColors position='top-center' duration={3000} />

      {loading && <PurchaseNumberModal
        service={numberInfo?.name}
        country={numberInfo?.country}
        number={numberInfo?.number}
        otp={otpRef.current || ''}
        timeout={timeoutRemaining}
        onClose={() => clearInfo()}
      />}

      <div className='p-2 border border-zinc-200 rounded-md mb-2 bg-white'>
        <h1 className='py-2'>1. Select country</h1>

        {selectedCountry ? (
          <div className="flex items-center justify-between p-2 border border-zinc-200 rounded-md">
            <div className="flex items-center gap-2">
              <img
                src={selectedCountry.flags.png || selectedCountry.flags.svg}
                alt={selectedCountry.flags.alt || selectedCountry.name.common}
                className="w-6 h-4 object-cover"
              />
              <p>{selectedCountry.name.common}</p>
            </div>
            <button
              onClick={() => {
                setSelectedCountry(null);
                setServices([]);
                setSelectedService(null);
                setPrice(null);
              }}
              className="text-red-500 text-xl font-bold px-2 cursor-pointer"
            >
              ×
            </button>
          </div>
        ) : (
          <>
            <input
              value={searchCountries}
              onChange={(e) => setSearchCountries(e.target.value)}
              placeholder='Search country'
              type="text"
              className='p-2 text-[15px] rounded-md w-full outline-none border border-zinc-200 mb-2'
            />
            <div className="max-h-[30rem] overflow-y-auto my-2 border-zinc-200 rounded-md py-2">
              <ul>
                {filteredCountries.map((country, index) => (
                  <li key={index} className='my-2'>
                    <label className='flex items-center gap-2 p-2 border border-zinc-200 rounded-md w-full cursor-pointer'>
                      <input
                        type="radio"
                        name="country"
                        value={country.name.common}
                        onChange={() => selectCountry(country)}
                        className="accent-blue-500"
                      />
                      <img
                        src={country.flags.png || country.flags.svg}
                        alt={country.flags.alt || country.name.common}
                        className="w-6 h-4 object-cover"
                      />
                      <p>{country.name.common}</p>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>

      {/* Service Selection */}
      <div className='p-2 border border-zinc-200 rounded-md bg-white scroll-mt-24'>
        <h1 className='py-2'>2. Select service</h1>
        <input
          value={searchServices}
          onChange={(e) => setSearchServices(e.target.value)}
          placeholder='Search service'
          type="text"
          className='p-2 text-[15px] rounded-md w-full outline-none border border-zinc-200 mb-2'
          disabled={!!selectedService}
        />

        {selectedService ? (
          <div className='my-4 border border-zinc-200 rounded-md pt-8 pb-4 px-4 bg-gray-50 relative'>
            <div>
              {priceLoading ? (
                <p>Loading prices...</p>
              ) : Array.isArray(price) ? (
                price.length > 0 ? (
                  <>
                    {price.map((item, i) => (
                      <button
                        key={i}
                        disabled={loading}
                        onClick={() => purchaseNumber(item, i)}
                        className="flex w-full items-center justify-between text-[14px] cursor-pointer text-white gap-3 bg-teal-800 rounded-lg py-2 px-3 mb-2"
                      >
                        <h2 className='text-[12px] font-semibold'>{selectedService.name}</h2>
                        <div className="flex gap-1 items-center">
                          <p>₦{item.cost.toLocaleString()}</p>
                          <ShoppingCart size={16} />
                        </div>
                      </button>
                    ))}
                    <div className="bg-yellow-100 my-3 text-yellow-800 p-3 rounded-md text-sm">
                      <strong>Note:</strong> Kindly click on a <strong>price above</strong> to receive your number and code. Turn your VPN <strong>on or off</strong> if needed to get your SMS. No code? You’ll get a <strong>full refund</strong>. We aren’t responsible for issues after you receive your code, such as account bans on WhatsApp, Telegram or other platforms.
                    </div>
                  </>
                ) : (
                  <p>No prices available</p>
                )
              ) : price !== null ? (
                <>
                  <button
                    disabled={loading}
                    onClick={() => purchaseNumber(price)}
                    className="flex w-full items-center justify-between text-[14px] cursor-pointer text-white gap-3 bg-teal-800 rounded-lg py-2 px-3"
                  >
                    <h2 className='text-[12px] font-semibold'>{selectedService.name}</h2>
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
                      <p>{'name' in service ? service.name : 'Unknown'}</p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default VirtualNumberServices;
