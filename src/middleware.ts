import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import isAuthenticated from './middlewares/api/authMiddleware';

export async function middleware(req: NextRequest) {
    const token = req.cookies.get('accessToken')?.value || '';
    const protectedRoutes = ['/dashboard', '/transactions', '/crypto', '/account', '/virtual-number', '/transactions', '/utilities', '/giftcards',];
    if (!token || token === '' || !(await isAuthenticated(token))) {
        return NextResponse.redirect(new URL('/login', req.url))
    }
    if (!protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route))) {
        return NextResponse.redirect(new URL('/login', req.url));
    }
    return NextResponse.next();
}


export const config = {
  matcher: [
    '/dashboard/:path*',
    '/account/:path*',
    '/transactions/:path*',
    '/crypto/:path*',
    '/virtual-number/:path*',
    '/utilities/:path*',
    '/giftcards/:path*',
    '/recharge/:path*'
  ],
};
