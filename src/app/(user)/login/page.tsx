'use client'
import { Toaster } from "@/components/ui/sonner";
import { useFormik } from "formik";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import * as Yup from 'yup';
import { useAppDispatch } from "@/redux/hooks";
import { addUser } from "@/redux/slice/auth";
import { findUser } from "@/redux/type";
import Image from "next/image";
import { setToken } from "@/lib/Token";

interface loginType {
    email: string;
    password: string;
}
const Login = () => {
    const [loader, setLoader] = useState(false)
    const dispatch = useAppDispatch()
    const [show, setShow] = useState(false)
    const router = useRouter()
    const formik = useFormik<loginType>({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email').test('no-spaces', 'Spaces are not allowed', (value) => !/\s/.test(value || '')).required('Please enter your email').lowercase(),
            password: Yup.string()
                .test('no-spaces', 'Spaces are not allowed', (value) => !/\s/.test(value || ''))
                .min(6, 'Password must not be less than 6 characters')
                .max(12, 'Password must not exceed 12 characters')
                .matches(/^[A-Z]/, "Must start with a capital letter.")
                .matches(/[a-zA-Z]/, "Must contain at least one letter.")
                .matches(/[^a-zA-Z0-9]/, "Must contain at least one special character.")
                .matches(/\d/, "Must contain at least one number.")
                .required('Please enter your password'),
        }),
        onSubmit: async (values: loginType): Promise<findUser | void> => {
            setLoader(true)
            try {
                const response = await fetch(`/login/api/`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(values),
                })
                const data: findUser = await response.json();
                if (data?.ok) {
                    toast.success(data.msg);
                    dispatch(addUser(data));
                    setToken(data.token || '');
                    router.push('/dashboard');
                    return;
                }
                if (!data.ok && data.msg === 'not-verified') {
                    router.push('/verification-sent')
                    return;
                }
                toast.error(data?.msg || "An error occurred");
            } catch (error) {
                console.log(error)
                toast.error('Login error')
            } finally {
                setLoader(false)
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
                    <h1 className="text-gray-600 text-xl font-semibold md:text-3xl mb-3">welcome back!</h1>
                    <div className="h-1 bg-teal-800 w-[48px] mb-6"></div>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="mb-6">
                            <label htmlFor="" className="mb-1 block text-gray-800">Email</label>
                            <input
                                required
                                name="email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                type="email" placeholder="Enter your Email" className="block text-sm md:text-base font-normal text-gray-600 outline-none border-[0.5px] border-zinc-300 p-2 w-full rounded-md" />
                            {formik.touched.email && formik.errors.email && (
                                <p className="text-sm text-red-600">{formik.errors.email}</p>
                            )}
                        </div>
                        <div className="mb-6">
                            <div className="flex justify-between items-center relative">
                                <label htmlFor="" className="mb-1 block text-gray-800">Password</label>
                                <Link
                                    className="block text-red-600"
                                    href='/password-forgot'>
                                    <small>
                                        Forgot password?
                                    </small>
                                </Link>
                            </div>
                            <div className=" relative">
                                <input
                                    required
                                    name="password"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    type={show ? "text" : "password"}
                                    id="password"
                                    placeholder="Enter your Password"
                                    className="block text-sm md:text-base font-normal text-gray-600 outline-none border-[0.5px] border-zinc-300 p-2 w-full rounded-md" />
                                {show
                                    ? <Eye size={20} className="absolute right-2 top-3 cursor-pointer" onClick={() => setShow(false)} />
                                    : <EyeOff size={20} className="absolute right-2 top-3 cursor-pointer" onClick={() => setShow(true)} />}
                                {formik.touched.password && formik.errors.password && (
                                    <p className="text-sm text-red-600">{formik.errors.password}</p>
                                )}
                            </div>
                        </div>
                        <div>
                            <button type="submit" disabled={loader} className="bg-teal-800 hover:bg-teal-900 duration-100 cursor-pointer w-full text-center text-white p-2 rounded-md">
                                {loader ? 'Wait...' : 'Sign In'}
                            </button>
                        </div>
                    </form>
                    <div className="py-4 text-center text-[14px] text-gray-600">
                        New to FloZap? <Link href='/register' className="text-red-600">Sign up </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login;