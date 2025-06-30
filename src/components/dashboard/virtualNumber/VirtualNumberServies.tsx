'use client'

import { ShoppingCart } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface CountryType {
  flags: {
    png?: string;
    svg?: string;
    alt?: string;
  };
  name: {
    common: string;
    official: string;
    nativeName?: {
      [lang: string]: {
        official: string;
        common: string;
      };
    };
  };
  cca2: string;
  cca3: string;
}

const VirtualNumberServices = () => {
  const [countries, setCountries] = useState<CountryType[]>([]);
  const [searchCountries, setSearchCountries] = useState('');
  const [selected, setSelected] = useState('');
  const [selectedService, setSelectedService] = useState('');
//   const [services, setServices] = useState<string[]>([]);

  const serviceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchCountries() {
      const res = await fetch(`https://restcountries.com/v3.1/all?fields=name,flags,cca2,cca3`);
      const data: CountryType[] = await res.json();
      const sorted = data.sort((a: CountryType, b: CountryType) =>
        a.name.common.localeCompare(b.name.common)
      );
      setCountries(sorted);
    }
    fetchCountries();
  }, []);

  const fetchServices = async (countryCode: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/virtual-numbers/services?country=${countryCode}`);
      const data: string[] = await res.json();
    //   setServices(data);
      console.log(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Failed to fetch services", error.message);
      } else {
        console.error("An unexpected error occurred");
      }
    }
  };

  const selectCountry = (item: CountryType) => {
    setSelected(item.name.common);
    fetchServices(item.cca2);
    if (serviceRef.current) {
      serviceRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const selectService = () => {
    setSelectedService('abass');
  };

  const filterCountries = countries.filter((item: CountryType) =>
    item.name.common.toLowerCase().includes(searchCountries.toLowerCase())
  );

  return (
    <section className='text-gray-800'>
      <div className='p-2 border border-zinc-200 rounded-md mb-2 bg-white'>
        <h1 className='py-2'>1. Select country</h1>
        <form>
          <div className="mb-2">
            <input
              onChange={(e) => setSearchCountries(e.target.value)}
              placeholder='Select country'
              type="text"
              className='p-2 text-[15px] rounded-md w-full outline-none border-[1px] border-zinc-200'
            />
          </div>
          {selected && (
            <p className='text-center text-[14px] my-2'>
              Selected country: <span className="font-semibold">{selected}</span>
            </p>
          )}
          <div className="max-h-[30rem] overflow-y-auto my-2 border-zinc-200 rounded-md py-2">
            <ul>
              {filterCountries.map((item: CountryType, index: number) => (
                <li className='my-2' key={index}>
                  <label className='flex items-center gap-2 p-2 border border-zinc-200 rounded-md w-full cursor-pointer'>
                    <input
                      type="radio"
                      name="country"
                      value={item.name.common}
                      checked={selected === item.name.common}
                      onChange={() => selectCountry(item)}
                      className="accent-blue-500"
                    />
                    <img
                      src={item.flags?.png || item.flags?.svg}
                      alt={item.flags?.alt || item.name.common}
                      className="w-6 h-4 object-cover"
                    />
                    <p>{item.name.common}</p>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </form>
      </div>

      <div
        ref={serviceRef}
        className='p-2 border border-zinc-200 rounded-md bg-white scroll-mt-24'
      >
        <h1 className='py-2'>2. Select service</h1>
        <form>
          <div>
            <input
              placeholder='Select service'
              type="text"
              className='p-2 text-[15px] rounded-md w-full outline-none border-[1px] border-zinc-200'
            />
          </div>
          <p className='text-center my-2'>Selected service: {selectedService}</p>
          <div>
            <ul>
              <li className='my-2'>
                <button
                  type="button"
                  className='flex items-center justify-between rounded-md p-1 border border-zinc-200 w-full cursor-pointer'
                >
                  <div className='flex items-center gap-1'>
                    <input
                      checked={selectedService === 'abass'}
                      onChange={selectService}
                      type="radio"
                    />
                    <img src="/" alt="" />
                    <p>service</p>
                  </div>
                  <div className='flex items-center text-[14px] text-white gap-3 bg-teal-800 rounded-lg py-2 px-3'>
                    <p>₦5000</p>
                    <ShoppingCart size={16} />
                  </div>
                </button>
              </li>
            </ul>
          </div>
        </form>
      </div>
    </section>
  );
};

export default VirtualNumberServices;
