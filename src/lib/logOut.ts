
export const bounceOut = async () => {
    document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    sessionStorage.removeItem('numberInfo');
    sessionStorage.removeItem('otp');
  }