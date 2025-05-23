'use client'

import { ShoppingCart } from "lucide-react"
import { useEffect, useState } from "react"

const VirtualNumberServies = () => {
    const [countries, setCountries] = useState<any>([])
    const [searchCountries, setSearchCountries] = useState('')
    const [selected, setSelected] = useState('');

    useEffect(() => {
        async function fectCountrie() {
            const res = await fetch('https://restcountries.com/v3.1/all')
            const data = await res.json()
            data.map((item: any) => {
                console.log(item);
            })
            const sorted = data.sort((a: any, b: any) => a.name.common.localeCompare(b.name.common));
            setCountries(sorted)
            return data
        }
        fectCountrie()
    }, [])
    const filterCountries = countries.filter((item: any) => (item.name.common.toLowerCase().includes(searchCountries.toLowerCase())))
    return (
        <div className='p-2 border border-zinc-200 rounded-md'>
            <h1 className='py-2'>1. Select country</h1>
            <form>
                <div>
                    <input
                        onChange={(e) => setSearchCountries(e.target.value)}
                        placeholder='Select country'
                        type="text"
                        className='p-2 text-[15px] rounded-md w-full outline-none border-[1px] border-zinc-200'
                    />
                </div>
                {selected && (
                    <p className='text-center text-[14px] my-2'>Selected country: <span className="font-semibold">{selected}</span></p>

                )}
                <div className=" max-h-[30rem] overflow-y-auto py-2">
                    <ul>
                        {filterCountries.map((item: any, index: any) => (
                            <li className='my-2' key={index}>
                                <label className='flex items-center gap-2 p-2 border border-zinc-200 rounded-md w-full cursor-pointer'>
                                    <input
                                        type="radio"
                                        name="country"
                                        value={item.name.common}
                                        checked={selected === item.name.common}
                                        onChange={() => setSelected(item.name.common)}
                                        className="accent-blue-500"
                                    />
                                    <img
                                        src={item.flags?.png || item.flags?.svg}
                                        alt={item.name.common}
                                        className="w-6 h-4 object-cover"
                                    />
                                    <p>{item.name.common}</p>
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            </form>

            <h1 className='py-2 my-3'>2. Select service</h1>
            <form>
                <div>
                    <input placeholder='Select service' type="text" className='p-2 text-[15px] rounded-md w-full outline-none border-[1px] border-zinc-200' />
                </div>
                <p className='text-center my-2'>selected service</p>
                <div>
                    <ul>
                        <li className='my-2'>
                            <button className='flex items-center justify-between rounded-md p-1 border border-zinc-200 w-full cursor-pointer'>
                                <div className='flex items-center gap-1'>
                                    <input type="radio" />
                                    <img src="/" alt="" />
                                    <p>service</p>
                                </div>
                                <div className='flex items-center text-[14px] text-white gap-3 bg-teal-800 rounded-lg py-2 px-3'>
                                    <p>$1.34</p>
                                    <ShoppingCart size={16} />
                                </div>
                            </button>
                        </li>
                    </ul>
                </div>
            </form>
        </div>
    )
}

export default VirtualNumberServies