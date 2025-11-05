export function getNetworkByRegex(phoneNumber: string): string {
  phoneNumber = phoneNumber.replace('+234', '0').trim();
if(phoneNumber.length < 11 || phoneNumber.length > 14 ) return 'UNKNOWN'
  const patterns = {
    MTN: /^(0803|0806|0703|0706|0810|0813|0814|0816|0903|0906|0913|0916)/,
    GLO: /^(0805|0807|0705|0811|0815|0905|0915)/,
    AIRTEL: /^(0802|0808|0708|0812|0701|0902|0907|0901|0912|0911)/,
    '9MOBILE': /^(0809|0817|0818|0909|0908)/
  } as const;

  for (const network in patterns) {
    const key = network as keyof typeof patterns;
    if (patterns[key].test(phoneNumber)) {
      return key;
    }
  }
  return 'UNKNOWN';
}
