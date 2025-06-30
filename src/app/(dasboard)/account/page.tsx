'use client'
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { addUser } from "@/redux/slice/auth"
import { findUser } from "@/redux/type"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
const Account = () => {
    const router = useRouter()
    const user = useAppSelector((state) => state.auth.user.user)
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (user?.firstName !== '' || user.lastName !== '') return;
        const token = document.cookie
            .split('; ')
            .find(row => row.startsWith('accessToken='))
            ?.split('=')[1]


        const fetchUser = async () => {
            try {
                const { data } = await axios.get<findUser>(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/me`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                if (!data.ok) {
                    router.push('/login');
                }
                if (data.ok) {
                    dispatch(addUser(data))
                    return;
                }
            } catch (err: unknown) {
                if(err instanceof Error)
                console.error('Failed to fetch user info:', err)
            return;
            console.error('Unknown error: ', err)
            }
        }

        fetchUser()
    }, [router])




    return (
        <section className="min-h-full text-gray-800">
            <div className="py-4">
                <h1>Your Profile</h1>
            </div>
            <div className="border-y border-slate-400 py-4 ">
                <h1>Full Name</h1>
                <input
                    type="text" required disabled placeholder={user?.firstName + ' ' + user?.lastName} className={`capitalize focus:border-[blue] outline-none border-[1px] bg-none py-2 px-8 text-gray-400 rounded-xl`} />
            </div>
            <div className="border-b border-slate-400 py-4 ">
                <h1>Email Address</h1>
                <input type="text" disabled value={user?.email} className=" bg-none py-2 px-8 text-gray-400 rounded-xl" />
            </div>
            {/* Edit */}
            {/* <div className="text-center p-4 font-[600]">
                    {!show && (
                        <button type="button" className="p-3 border border-[#DADBDD] rounded-2xl" onClick={() => setShow(true)}>Edit</button>
                    )}
                    {show && (
                        <div className="flex justify-center items-center gap-2">
                            <button type="button" className="p-3 flex items-center gap-1  border border-[#DADBDD] rounded-2xl" onClick={() => setShow(false)}>Cancel <X size={16} /></button>
                            <button
                                disabled={loading}
                                type="submit"
                                className={`p-3 flex items-center gap-1 border bg-gray-800 text-white border-[#DADBDD] rounded-2xl transition-opacity duration-300
    ${loading ? "opacity-50 cursor-not-allowed" : ""}
  `}
                            >
                                {loading ? "Saving..." : <>Save <Check size={16} /></>}
                            </button>

                        </div>
                    )}
                </div> */}
        </section>
    )
}

export default Account;