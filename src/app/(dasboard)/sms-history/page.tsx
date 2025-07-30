import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react'
type activationType = {
    activationId: string;
    number: string;
    name: string;
    cost: string;
    code?: string;
    country: string;
    updatedAt: Date;
}
type responseType = {
    ok: boolean;
    msg?: string;
    activation?: activationType[]
}
const Page = async () => {
    const token = (await cookies()).get('accessToken')?.value
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/virtual-numbers/getActivationInfo`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });

    if (res.status === 401) return redirect('/login')
    if (res.status === 403) return redirect('/account-suspended')
    const data: responseType = await res.json()
    if (!data.ok) return (
        <div className='text-center py-5  md:text-2xl text-gray-800'>
            {data.msg}
        </div>
    )
    return (
        <div className="overflow-x-auto my-4">
            <table className="w-full divide-y divide-gray-200">
                <thead className="bg-teal-800">
                    <tr>
                        {['ReF No.', "Country", "Number", "Code", "Price", 'date'].map((header) => (
                            <th key={header} className="px-4 py-3 text-left text-xs md:text-sm lg:text-base font-medium text-white uppercase tracking-wider">{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.activation?.map((item, index) => (
                        <tr key={index} className={` hover:bg-gray-100 ${
                            index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                          }`}>
                            <td className="px-4 py-3 whitespace-nowrap text-xs md:text-sm lg:text-base">{item.activationId}</td>
                            <td className="px-4 py-3  text-xs md:text-sm lg:text-base">
                                <p className=' whitespace-nowrap'>{item.country}</p>
                                <small className='block'>{item.name}</small>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-xs md:text-sm lg:text-base">+{item.number}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-xs md:text-sm lg:text-base">
                               <span className='bg-teal-800 rounded-md -1 text-white'>
                                 {item ? item.code : ''}
                               </span>
                                </td>
                            <td className="px-4 py-3 whitespace-nowrap text-xs md:text-sm lg:text-base">₦{item.cost}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-xs md:text-sm lg:text-base">{new Date(item.updatedAt).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Page