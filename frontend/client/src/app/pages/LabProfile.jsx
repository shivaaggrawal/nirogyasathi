// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { ref, get } from "firebase/database";
// import { db } from "../firebase";

// export default function LabProfile() {
//   const { id } = useParams();
//   const [lab, setLab] = useState(null);

//   useEffect(() => {
//     const fetchLab = async () => {
//       const snapshot = await get(ref(db, `labs/${id}`));
//       if (snapshot.exists()) {
//         setLab(snapshot.val());
//       }
//     };

//     fetchLab();
//   }, [id]);

//   if (!lab) return <p className="p-10">Loading...</p>;

//   return (
//     <div className="p-10 bg-gray-50 min-h-screen">

//       {/* HEADER */}
//       <div className="bg-white p-6 rounded-xl shadow mb-6">
//         <img
//           src="https://images.unsplash.com/photo-1581595219319-4d8c8c9d4c2d"
//           className="w-full h-60 object-cover rounded-lg mb-4"
//         />

//         <h1 className="text-2xl font-bold">{lab.name}</h1>
//         <p className="text-gray-500">{lab.address}</p>

//         <p className="mt-2">⭐ {lab.rating}</p>

//         <span
//           className={`px-3 py-1 rounded text-white ${
//             lab.open ? "bg-green-500" : "bg-red-500"
//           }`}
//         >
//           {lab.open ? "Open Now" : "Closed"}
//         </span>
//       </div>

//       {/* ABOUT */}
//       <div className="bg-white p-6 rounded-xl shadow mb-6">
//         <h2 className="font-bold text-lg mb-2">About Lab</h2>
//         <p>{lab.about}</p>
//       </div>

//       {/* SERVICES */}
//       <div className="bg-white p-6 rounded-xl shadow mb-6">
//         <h2 className="font-bold text-lg mb-2">Available Tests</h2>

//         <div className="flex gap-2 flex-wrap">
//           {lab.tests?.map((test, i) => (
//             <span
//               key={i}
//               className="bg-blue-100 px-3 py-1 rounded-lg"
//             >
//               {test}
//             </span>
//           ))}
//         </div>
//       </div>

//       {/* INFO */}
//       <div className="bg-white p-6 rounded-xl shadow mb-6">
//         <p><b>Price Range:</b> {lab.priceRange}</p>
//         <p><b>Working Hours:</b> {lab.hours}</p>
//         <p><b>Contact:</b> {lab.contact}</p>
//         <p>
//           <b>Home Collection:</b>{" "}
//           {lab.homeCollection ? "Available" : "Not Available"}
//         </p>
//       </div>

//       {/* BOOK BUTTON */}
//       <button className="bg-blue-600 text-white px-6 py-3 rounded-xl">
//         Book Test
//       </button>

//     </div>
//   );
// }