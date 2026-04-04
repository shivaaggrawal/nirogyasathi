import { useState } from "react";
import { 
  FileText, Upload, Download, Eye, Calendar, User, Trash2, Plus, 
  Mail, Phone, MapPin, Heart, Clock, Edit, Shield, Activity, Search
} from "lucide-react";

export default function IntegratedHealthDashboard() {
  const [activeTab, setActiveTab] = useState("All");
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Combined Data States
  const [user] = useState({
    name: "John Anderson",
    email: "john.anderson@email.com",
    bloodType: "O+",
    emergencyContact: "+1 (555) 123-7890",
    lastCheckup: "March 15, 2026"
  });

  const [records] = useState([
    { id: 1, title: "Blood Test Results", type: "Lab Report", date: "March 15, 2026", doctor: "Dr. Sarah Johnson", canEdit: false },
    { id: 2, title: "Hypertension Meds", type: "Prescription", date: "March 10, 2026", doctor: "Dr. Sarah Johnson", canEdit: false },
    { id: 3, title: "Annual Physical", type: "Diagnosis", date: "Feb 28, 2026", doctor: "Dr. Robert Thompson", canEdit: true },
    { id: 4, title: "Chest X-Ray", type: "Scan", date: "Jan 20, 2026", doctor: "Dr. Michael Chen", canEdit: false }
  ]);

  const types = ["All", "Prescription", "Lab Report", "Diagnosis", "Scan"];
  const filteredRecords = activeTab === "All" ? records : records.filter(r => r.type === activeTab);

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* --- Top Hero Bar --- */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              Health<span className="text-cyan-600">Central</span>
            </h1>
            <p className="text-slate-500 text-sm">Welcome back, {user.name.split(' ')[0]}</p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
              <input type="text" placeholder="Search records..." className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-cyan-500/20" />
            </div>
            <button 
              onClick={() => setShowUploadModal(true)}
              className="bg-cyan-600 hover:bg-cyan-700 text-white p-2 md:px-4 rounded-xl transition-all flex items-center gap-2"
            >
              <Plus className="size-5" />
              <span className="hidden md:block">New Record</span>
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* --- Left Column: The Profile Card --- */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-4xl overflow-hidden shadow-xl shadow-cyan-900/5 border border-slate-100">
              <div className="h-24 bg-linear-to-r from-cyan-500 to-blue-600" />
              <div className="px-6 pb-6">
                <div className="relative -mt-12 mb-4">
                  <div className="size-24 bg-white p-1 rounded-2xl shadow-lg">
                    <div className="size-full bg-slate-100 rounded-xl flex items-center justify-center text-cyan-600">
                      <User className="size-12" />
                    </div>
                  </div>
                  <button className="absolute bottom-0 right-0 p-2 bg-white shadow-md rounded-lg text-slate-600 hover:text-cyan-600 transition-colors">
                    <Edit className="size-4" />
                  </button>
                </div>
                
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-slate-500 text-sm mb-6">{user.email}</p>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Blood Type</p>
                    <p className="text-lg font-bold text-red-500">{user.bloodType}</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Last Visit</p>
                    <p className="text-sm font-bold">2d ago</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm p-3 hover:bg-slate-50 rounded-xl transition-colors">
                    <Phone className="size-4 text-cyan-500" />
                    <span className="font-medium text-slate-700">{user.emergencyContact}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm p-3 hover:bg-slate-50 rounded-xl transition-colors">
                    <Shield className="size-4 text-emerald-500" />
                    <span className="font-medium text-slate-700">Premium Insurance</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Health Insight Tile */}
            <div className="bg-linear-to-br from-slate-900 to-slate-800 rounded-4xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <Activity className="size-6 text-cyan-400" />
                <span className="text-[10px] bg-white/10 px-2 py-1 rounded-full">Live Stats</span>
              </div>
              <p className="text-slate-400 text-xs mb-1">Health Score</p>
              <h3 className="text-3xl font-black mb-4">92<span className="text-sm font-normal text-slate-400 ml-1">/100</span></h3>
              <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div className="bg-cyan-400 h-full w-[92%]" />
              </div>
            </div>
          </aside>

          {/* --- Right Column: The Records Grid --- */}
          <main className="lg:col-span-8 space-y-6">
            {/* Filter Pills */}
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
              {types.map(t => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t)}
                  className={`px-5 py-2 rounded-2xl whitespace-nowrap text-sm font-semibold transition-all ${
                    activeTab === t 
                    ? "bg-cyan-600 text-white shadow-lg shadow-cyan-200" 
                    : "bg-white text-slate-500 hover:bg-slate-50 border border-slate-100"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* The Record Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredRecords.map(record => (
                <div key={record.id} className="group bg-white p-5 rounded-4xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-cyan-900/5 transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <div className="size-12 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <FileText className="size-6 text-cyan-600" />
                    </div>
                    <div className="flex gap-1">
                      <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-cyan-600 transition-colors">
                        <Eye className="size-4" />
                      </button>
                      <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-cyan-600 transition-colors">
                        <Download className="size-4" />
                      </button>
                    </div>
                  </div>
                  
                  <h4 className="font-bold text-slate-800 mb-1 leading-tight">{record.title}</h4>
                  <p className="text-xs text-slate-400 mb-4 flex items-center gap-1">
                    <Calendar className="size-3" /> {record.date} • {record.doctor}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-600 bg-cyan-50 px-3 py-1 rounded-full">
                      {record.type}
                    </span>
                    {record.canEdit && (
                      <span className="text-[10px] font-bold text-slate-400">Personal Entry</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredRecords.length === 0 && (
              <div className="bg-white rounded-4xl p-12 text-center border-2 border-dashed border-slate-200">
                <p className="text-slate-400">No records found in this category.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}