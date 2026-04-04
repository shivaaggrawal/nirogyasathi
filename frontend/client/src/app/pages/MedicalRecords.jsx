import { useState } from "react";
import { 
  FileText, Upload, Download, Eye, Calendar, User, Trash2, Plus, 
  Mail, Phone, MapPin, Heart, Clock, Edit, Shield, Activity, Search,
  AlertCircle, Pill, Thermometer, ChevronRight
} from "lucide-react";

export function MedicalRecords() {
  const [selectedType, setSelectedType] = useState("All");
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Updated Mock User Data with Health Info
  const user = {
    name: "John Anderson",
    email: "john.anderson@email.com",
    phone: "+1 (555) 987-6543",
    bloodType: "O+",
    emergencyContact: "+1 (555) 123-7890",
    // --- New Health Data ---
    allergies: ["Peanuts", "Penicillin", "Dust Mites"],
    conditions: [
      { name: "Type 2 Diabetes", status: "Active" },
      { name: "Hypertension", status: "Management" },
      { name: "Appendectomy", status: "Past (2018)" }
    ],
    currentMeds: ["Lisinopril 10mg", "Metformin 500mg"]
  };

  const [records] = useState([
    { id: 1, title: "Blood Test Results", type: "Lab Report", date: "March 15, 2026", doctor: "Dr. Sarah Johnson", description: "Complete blood count and lipid panel", canEdit: false },
    { id: 2, title: "Hypertension Meds", type: "Prescription", date: "March 10, 2026", doctor: "Dr. Sarah Johnson", description: "Lisinopril 10mg daily", canEdit: false },
    { id: 3, title: "Annual Physical", type: "Diagnosis", date: "Feb 28, 2026", doctor: "Dr. Robert Thompson", description: "General health checkup normal", canEdit: true },
    { id: 4, title: "Chest X-Ray", type: "Scan", date: "Jan 20, 2026", doctor: "Dr. Michael Chen", description: "No abnormalities detected", canEdit: false }
  ]);

  const types = ["All", "Prescription", "Lab Report", "Diagnosis", "Scan"];
  const filteredRecords = selectedType === "All" ? records : records.filter(r => r.type === selectedType);

  const getTypeColor = (type) => {
    switch(type) {
      case "Prescription": return "bg-blue-100 text-blue-600";
      case "Lab Report": return "bg-purple-100 text-purple-600";
      case "Diagnosis": return "bg-emerald-100 text-emerald-600";
      case "Scan": return "bg-orange-100 text-orange-600";
      default: return "bg-slate-100 text-slate-600";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: Deep Clinical Profile */}
          <aside className="lg:col-span-4 space-y-6">
            
            {/* Identity Card */}
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden">
              <div className="h-24 bg-gradient-to-r from-blue-600 to-indigo-600" />
              <div className="px-6 pb-6 text-center lg:text-left">
                <div className="relative -mt-12 mb-4 inline-block">
                  <div className="size-24 bg-white p-1 rounded-2xl shadow-md">
                    <div className="size-full bg-slate-100 rounded-xl flex items-center justify-center text-blue-600">
                      <User className="size-12" />
                    </div>
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-slate-800">{user.name}</h2>
                <div className="flex items-center justify-center lg:justify-start gap-2 mt-1 mb-4">
                  <span className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs font-bold border border-red-100 flex items-center gap-1">
                    <Heart className="size-3 fill-current" /> {user.bloodType}
                  </span>
                </div>
                <button className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold transition-colors">
                  Edit Profile
                </button>
              </div>
            </div>

            {/* NEW: Allergies Section (Critical View) */}
            <div className="bg-white rounded-[2rem] p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertCircle className="size-4 text-red-600" />
                </div>
                <h3 className="font-bold text-slate-800">Critical Allergies</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {user.allergies.map((allergy) => (
                  <span key={allergy} className="px-3 py-1.5 bg-red-50 text-red-700 text-[11px] font-bold rounded-lg border border-red-100">
                    {allergy}
                  </span>
                ))}
              </div>
            </div>

            {/* NEW: Medical Conditions & Past Diseases */}
            <div className="bg-white rounded-[2rem] p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Activity className="size-4 text-orange-600" />
                  </div>
                  <h3 className="font-bold text-slate-800">Medical History</h3>
                </div>
                <Plus className="size-4 text-slate-400 cursor-pointer hover:text-blue-600" />
              </div>
              <div className="space-y-3">
                {user.conditions.map((condition, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl group hover:bg-white hover:border-slate-200 border border-transparent transition-all">
                    <div>
                      <p className="text-xs font-bold text-slate-700">{condition.name}</p>
                      <p className="text-[10px] text-slate-400">{condition.status}</p>
                    </div>
                    <ChevronRight className="size-3 text-slate-300 group-hover:text-slate-600" />
                  </div>
                ))}
              </div>
            </div>

            {/* NEW: Current Medications */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2rem] p-6 text-white shadow-xl">
              <div className="flex items-center gap-2 mb-4">
                <Pill className="size-5 text-blue-400" />
                <h3 className="font-bold text-sm">Active Medications</h3>
              </div>
              <ul className="space-y-3">
                {user.currentMeds.map((med, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs font-medium bg-white/10 p-3 rounded-xl border border-white/5">
                    <div className="size-1.5 bg-blue-400 rounded-full shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
                    {med}
                  </li>
                ))}
              </ul>
            </div>

          </aside>

          {/* RIGHT COLUMN: Records & Content */}
          <main className="lg:col-span-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h1 className="text-3xl font-black text-slate-800 tracking-tight">
                Medical <span className="text-blue-600">Vault</span>
              </h1>
              <button
                onClick={() => setShowUploadModal(true)}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl transition-all shadow-lg shadow-blue-200 font-bold"
              >
                <Upload className="size-5" /> Upload Document
              </button>
            </div>

            {/* Filters */}
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
              {types.map(type => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    selectedType === type
                      ? "bg-slate-900 text-white shadow-lg"
                      : "bg-white text-slate-500 border border-slate-200 hover:border-blue-400"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Grid for Documents */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredRecords.map(record => (
                <div key={record.id} className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="size-12 bg-slate-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                      <FileText className="size-6" />
                    </div>
                    <div className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${getTypeColor(record.type)}`}>
                      {record.type}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-1">{record.title}</h3>
                  <p className="text-xs text-slate-500 mb-6 leading-relaxed line-clamp-2">{record.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase">
                      <Calendar className="size-3" /> {record.date}
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 text-slate-300 hover:text-blue-600 transition-colors">
                        <Eye className="size-4" />
                      </button>
                      <button className="p-2 text-slate-300 hover:text-blue-600 transition-colors">
                        <Download className="size-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>

      {/* Basic Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-[2.5rem] p-8 max-w-md w-full shadow-2xl">
            <h2 className="text-2xl font-bold mb-6">Upload New Record</h2>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-slate-200 rounded-[2rem] p-12 text-center hover:border-blue-400 transition-colors cursor-pointer">
                <Upload className="size-10 text-slate-300 mx-auto mb-2" />
                <p className="text-sm font-bold text-slate-400">Drag file here</p>
              </div>
              <div className="flex gap-3 pt-4">
                <button onClick={() => setShowUploadModal(false)} className="flex-1 py-4 font-bold text-slate-400">Cancel</button>
                <button onClick={() => setShowUploadModal(false)} className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-bold">Upload</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}