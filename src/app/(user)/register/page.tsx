'use client'
import Link from "next/link"
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { findUser, IUser } from "./types";
import { toast } from "sonner";
import Image from "next/image";
const Register = () => {
    const [loader, setLoader] = useState(false)
    const [show, setShow] = useState(false)
    const router = useRouter()
    const formik = useFormik<IUser>({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            telephone: ''
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required('Please enter your first name'),
            lastName: Yup.string().required('Please enter your last name'),
            email: Yup.string().email('Invalid email').test('no-spaces', 'Spaces are not allowed', (value) => !/\s/.test(value || '')).required('Please enter your email').lowercase(),
            telephone: Yup.string().required('Please enter your phone number'),
            password: Yup.string()
                .test('no-spaces', 'Spaces are not allowed', (value) => !/\s/.test(value || ''))
                .min(8, 'Password must not be less than 8 characters')
                .max(12, 'Password must not exceed 12 characters')
                .matches(/^[A-Z]/, "Must start with a capital letter.")
                .matches(/[a-zA-Z]/, "Must contain at least one letter.")
                .matches(/[^a-zA-Z0-9]/, "Must contain at least one special character.")
                .matches(/\d/, "Must contain at least one number.")
                .required('Please enter your password'),
        }),
        onSubmit: async (values: IUser): Promise<findUser | void> => {
            setLoader(true)
            try {
                const response = await fetch(`register/api/`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(values),
                })
                const data: findUser = await response.json();
                if (data?.ok) {
                    toast.success(data.msg);
                    router.push('/user/verification-sent');
                    return;
                }
                toast.error(data?.msg || "An error occurred");
            } catch (error) {
                console.log(error)
                toast.error('Registration failed')
            } finally {
                setLoader(false)
            }
        }
    })

    return (
        <section className="p-4 h-screen bg-zinc-100">
           
            <div className="max-w-xl mx-auto h-full flex items-center">
                <div className="w-full">
                    <Image
                        src="/myflozap_logo.png"
                        alt="floZap-logo"
                        width={250}
                        height={100}
                        className="mx-auto bg-none md:hidden block"
                    />
                    <Image
                        src="/myflozap_logo.png"
                        alt="floZap-logo"
                        width={350}
                        height={100}
                        className="mx-auto bg-none hidden md:block"
                    />
                    <h1 className="text-gray-600 text-xl font-semibold md:text-3xl mb-3 capitalize">welcome onboard!</h1>
                    <div className="h-1 bg-teal-800 w-[48px] mb-6"></div>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="md:flex md:justify-between md:items-center">
                            <div className="mb-4">
                                <label htmlFor="" className="mb-1 block text-gray-800">First Name</label>
                                <input
                                    required
                                    name="firstName"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    type="text" placeholder="Enter your First Name" className="block text-sm md:text-base text-gray-600 outline-none border-[0.5px] border-zinc-300 p-2 w-full rounded-md" />
                                {formik.touched.firstName && formik.errors.firstName && (
                                    <p className="text-sm text-red-600">{formik.errors.firstName}</p>
                                )}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="" className="mb-1 block text-gray-800">Last Name</label>
                                <input
                                    required
                                    name="lastName"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    type="text" placeholder="Enter your Last Name" className="block text-sm md:text-base text-gray-600 outline-none border-[0.5px] border-zinc-300 p-2 w-full rounded-md" />
                                {formik.touched.lastName && formik.errors.lastName && (
                                    <p className="text-sm text-red-600">{formik.errors.lastName}</p>
                                )}
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="" className="mb-1 block text-gray-800">Email</label>
                            <input
                                required
                                name="email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                type="email" placeholder="Enter your Email" className="block text-sm md:text-base text-gray-600 outline-none border-[0.5px] border-zinc-300 p-2 w-full rounded-md" />
                            {formik.touched.email && formik.errors.email && (
                                <p className="text-sm text-red-600">{formik.errors.email}</p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="" className="mb-1 block text-gray-800">Telephone</label>
                            <input
                                required
                                name="telephone"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                type="text"
                                pattern="[0-9]*"
                                inputMode="numeric"
                                placeholder="Enter your Phone Number" className="block text-sm md:text-base text-gray-600 outline-none border-[0.5px] border-zinc-300 p-2 w-full rounded-md" />
                            {formik.touched.telephone && formik.errors.telephone && (
                                <p className="text-sm text-red-600">{formik.errors.telephone}</p>
                            )}
                        </div>
                        <div className="mb-4 relative">
                            <div className="flex justify-between items-center">
                                <label htmlFor="" className="mb-1 block text-gray-800">Password</label>

                            </div>
                            <input
                                required
                                type={show ? "text" : "password"}
                                id="password"
                                name="password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Enter your Password"
                                className="block  text-gray-600 text-sm md:text-base outline-none border-[0.5px] border-zinc-300 p-2 w-full rounded-md" />
                            {show
                                ? <Eye size={20} className="absolute right-2 top-10 cursor-pointer" onClick={() => setShow(false)} />
                                : <EyeOff size={20} className="absolute right-2 top-10 cursor-pointer" onClick={() => setShow(true)} />}
                            {formik.touched.password && formik.errors.password && (
                                <p className="text-sm text-red-600">{formik.errors.password}</p>
                            )}
                        </div>
                        <div>
                            <button type="submit" disabled={loader} className=" capitalize bg-teal-800 hover:bg-teal-900 duration-100 cursor-pointer w-full text-center text-white p-2 rounded-md">
                                {!loader ? 'Create account' : 'Creating Account...'}
                            </button>
                        </div>
                    </form>
                    <div className="py-4 text-center text-[14px] text-gray-600">
                        Already have an account? <Link href='/login' className="text-red-600">Login</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Register;