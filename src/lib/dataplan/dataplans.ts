type NetworkType = 'MTN' | 'AIRTEL' | 'GLO' | '9MOBILE';

type DataType = {
  size: string;
  price: number;
  validity: string;
  plan_id: number;
};
const dataPlans: Record<NetworkType, DataType[]> = {
  "9MOBILE": [
    { size: "500MB", price: 182, validity: "30 days", plan_id: 221 },
    { size: "1GB", price: 365, validity: "30 days", plan_id: 183 },
    { size: "1.5GB", price: 548, validity: "30 days", plan_id: 184 },
    { size: "2GB", price: 720, validity: "30 days", plan_id: 185 },
    { size: "3GB", price: 1095, validity: "30 days", plan_id: 186 },
    { size: "4GB", price: 1460, validity: "30 days", plan_id: 265 },
    { size: "5GB", price: 1825, validity: "30 days", plan_id: 188 },
    { size: "10GB", price: 3650, validity: "30 days", plan_id: 189 },
    { size: "20GB", price: 7300, validity: "Monthly", plan_id: 229 }
  ],

  AIRTEL: [
    { size: "150MB", price: 60, validity: "1 day", plan_id: 281 },
    { size: "300MB", price: 145, validity: "2 days", plan_id: 405 },
    { size: "600MB", price: 245, validity: "2 days", plan_id: 404 },
    { size: "600MB", price: 245, validity: "2 days", plan_id: 406 },
    { size: "1GB (Social)", price: 345, validity: "3 days", plan_id: 367 },
    { size: "1GB (Social)", price: 345, validity: "3 days", plan_id: 374 },
    { size: "500MB", price: 545, validity: "7 days", plan_id: 375 },
    { size: "1.5GB", price: 645, validity: "2 days", plan_id: 382 },
    { size: "1.5GB", price: 645, validity: "2 days", plan_id: 387 },
    { size: "2GB", price: 800, validity: "2 days", plan_id: 383 },
    { size: "2GB", price: 800, validity: "2 days", plan_id: 386 },
    { size: "5GB", price: 1545, validity: "7 days", plan_id: 384 },
    { size: "5GB", price: 1545, validity: "7 days", plan_id: 385 },
    { size: "2GB", price: 1545, validity: "30 days", plan_id: 376 },
    { size: "3GB", price: 2045, validity: "30 days", plan_id: 377 },
    { size: "10GB", price: 3050, validity: "30 days", plan_id: 412 },
    { size: "10GB", price: 4045, validity: "30 days", plan_id: 381 },
    { size: "25GB", price: 8045, validity: "30 days", plan_id: 379 },
    { size: "60GB", price: 15045, validity: "30 days", plan_id: 380 }
  ],

  GLO: [
    { size: "200MB", price: 84, validity: "14 days", plan_id: 225 },
    { size: "750MB", price: 192, validity: "1 day", plan_id: 275 },
    { size: "500MB", price: 202, validity: "14 days", plan_id: 203 },
    { size: "1GB", price: 275, validity: "3 days", plan_id: 396 },
    { size: "1.5GB", price: 290, validity: "1 day", plan_id: 276 },
    { size: "2.5GB", price: 480, validity: "2 days", plan_id: 277 },
    { size: "1GB", price: 320, validity: "7 days", plan_id: 399 },
    { size: "1GB", price: 403, validity: "30 days", plan_id: 194 },
    { size: "2GB", price: 806, validity: "30 days", plan_id: 195 },
    { size: "3GB", price: 825, validity: "3 days", plan_id: 397 },
    { size: "3GB", price: 960, validity: "7 days", plan_id: 400 },
    { size: "3GB", price: 1209, validity: "30 days", plan_id: 196 },
    { size: "5GB", price: 1375, validity: "3 days", plan_id: 398 },
    { size: "5GB", price: 1600, validity: "7 days", plan_id: 401 },
    { size: "5GB", price: 2015, validity: "30 days", plan_id: 197 },
    { size: "10GB", price: 1930, validity: "7 days", plan_id: 278 },
    { size: "10GB", price: 4030, validity: "30 days", plan_id: 200 }
  ],
  MTN: [
    { size: "110MB", price: 98, validity: "1 day", plan_id: 348 },
    { size: "230MB", price: 196, validity: "1 day", plan_id: 320 },
    { size: "1.0GB", price: 490, validity: "1 day", plan_id: 215 },
    { size: "2.5GB", price: 882, validity: "2 days", plan_id: 329 },
    { size: "500MB", price: 490, validity: "7 days", plan_id: 350 },
    { size: "1GB", price: 560, validity: "7 days", plan_id: 409 },
    { size: "1.5GB", price: 588, validity: "2 days", plan_id: 361 },
    { size: "1.2GB", price: 735, validity: "7 days", plan_id: 321 },
    { size: "2GB", price: 735, validity: "2 days", plan_id: 328 },
    { size: "1GB", price: 785, validity: "7 days", plan_id: 415 },
    { size: "2.5GB", price: 882, validity: "2 days", plan_id: 329 },
    { size: "1.5GB", price: 980, validity: "7 days", plan_id: 360 },
    { size: "3.2GB", price: 990, validity: "2 days", plan_id: 218 },
    { size: "2GB", price: 1120, validity: "30 days", plan_id: 403 },
    { size: "2GB", price: 1470, validity: "30 days", plan_id: 335 },
    { size: "1.2GB", price: 1470, validity: "30 days + N1500 call + 100SMS", plan_id: 358 },
    { size: "3GB", price: 1680, validity: "30 days", plan_id: 310 },
    { size: "3.5GB", price: 2450, validity: "30 days + 2GB Night", plan_id: 349 },
    { size: "6GB", price: 2450, validity: "7 days", plan_id: 327 },
    { size: "5GB", price: 2800, validity: "30 days", plan_id: 366 },
    { size: "5GB", price: 3100, validity: "30 days", plan_id: 372 },
    { size: "7GB", price: 3430, validity: "30 days", plan_id: 371 },
    { size: "11GB", price: 3430, validity: "7 days", plan_id: 302 },
    { size: "11GB", price: 3465, validity: "7 days", plan_id: 408 },
    { size: "10GB", price: 4410, validity: "30 days", plan_id: 346 },
    { size: "14.5GB", price: 4900, validity: "30 days", plan_id: 343 },
    { size: "12.5GB", price: 5390, validity: "30 days", plan_id: 345 },
    { size: "16.5GB", price: 6370, validity: "30 days", plan_id: 339 },
    { size: "20GB", price: 7350, validity: "30 days", plan_id: 369 },
    { size: "36GB", price: 10780, validity: "30 days", plan_id: 370 },
    { size: "75GB", price: 17640, validity: "30 days", plan_id: 300 },
    { size: "165GB", price: 33950, validity: "30 days", plan_id: 414 }
  ]
};



export default dataPlans;
