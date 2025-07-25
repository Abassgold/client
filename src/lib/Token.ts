export const getToken = () =>
   localStorage.getItem('accessToken') ? JSON.parse(localStorage.getItem('accessToken') || '{}').value : '';


export const setToken = (token: string) => {
    const now = new Date();

    const item = {
        value: token,
        expiry: now.getTime() + 30 * 24 * 60 * 60 * 1000, 
    };
    localStorage.setItem('accessToken', JSON.stringify(item));
}

export const deleteToken = () => {
    localStorage.removeItem('accessToken');
}
