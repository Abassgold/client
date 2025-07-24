import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export const GET = async () => {
    const cookieStore = await cookies()
    cookieStore.delete('accessToken')
    return NextResponse.json({ ok: true }, { status: 200 });
}