'use client'
import { useState } from "react"
import { Check, X } from "lucide-react"
import { useFormik } from "formik"
import { useAppDispatch } from "@/redux/hooks"
import { addUser } from "@/redux/slice/auth"
import * as Yup from 'yup'
import axios, { AxiosError } from "axios"
import { getToken } from "@/lib/Token"
import { toast } from "sonner"
import { findUser } from "@/redux/type"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui copy/Card"
import { Input } from "@/components/ui copy/Input"
import { Button } from "@/components/ui copy/Button"
import Link from "next/link"
import TransactionPin from "@/components/setting/PIN/TransactionPin"
interface changePassword {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}
const Security = () => {
    const [show, setShow] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const formik = useFormik<changePassword>({
        initialValues: {
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: ''
        },
        validationSchema: Yup.object({
            oldPassword: Yup.string(),
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
                    }
                })
                const res: findUser = data
                if (!res?.ok) {
                    toast.error(res.msg)
                    return res;
                }
                dispatch(addUser(res))
                setShow(false)
                toast.success(res.msg)
                return res;
            } catch (error) {
                const err = error as AxiosError
                console.error(err.message)
                toast.error('Failed to fetch')
            } finally {
                setLoading(false)
            }
        }
    })

    return (
        <section className="space-y-4">
             <Card>
                <CardHeader>
                    <div className='flex items-center gap-2 p-4'>
                        <CardTitle><Link href='/user/account' className="focus:underline focus:underline-offset-2">Profile</Link></CardTitle>
                        <CardTitle><Link href='/user/account/security' className="focus:underline focus:underline-offset-2">Security</Link></CardTitle>
                    </div>

                    <CardDescription>Your Profile</CardDescription>
                     <p className="text-[14px] mt-2 text-gray-500">Please update your profile settings here</p>
                </CardHeader>
            <CardContent>

                <form className="space-y-4" onSubmit={formik.handleSubmit}>
                    <Input
                        label="Current Password"
                        type="text"
                        disabled={!show}
                        placeholder="Enter"
                        fullWidth
                        required
                        name="oldPassword"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />

                    <Input
                        label="New Password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="text" disabled={!show} placeholder="Enter"
                        fullWidth
                        required
                        name="newPassword"
                        error={
                            formik.touched.newPassword && formik.errors.newPassword
                                ? formik.errors.newPassword
                                : undefined
                        }
                    />
                    <Input
                        error={
                            formik.touched.confirmNewPassword && formik.errors.confirmNewPassword
                                ? formik.errors.confirmNewPassword
                                : undefined
                        }

                        name='confirmNewPassword'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="text" disabled={!show} placeholder="Enter"
                        label="Email Address"
                        fullWidth
                    />
                    {!show && <div className="text-center"><Button type='button' onClick={() => setShow(true)}>Edit</Button></div>}
                    {show && (
                        <div className="flex justify-center items-center gap-2">
                            <Button type='button' onClick={() => setShow(false)}>Cancel <X size={16} /></Button>
                            <Button disabled={loading} type='button' >{loading ? "Saving..." : <>Save <Check size={16} /></>}</Button>
                        </div>
                    )
                    }
                </form>
            </CardContent>
            </Card>
            <TransactionPin/>
             
        </section >
    )
}

export default Security;