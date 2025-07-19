export const getToken = () =>
    document.cookie
        .split('; ')
        .find((row) => row.startsWith('accessToken='))
        ?.split('=')[1];
