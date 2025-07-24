import { findUser } from "@/redux/type";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
    const cookieStore = await cookies()
    const body = await req.json();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });

    const data: findUser = await res.json();
    if (!res.ok) return NextResponse.json({
        ok: data.ok,
        msg: data.msg
    }, { status: res.status });

    if (!data.ok) {
        return NextResponse.json({
            ok: data.ok,
            msg: data.msg,
            token: data.token
        },
            { status: 200 }
        )
    }
    cookieStore.set('accessToken', data.token || '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30
    });
    return NextResponse.json(
        {
            ok: data.ok,
            msg: data.msg,
            user: data.user,
        },
        { status: 200 }
    );
}
