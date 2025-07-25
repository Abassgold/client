'use client'
import { Toaster } from "@/components/ui/sonner"
import { getToken } from "@/lib/Token"
import { useAppDispatch } from "@/redux/hooks"
import { addUser } from "@/redux/slice/auth"
import { findUser } from "@/redux/type"
import axios, { AxiosError } from "axios"
import { useFormik } from "formik"
import { MoveLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"
import * as Yup from 'yup'
type changePassword = {
    newPassword: string;
    confirmNewPassword: string;
}
const PasswordReset = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()
    const dispatch = useAppDispatch()
    const formik = useFormik<changePassword>({
        initialValues: {
            newPassword: '',
            confirmNewPassword: ''
        },
        validationSchema: Yup.object({
            newPassword: Yup.string()
                .test('no-spaces', 'Spaces are not allowed', (value) => !/\s/.test(value || ''))
                .min(6, 'Password must not be less than 6 characters')
                .max(12, 'Password must not exceed 12 characters')
                .matches(/^[A-Z]/, "Must start with a capital letter.")
                .matches(/[a-zA-Z]/, "Must contain at least one letter.")
                .matches(/[^a-zA-Z0-9]/, "Must contain at least one special character.")
                .matches(/\d/, "Must contain at least one number.")
                .required('Please enter your password'),

            confirmNewPassword: Yup.string()
                .test('no-spaces', 'Spaces are not allowed', (value) => !/\s/.test(value || ''))
                .min(6, 'Password must not be less than 6 characters')
                .max(12, 'Password must not exceed 12 characters')
                .oneOf([Yup.ref('newPassword')], 'Passwords must match'),
        }),
        onSubmit: async (values: changePassword): Promise<findUser | void> => {
            setLoading(true)
            try {
                const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/updatePassword`, values, {
                    headers: {
                       Authorization: `Bearer ${getToken()}`
                    },
                    
                })
                const res: findUser = data
                if (!res?.ok) {
                    toast.error(res.msg)
                    return res;
                }
                dispatch(addUser(res))
                router.push('/login')
                toast.success(res.msg)
                return res;
            } catch (error) {
                const err = error as AxiosError
                console.log(err.message)
                toast.error('Failed to fetch')
            } finally {
                setLoading(false)
            }
        }
    })
    return (
        <section className="p-4 h-screen bg-zinc-100">
            <Toaster
                richColors
                position='top-center'
                duration={2000}
            />
            <div className="max-w-xl mx-auto h-full flex items-center">
                <div className="w-full">
                    <div className="flex justify-center">
                        <Image
                            src="/myflozap_logo.png"
                            alt="floZap-logo"
                            width={130}
                            height={40}
                            style={{ objectFit: 'contain' }}
                        />
                    </div>
                    <h1 className="text-gray-600 text-xl font-semibold md:text-3xl mb-3 capitalize">reset password!</h1>
                    <div className="h-1 bg-teal-800 w-[48px] mb-6"></div>
                    <h3 className='text-gray-800 mb-4'>Your new password must be different from the previous ones</h3>
                    <form className="mb-6" onSubmit={formik.handleSubmit}>
                        <div className="mb-6">
                            <label htmlFor="" className="mb-1 block text-gray-800 font-semibold">Password</label>
                            <input
                                required
                                name="newPassword"
                                type="password" placeholder="Your new password" className="block text-sm md:text-base text-gray-600 outline-none border-[0.5px] border-zinc-300 p-2 w-full rounded-md" />
                            {formik.touched.newPassword && formik.errors.newPassword && (
                                <label className='block w-fit mt-2 text-[12px] text-red-700' htmlFor="email">{formik.errors.newPassword}</label>
                            )}
                        </div>
                        <div className="mb-6">
                            <label htmlFor="" className="mb-1 block text-gray-800 font-semibold">Confirm password</label>
                            <input
                                required
                                name="confirmNewPassword"
                                type="password" placeholder="Confirm your new password" className="block text-sm md:text-base text-gray-600 outline-none border-[0.5px] border-zinc-300 p-2 w-full rounded-md" />
                            {formik.touched.confirmNewPassword && formik.errors.confirmNewPassword && (
                                <label className='block w-fit mt-2 text-[12px] text-red-700' htmlFor="email">{formik.errors.newPassword}</label>
                            )}
                        </div>
                        <div>
                            <button
                                type="submit" disabled={loading} className=" capitalize bg-teal-800 hover:bg-teal-900 duration-100 cursor-pointer w-full text-center text-sm md:text-base text-white p-2 rounded-md">send recovery email</button>
                        </div>
                    </form>
                    <div className=''> <Link href='/login' className='mx-auto flex gap-2 justify-center items-center w-fit'><MoveLeft />Back to Signin</Link></div>
                </div>
            </div>
        </section>
    )
}

export default PasswordReset