interface isAuth {
    ok: boolean;
    msg?: string;
    isSuspended?: boolean;
}
export const isAuthenticated = async (token: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/isAuthenticated`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        // If suspended, backend returns 403
        if (res.status === 403) {
            return { authenticated: true, suspended: true };
        }

        const data: isAuth = await res.json();

        if (res.ok && data.ok) {
            return { authenticated: true, suspended: false };
        }

        return { authenticated: false, suspended: false };
    } catch (err: unknown) {
        console.error(err instanceof Error ? err.message : 'Unknown Error: ' + err);
        return { authenticated: false, suspended: false };
    }
}


export const isAdmin = async (token: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/isAuthorized`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });

        const data: isAuth = await res.json()
        if (data.ok) {
            return true
        }
        return false
    } catch (err: unknown) {
        if (err instanceof Error)
            console.error(err.message)
        return false
        console.error('Unknown Error: ', err)
        return false;
    }
}