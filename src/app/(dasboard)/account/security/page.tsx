'use client'
import { useState } from "react"
import { Check, X } from "lucide-react"
import { useFormik } from "formik"
import { useAppDispatch } from "@/redux/hooks"
import { addUser } from "@/redux/slice/auth"
import * as Yup from 'yup'
import axios, { AxiosError } from "axios"
import { findUser } from "@/redux/type"
import { getToken } from "@/lib/Token"
import { toast } from "sonner"
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
        <section>
            <section className="min-h-full text-gray-800">
                <div className="py-4">
                    <h1>Your Profile</h1>
                    <p className="text-[14px] mt-2 text-gray-500">Please update your profile settings here</p>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <div className="border-y border-slate-400 py-4 ">
                        <h1>Current Password</h1>
                        <input
                            required
                            name="oldPassword"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type="text" disabled={!show} placeholder="Enter" className={`focus:border-[blue] outline-none ${show && 'border-gray-400 text-gray-400'} border-[1px] bg-none py-2 px-8 text-gray-400 rounded-xl`} />
                    </div>
                    <div className="border-b border-slate-400 py-4 ">
                        <h1>New Password</h1>
                        <input
                            required
                            name="newPassword"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type="text" disabled={!show} placeholder="Enter" className={`focus:border-[blue] outline-none ${show && 'border-gray-400 text-gray-400'} border-[1px] bg-none py-2 px-8 text-gray-400 rounded-xl`} />
                        {formik.touched.newPassword && formik.errors.newPassword && (
                            <label className='block w-fit mt-2 text-[12px] text-red-700' htmlFor="email">{formik.errors.newPassword}</label>
                        )}
                    </div>
                    <div className="border-b border-slate-400 py-4 ">
                        <h1>Confirm New Password</h1>
                        <input
                            required
                            name='confirmNewPassword'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type="text" disabled={!show} placeholder="Enter" className={`focus:border-[blue] outline-none ${show && 'border-gray-400 text-gray-400'} border-[1px] bg-none py-2 px-8 text-gray-400 rounded-xl`} />
                        {formik.touched.confirmNewPassword && formik.errors.confirmNewPassword && (
                            <label className='block w-fit mt-2 text-[12px] text-red-700' htmlFor="email">{formik.errors.confirmNewPassword}</label>
                        )}
                    </div>
                    <div className="text-center p-4 font-[600]">
                        {!show && (
                            <button type="button" className="p-3 border border-[#DADBDD] rounded-2xl" onClick={() => setShow(true)}>Edit</button>
                        )}
                        {show && (
                            <div className="flex justify-center items-center gap-2">
                                <button type="button" className="cursor-pointer p-3 flex items-center gap-1  border border-[#DADBDD] rounded-2xl" onClick={() => setShow(false)}>Cancel <X size={16} /></button>
                                <button
                                    disabled={loading}
                                    type="submit"
                                    className={`cursor-pointer p-3 flex items-center gap-1 border bg-gray-800 text-white border-[#DADBDD] rounded-2xl transition-opacity duration-300
    ${loading ? "opacity-50 cursor-not-allowed" : ""}
  `}
                                >
                                    {loading ? "Saving..." : <>Save <Check size={16} /></>}
                                </button>
                            </div>
                        )}
                    </div>
                </form>
            </section>
        </section>
    )
}

export default Security;