'use client'
import AccountProgress from "@/components/setting/AccountProgress"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui copy/Card"
import { Input } from "@/components/ui copy/Input"
import { getToken } from "@/lib/Token"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { addUser } from "@/redux/slice/auth"
import { findUser } from "@/redux/type"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
const Account = () => {
    const router = useRouter()
    const user = useAppSelector((state) => state.auth.user.user)
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (user?.firstName !== '' || user.lastName !== '') return;
        const fetchUser = async () => {
            try {
                const { data } = await axios.get<findUser>(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/me`,
                    {
                        headers: {
                            Authorization: `Bearer ${getToken()}`
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
                if (axios.isAxiosError(err)) {
                    if (err.response?.status === 403) return router.push('/account-suspended')
                    if (err.response?.status === 401) return router.push('/login')
                } else {
                    console.error('Unknown error:', err);
                }

            }
        }

        fetchUser()
    }, [router])



 
    return (
        <section>
            <Card>
                <CardHeader>
                    <div className='flex items-center gap-2 p-4'>
                        <CardTitle><Link href='/user/account' className="focus:underline focus:underline-offset-2">Profile</Link></CardTitle>
                        <CardTitle><Link href='/user/account/security' className="focus:underline focus:underline-offset-2">Security</Link></CardTitle>
                    </div>

                    <CardDescription>Your Profile</CardDescription>
                </CardHeader>
                 <CardContent>
            <form className="space-y-4" >
                <Input label="Full Name" type="text" disabled placeholder={user?.firstName + ' ' + user?.lastName} fullWidth />
                <Input disabled label="Email Address" type="text" fullWidth placeholder={user?.email} />
            </form>
        </CardContent>

            </Card>
            <AccountProgress tier={3}/>
        </section>
       
    )
}

export default Account;