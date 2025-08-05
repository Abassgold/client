import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link"
import { redirect } from "next/navigation";
export interface sentType {
    ok: boolean;
    msg?: string;
    user?: string;
}
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

const Verify = async (props: {
    searchParams: SearchParams
}) => {
    const referer = (await headers()).get('referer');
    const searchParams = await props.searchParams
    const token = searchParams.token;
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/verify-email?token=${token}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            cache: 'no-store',
        }
    });

    const data: sentType = await res.json();
    if (res.status === 401 || !data?.ok) {
        if (referer) {
            return redirect(referer)
        }
        return redirect('/')
    }
    if (data.ok)
        return (
            <div className="text-center p-6 h-screen flex flex-col justify-center bg-zinc-100 items-center gap-2 text-teal-800">
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
                <h1 className="text-xl font-bold">Account Verified Successfully! 👍</h1>
                <p>You can now log in to your account.</p>
                <div className=''>
                    <Link
                        href="/login"
                        className="underline underline-offset-2 mx-auto text-gray-600 p-2"
                    >
                        Proceed to Sign In
                    </Link></div>
            </div>
        )

    return (
        <div className="text-center p-6 text-red-600 h-screen flex flex-col justify-center items-center">
            <h1 className="text-xl font-bold mb-1">Verification Failed! ❌</h1>
            <div className=''> <Link href='/' className='mx-auto flex gap-2 justify-center items-center w-fit'>Back to Home</Link></div>
        </div>
    )
}

export default Verify;