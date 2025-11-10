export type packageType =
  | "GOTV"
  | "DSTV"
  | "STARTIMES"
  | ''

export type CableType = {
  id: string;
  package: string;
  price: number;
};


export const tvPlans: Record<packageType, CableType[]> = {
  GOTV: [
    { id: '2', package: "GOtv Max", price: 8500 },
    { id: '16', package: "GOtv Jinja", price: 3900 },
    { id: '17', package: "GOtv Jolli", price: 5800 },
    { id: '34', package: "GOtv Smallie - Monthly", price: 1900 },
    { id: '35', package: "GOtv Smallie - Quarterly", price: 5100 },
    { id: '36', package: "GOtv Smallie - Yearly", price: 15000 },
    { id: '48', package: "GOtv Supa - Monthly", price: 11400 }
  ],

  DSTV: [
    { id: '6', package: "DStv Yanga", price: 6000 },
    { id: '7', package: "DStv Compact", price: 19000 },
    { id: '8', package: "DStv Compact Plus", price: 30000 },
    { id: '9', package: "DStv Premium", price: 44500 },
    { id: '19', package: "DStv Confam", price: 11000 },
    { id: '20', package: "DStv Padi", price: 4400 },
    { id: '21', package: "DStv Great Wall Standalone", price: 3800 },
    { id: '24', package: "DStv Premium French", price: 69000 },
    { id: '25', package: "DStv Premium Asia", price: 50500 },
    { id: '26', package: "DStv Confam + Extra View", price: 17000 },
    { id: '27', package: "DStv Yanga + Extra View", price: 12000 },
    { id: '28', package: "DStv Padi + Extra View", price: 10400 },
    { id: '29', package: "DStv Compact + Extra View", price: 25000 },
    { id: '30', package: "DStv Premium + Extra View", price: 50500 },
    { id: '31', package: "DStv Compact Plus + Extra View", price: 36000 },
    { id: '33', package: "ExtraView Access", price: 6000 }
  ],

  STARTIMES: [
    { id: '11', package: "Classic - 1 Month", price: 6000 },
    { id: '13', package: "Smart - 1 Month", price: 5100 },
    { id: '14', package: "Nova - 1 Month", price: 2100 },
    { id: '15', package: "Super - 1 Month", price: 9800 },
    { id: '37', package: "Nova - 1 Week", price: 700 },
    { id: '38', package: "Basic - 1 Week", price: 1400 },
    { id: '39', package: "Smart - 1 Week", price: 1700 },
    { id: '40', package: "Classic - 1 Week", price: 2000 },
    { id: '41', package: "Super - 1 Week", price: 3300 },
    { id: '47', package: "Supa Plus - 1 Month", price: 16800 },
    { id: '49', package: "Basic - 1 Month", price: 3300 }
  ],
  '': []
};
