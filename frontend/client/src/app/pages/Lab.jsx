import React, { useState } from 'react';
import { 
  Star, MapPin, Phone, Globe, Clock, ShieldCheck, 
  Beaker, Calendar, CheckCircle2, ChevronRight, Info 
} from 'lucide-react';

export default function LabProfile() {
  const [selectedDate, setSelectedDate] = useState("Today, 15 Apr");
  const [selectedSlot, setSelectedSlot] = useState(null);

  // Dummy Data for UI
  const lab = {
    name: "Apollo Diagnostics",
    rating: "4.8",
    reviews: "1,240",
    address: "MG Road, Near City Center, Gwalior, MP",
    openStatus: "Open until 8:00 PM",
    about: "Apollo Diagnostics is a leading NABL certified laboratory providing high-end diagnostic services with 100% accuracy and digital report delivery within 24 hours.",
    tests: [
      { id: 1, name: "Complete Blood Count (CBC)", price: "₹299" },
      { id: 2, title: "Lipid Profile", price: "₹599" },
      { id: 3, title: "Diabetes Screening", price: "₹899" }
    ],
    slots: ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "04:00 PM", "05:00 PM"]
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 font-sans tracking-tight">
      {/* 1. Header Section */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="bg-blue-600 text-white text-[10px] font-black px-2 py-1 rounded uppercase tracking-widest">Verified Lab</span>
                <div className="flex items-center gap-1 text-amber-500 text-sm font-bold">
                  <Star className="size-4 fill-current" /> {lab.rating} ({lab.reviews} Reviews)
                </div>
              </div>
              <h1 className="text-4xl font-bold text-slate-900">{lab.name}</h1>
              <p className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                <MapPin className="size-4 text-blue-600" /> {lab.address}
              </p>
            </div>
            
            <div className="flex gap-3">
              <button className="p-3 bg-slate-50 text-slate-600 rounded-2xl hover:bg-slate-100 transition-all border border-slate-100">
                <Phone className="size-5" />
              </button>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all">
                Get Directions
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* LEFT COLUMN: Lab Info & Tests */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* About Section */}
            <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-4 flex items-center gap-2">
                <Info className="size-4" /> About Laboratory
              </h3>
              <p className="text-slate-600 leading-relaxed font-medium">
                {lab.about}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
                <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100/50 flex flex-col items-center text-center">
                  <ShieldCheck className="size-6 text-blue-600 mb-2" />
                  <span className="text-[10px] font-bold text-blue-800 uppercase">NABL Certified</span>
                </div>
                <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100/50 flex flex-col items-center text-center">
                  <Clock className="size-6 text-emerald-600 mb-2" />
                  <span className="text-[10px] font-bold text-emerald-800 uppercase">Reports in 24h</span>
                </div>
                <div className="p-4 bg-purple-50/50 rounded-2xl border border-purple-100/50 flex flex-col items-center text-center">
                  <Beaker className="size-6 text-purple-600 mb-2" />
                  <span className="text-[10px] font-bold text-purple-800 uppercase">Home Collection</span>
                </div>
              </div>
            </section>

            {/* Test Availability Section */}
            <section className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Popular Tests</h3>
              <div className="space-y-3">
                {lab.tests.map(test => (
                  <div key={test.id} className="bg-white p-5 rounded-3xl border border-slate-100 flex justify-between items-center group hover:border-blue-200 transition-all cursor-pointer shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="size-10 bg-slate-50 rounded-xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <Beaker className="size-5" />
                      </div>
                      <span className="font-bold text-slate-800">{test.name || test.title}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-black text-blue-600">{test.price}</span>
                      <ChevronRight className="size-4 text-slate-300" />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN: Booking Engine */}
          <aside className="lg:col-span-5">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100 sticky top-10">
              <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-2">
                <Calendar className="size-5 text-blue-600" /> Schedule Visit
              </h3>

              {/* Date Selection */}
              <div className="mb-8">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Select Date</p>
                <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                  {["Today, 15 Apr", "Tomorrow, 16 Apr", "Fri, 17 Apr"].map(date => (
                    <button
                      key={date}
                      onClick={() => setSelectedDate(date)}
                      className={`px-4 py-3 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border ${
                        selectedDate === date 
                        ? "bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-200" 
                        : "bg-slate-50 text-slate-500 border-transparent hover:border-slate-200"
                      }`}
                    >
                      {date}
                    </button>
                  ))}
                </div>
              </div>

              {/* Slots Selection */}
              <div className="mb-10">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Available Slots</p>
                <div className="grid grid-cols-3 gap-3">
                  {lab.slots.map(slot => (
                    <button
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      className={`py-3 rounded-xl text-[11px] font-black transition-all border ${
                        selectedSlot === slot 
                        ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-100" 
                        : "bg-white text-slate-600 border-slate-100 hover:border-blue-200"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pricing & CTA */}
              <div className="space-y-4 pt-6 border-t border-slate-50">
                <div className="flex justify-between items-center text-sm font-bold">
                  <span className="text-slate-400">Consultation Fee</span>
                  <span className="text-slate-800">₹0.00</span>
                </div>
                <div className="flex justify-between items-center text-lg font-black">
                  <span className="text-slate-900">Est. Total</span>
                  <span className="text-blue-600">₹599.00</span>
                </div>
                <button className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all uppercase tracking-widest text-sm mt-4">
                  Confirm Booking
                </button>
                <p className="text-[9px] text-center text-slate-400 font-bold uppercase tracking-tighter">
                  No payment required now. Pay at the lab.
                </p>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}