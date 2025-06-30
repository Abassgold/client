interface isAuth {
    ok: boolean
}
const isAuthenticated = async (token: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/isAuthenticated`, {
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
export default isAuthenticated;