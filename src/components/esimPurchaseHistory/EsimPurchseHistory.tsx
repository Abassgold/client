// "use client"
// import { useState } from "react"

// interface Esim {
//   id: string
//   country: string
//   data: string
//   validity: string
//   price: number
//   status: "Active" | "Expired" | "Pending"
//   purchaseDate: string
// }

// const mockHistory: Esim[] = [
//   {
//     id: "1",
//     country: "USA",
//     data: "5GB",
//     validity: "30 Days",
//     price: 15,
//     status: "Active",
//     purchaseDate: "2025-09-01",
//   },
//   {
//     id: "2",
//     country: "UK",
//     data: "1GB",
//     validity: "7 Days",
//     price: 5,
//     status: "Expired",
//     purchaseDate: "2025-08-15",
//   },
// ]

// const EsimHistory = () => {
//   const [history, setHistory] = useState<Esim[]>(mockHistory)

//   return (
//     <div className="mt-8">
//       <h2 className="text-xl font-bold mb-4">My eSIMs</h2>

//       {history.length > 0 ? (
//         <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
//           <table className="min-w-full divide-y divide-gray-200 text-sm">
//             <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
//               <tr>
//                 <th className="px-4 py-3 text-left">Country</th>
//                 <th className="px-4 py-3 text-left">Plan</th>
//                 <th className="px-4 py-3 text-left">Purchase Date</th>
//                 <th className="px-4 py-3 text-left">Status</th>
//                 <th className="px-4 py-3"></th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200 bg-white">
//               {history.map((item) => (
//                 <tr key={item.id}>
//                   <td className="px-4 py-3 font-medium">{item.country}</td>
//                   <td className="px-4 py-3">
//                     {item.data} / {item.validity} – ${item.price}
//                   </td>
//                   <td className="px-4 py-3">{item.purchaseDate}</td>
//                   <td className="px-4 py-3">
//                     <span
//                       className={`px-2 py-1 rounded-full text-xs font-medium ${
//                         item.status === "Active"
//                           ? "bg-green-100 text-green-600"
//                           : item.status === "Expired"
//                           ? "bg-red-100 text-red-600"
//                           : "bg-yellow-100 text-yellow-600"
//                       }`}
//                     >
//                       {item.status}
//                     </span>
//                   </td>
//                   <td className="px-4 py-3 text-right">
//                     <button
//                       className="text-teal-600 hover:underline"
//                       onClick={() => alert(`Show QR for ${item.country}`)}
//                     >
//                       View QR
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <p className="text-gray-500">No eSIMs purchased yet.</p>
//       )}
//     </div>
//   )
// }

// export default EsimHistory
