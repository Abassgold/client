export type package_nameType =
  | "GOTV"
  | "DSTV"
  | "STARTIMES"
  | ''

export type CableType = {
  id: string;
  package_name: string;
  price: number;
};


export const tvPlans: Record<package_nameType, CableType[]> = {
  GOTV: [
    { id: '2', package_name: "GOtv Max", price: 8500 },
    { id: '16', package_name: "GOtv Jinja", price: 3900 },
    { id: '17', package_name: "GOtv Jolli", price: 5800 },
    { id: '34', package_name: "GOtv Smallie - Monthly", price: 1900 },
    { id: '35', package_name: "GOtv Smallie - Quarterly", price: 5100 },
    { id: '36', package_name: "GOtv Smallie - Yearly", price: 15000 },
    { id: '48', package_name: "GOtv Supa - Monthly", price: 11400 }
  ],

  DSTV: [
    { id: '6', package_name: "DStv Yanga", price: 6000 },
    { id: '7', package_name: "DStv Compact", price: 19000 },
    { id: '8', package_name: "DStv Compact Plus", price: 30000 },
    { id: '9', package_name: "DStv Premium", price: 44500 },
    { id: '19', package_name: "DStv Confam", price: 11000 },
    { id: '20', package_name: "DStv Padi", price: 4400 },
    { id: '21', package_name: "DStv Great Wall Standalone", price: 3800 },
    { id: '24', package_name: "DStv Premium French", price: 69000 },
    { id: '25', package_name: "DStv Premium Asia", price: 50500 },
    { id: '26', package_name: "DStv Confam + Extra View", price: 17000 },
    { id: '27', package_name: "DStv Yanga + Extra View", price: 12000 },
    { id: '28', package_name: "DStv Padi + Extra View", price: 10400 },
    { id: '29', package_name: "DStv Compact + Extra View", price: 25000 },
    { id: '30', package_name: "DStv Premium + Extra View", price: 50500 },
    { id: '31', package_name: "DStv Compact Plus + Extra View", price: 36000 },
    { id: '33', package_name: "ExtraView Access", price: 6000 }
  ],

  STARTIMES: [
    { id: '11', package_name: "Classic - 1 Month", price: 6000 },
    { id: '13', package_name: "Smart - 1 Month", price: 5100 },
    { id: '14', package_name: "Nova - 1 Month", price: 2100 },
    { id: '15', package_name: "Super - 1 Month", price: 9800 },
    { id: '37', package_name: "Nova - 1 Week", price: 700 },
    { id: '38', package_name: "Basic - 1 Week", price: 1400 },
    { id: '39', package_name: "Smart - 1 Week", price: 1700 },
    { id: '40', package_name: "Classic - 1 Week", price: 2000 },
    { id: '41', package_name: "Super - 1 Week", price: 3300 },
    { id: '47', package_name: "Supa Plus - 1 Month", price: 16800 },
    { id: '49', package_name: "Basic - 1 Month", price: 3300 }
  ],
  '': []
};
