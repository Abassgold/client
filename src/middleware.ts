import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { isAdmin, isAuthenticated } from './middlewares/api/authMiddleware';

export async function middleware(req: NextRequest) {
    const token = req.cookies.get('accessToken')?.value || '';
    const adminRoutes = ['/admin'];

    const authStatus = await isAuthenticated(token);

    if (!token || !authStatus.authenticated) {
        return NextResponse.redirect(new URL('/login', req.url));
    }
    if (authStatus.suspended) {
        return NextResponse.redirect(new URL('/account-suspended', req.url));
    }
    if (adminRoutes.some(route => req.nextUrl.pathname.startsWith(route))) {
        if (!(await isAdmin(token))) {
            return NextResponse.redirect(new URL('/login', req.url));
        }
    }
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/user/:path*',
        '/admin/:path*'
    ],
};
