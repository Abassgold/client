"use client";

// import { useEffect, useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Input } from "@/components/ui/input";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";

// Mock API fetch
// const fetchPlans = async () => {
//   return new Promise((resolve) =>
//     setTimeout(
//       () =>
//         resolve([
//           { id: 1, name: "USA 5GB", price: "$20", validity: "30 days", country: "USA" },
//           { id: 2, name: "UK 3GB", price: "$15", validity: "15 days", country: "UK" },
//           { id: 3, name: "Global 10GB", price: "$40", validity: "60 days", country: "Global" },
//         ]),
//       800
//     )
//   );
// };

// const fetchPurchases = async () => {
//   return new Promise((resolve) =>
//     setTimeout(
//       () =>
//         resolve([
//           {
//             id: "ORD-20230912",
//             name: "USA 5GB",
//             status: "Active",
//             qrCode: "/sample-qr.png",
//             validity: "30 days",
//             purchasedOn: "2025-09-10",
//           },
//         ]),
//       1000
//     )
//   );
// };

const EsimPage = () => {
  // const [plans, setPlans] = useState<any[]>([]);
  // const [purchases, setPurchases] = useState<any[]>([]);
  // const [loadingPlans, setLoadingPlans] = useState(true);
  // const [loadingPurchases, setLoadingPurchases] = useState(true);
  // const [search, setSearch] = useState("");
  // const [country, setCountry] = useState("All");
  // const [selectedPlan, setSelectedPlan] = useState<any | null>(null);

  // useEffect(() => {
  //   fetchPlans().then((data: any) => {
  //     setPlans(data);
  //     setLoadingPlans(false);
  //   });

  //   fetchPurchases().then((data: any) => {
  //     setPurchases(data);
  //     setLoadingPurchases(false);
  //   });
  // }, []);

  // const countries = ["All", ...new Set(plans.map((p) => p.country))];

  // const filteredPlans = plans.filter(
  //   (p) =>
  //     (country === "All" || p.country === country) &&
  //     (p.name.toLowerCase().includes(search.toLowerCase()) ||
  //       p.country.toLowerCase().includes(search.toLowerCase()))
  // );

  return (
    <div>
      coming soon...
    </div>
    // <div className="max-w-5xl mx-auto p-6">
    //   <h1 className="text-2xl font-bold mb-6">eSIM Marketplace</h1>

    //   <Tabs defaultValue="buy">
    //     <TabsList className="mb-6">
    //       <TabsTrigger value="buy">Buy eSIM</TabsTrigger>
    //       <TabsTrigger value="history">My eSIMs</TabsTrigger>
    //     </TabsList>

    //     {/* Buy New eSIM Section */}
    //     <TabsContent value="buy">
    //       <div className="flex flex-col md:flex-row gap-4 mb-4">
    //         <Input
    //           placeholder="Search country or plan..."
    //           value={search}
    //           onChange={(e) => setSearch(e.target.value)}
    //         />
    //         <select
    //           className="border rounded-md p-2"
    //           value={country}
    //           onChange={(e) => setCountry(e.target.value)}
    //         >
    //           {countries.map((c) => (
    //             <option key={c} value={c}>
    //               {c}
    //             </option>
    //           ))}
    //         </select>
    //       </div>

    //       {loadingPlans ? (
    //         <p className="text-gray-500">Loading plans...</p>
    //       ) : (
    //         <div className="grid gap-4 md:grid-cols-2">
    //           {filteredPlans.map((plan) => (
    //             <Card key={plan.id} className="rounded-2xl shadow-md">
    //               <CardContent className="p-6">
    //                 <h2 className="text-lg font-semibold text-gray-600">{plan.name}</h2>
    //                 <p className="text-sm text-gray-500">{plan.validity}</p>
    //                 <p className="md:text-xl font-bold mt-2 text-gray-600">{plan.price}</p>
    //                 <Button
    //                   className="mt-4 w-full bg-teal-800 border-teal-800 hover:bg-teal-800 hover:text-white/90 text-white"
    //                   onClick={() => setSelectedPlan(plan)}
    //                 >
    //                   Purchase
    //                 </Button>
    //               </CardContent>
    //             </Card>
    //           ))}
    //         </div>
    //       )}
    //     </TabsContent>

    //     {/* Purchase History Section */}
    //     <TabsContent value="history">
    //       {loadingPurchases ? (
    //         <p className="text-gray-500">Loading purchases...</p>
    //       ) : purchases.length === 0 ? (
    //         <p className="text-gray-500">No purchases yet.</p>
    //       ) : (
    //         <div className="space-y-4">
    //           {purchases.map((item) => (
    //             <Card key={item.id} className="rounded-2xl shadow-md">
    //               <CardContent className="p-6 flex justify-between items-center">
    //                 <div>
    //                   <h2 className="text-lg font-semibold">{item.name}</h2>
    //                   <p className="text-sm text-gray-500">
    //                     {item.validity} • Bought on {item.purchasedOn}
    //                   </p>
    //                   <span
    //                     className={`inline-block mt-2 px-3 py-1 text-xs font-medium rounded-full ${
    //                       item.status === "Active"
    //                         ? "bg-green-100 text-green-700"
    //                         : "bg-red-100 text-red-700"
    //                     }`}
    //                   >
    //                     {item.status}
    //                   </span>
    //                 </div>
    //                 <Button
    //                   variant="outline"
    //                   onClick={() => alert(`Download QR for ${item.id}`)}
    //                 >
    //                   View QR
    //                 </Button>
    //               </CardContent>
    //             </Card>
    //           ))}
    //         </div>
    //       )}
    //     </TabsContent>
    //   </Tabs>

    //   {/* Purchase Confirmation Modal */}
    //   <Dialog open={!!selectedPlan} onOpenChange={() => setSelectedPlan(null)}>
    //     <DialogContent>
    //       <DialogHeader>
    //         <DialogTitle>Confirm Purchase</DialogTitle>
    //       </DialogHeader>
    //       {selectedPlan && (
    //         <div className="space-y-3">
    //           <p>
    //             <strong>Plan:</strong> {selectedPlan.name}
    //           </p>
    //           <p>
    //             <strong>Validity:</strong> {selectedPlan.validity}
    //           </p>
    //           <p>
    //             <strong>Price:</strong> {selectedPlan.price}
    //           </p>
    //         </div>
    //       )}
    //       <DialogFooter className="flex justify-end gap-2 mt-4">
    //         <Button variant="outline" onClick={() => setSelectedPlan(null)}>
    //           Cancel
    //         </Button>
    //         <Button
    //           onClick={() => {
    //             alert(`Proceeding to pay for ${selectedPlan.name}`);
    //             setSelectedPlan(null);
    //           }}
    //         >
    //           Confirm & Pay
    //         </Button>
    //       </DialogFooter>
    //     </DialogContent>
    //   </Dialog>
    // </div>
  );
};

export default EsimPage;

