type NetworkType = 'MTN' | 'Airtel' | 'Glo' | '9Mobile';

type DataType = {
  size: string;
  price: number;
  validity: string;
  plan_id: number;
};

const dataPlans: Record<NetworkType, DataType[]> = {
  MTN: [
    { size: "500MB", price: 340, validity: "1 day", plan_id: 366 },
    { size: "1GB", price: 780, validity: "7 days", plan_id: 408 },
    { size: "2GB", price: 1455, validity: "30 days", plan_id: 410 },
    { size: "3.5GB", price: 2425, validity: "30 days", plan_id: 353 },
    { size: "5GB", price: 3000, validity: "30 days", plan_id: 371 },
    { size: "10GB", price: 4365, validity: "30 days", plan_id: 351 },
    { size: "20GB", price: 7275, validity: "30 days", plan_id: 369 },
  ],
  Airtel: [
    { size: "500MB", price: 514, validity: "7 days", plan_id: 372 },
    { size: "1GB", price: 814, validity: "7 days", plan_id: 373 },
    { size: "2GB", price: 1514, validity: "30 days", plan_id: 375 },
    { size: "3GB", price: 2014, validity: "30 days", plan_id: 376 },
    { size: "5GB", price: 2514, validity: "30 days", plan_id: 377 },
    { size: "10GB", price: 3014, validity: "30 days", plan_id: 379 },
  ],
  Glo: [
    { size: "500MB", price: 200, validity: "30 days", plan_id: 203 },
    { size: "1GB", price: 400, validity: "30 days", plan_id: 194 },
    { size: "2GB", price: 800, validity: "30 days", plan_id: 195 },
    { size: "3GB", price: 1200, validity: "30 days", plan_id: 196 },
    { size: "5GB", price: 2000, validity: "30 days", plan_id: 197 },
    { size: "10GB", price: 4000, validity: "30 days", plan_id: 200 },
  ],
  '9Mobile': [
    { size: "500MB", price: 150, validity: "30 days", plan_id: 221 },
    { size: "1GB", price: 300, validity: "30 days", plan_id: 183 },
    { size: "2GB", price: 600, validity: "30 days", plan_id: 185 },
    { size: "3GB", price: 900, validity: "30 days", plan_id: 186 },
    { size: "5GB", price: 1500, validity: "30 days", plan_id: 188 },
    { size: "10GB", price: 3000, validity: "30 days", plan_id: 189 },
  ],
};



export default dataPlans;
