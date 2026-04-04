import { useState } from "react";
import { 
  FileText, Upload, Download, Eye, Calendar, User, Trash2, Plus, 
  AlertCircle, Activity, Pill, History 
} from "lucide-react";

export function MedicalRecords() {
  const [records, setRecords] = useState([
    {
      id: 1,
      title: "Blood Test Results",
      type: "Lab Report",
      date: "March 15, 2026",
      doctor: "Dr. Sarah Johnson",
      description: "Complete blood count and lipid panel results",
      canEdit: false
    },
    {
      id: 2,
      title: "Hypertension Medication",
      type: "Prescription",
      date: "March 10, 2026",
      doctor: "Dr. Sarah Johnson",
      description: "Lisinopril 10mg daily",
      canEdit: false
    },
    {
      id: 3,
      title: "Annual Physical Examination",
      type: "Diagnosis",
      date: "February 28, 2026",
      doctor: "Dr. Robert Thompson",
      description: "General health checkup - all vitals normal",
      canEdit: true
    },
    {
      id: 4,
      title: "Chest X-Ray",
      type: "Scan",
      date: "January 20, 2026",
      doctor: "Dr. Michael Chen",
      description: "No abnormalities detected",
      canEdit: false
    }
  ]);
  
  const [selectedType, setSelectedType] = useState("All");
  const [showUploadModal, setShowUploadModal] = useState(false);
  
  // --- NEW HEALTH DATA ---
  const healthSummary = {
    allergies: ["Peanuts", "Penicillin", "Dust Mites"],
    pastDiseases: [
      { name: "Type 2 Diabetes", year: "Diagnosed 2021", status: "Active" },
      { name: "Asthma", year: "Since Childhood", status: "Management" },
      { name: "Covid-19", year: "Recovery 2022", status: "Recovered" }
    ],
    currentMeds: ["Lisinopril 10mg", "Metformin 500mg"]
  };

  const types = ["All", "Prescription", "Lab Report", "Diagnosis", "Scan"];
  
  const filteredRecords = selectedType === "All" 
    ? records 
    : records.filter(r => r.type === selectedType);
    
  const getTypeColor = (type) => {
    switch(type) {
      case "Prescription": return "bg-primary/10 text-primary";
      case "Lab Report": return "bg-accent/10 text-accent";
      case "Diagnosis": return "bg-secondary/10 text-secondary";
      case "Scan": return "bg-warning/10 text-warning";
      default: return "bg-muted text-muted-foreground";
    }
  };
  
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-linear-to-br from-primary/5 via-secondary/5 to-accent/5 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              Medical{" "}
              <span className="bg-linear-to-r from-primary to-cyan-600 bg-clip-text text-transparent">
                Records
              </span>
            </h1>
            <p className="text-muted-foreground">
              Manage and share your medical history securely
            </p>
          </div>
          <button
            onClick={() => setShowUploadModal(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl hover:bg-cyan-700 transition-colors font-medium"
          >
            <Upload className="size-5" />
            Upload Record
          </button>
        </div>

        {/* --- NEW: CLINICAL SUMMARY SECTION --- */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {/* Allergies Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-red-100 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-50 rounded-lg text-red-500">
                <AlertCircle className="size-5" />
              </div>
              <h3 className="font-bold">Critical Allergies</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {healthSummary.allergies.map(a => (
                <span key={a} className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs font-semibold border border-red-100">
                  {a}
                </span>
              ))}
            </div>
          </div>

          {/* Past History Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-primary/10 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/5 rounded-lg text-primary">
                <History className="size-5" />
              </div>
              <h3 className="font-bold">Medical History</h3>
            </div>
            <div className="space-y-3">
              {healthSummary.pastDiseases.map(d => (
                <div key={d.name} className="flex justify-between items-center text-sm border-b border-slate-50 pb-2 last:border-0">
                  <div>
                    <p className="font-semibold text-slate-800">{d.name}</p>
                    <p className="text-[10px] text-muted-foreground">{d.year}</p>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold uppercase ${d.status === 'Recovered' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                    {d.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Current Medications Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-50 rounded-lg text-blue-500">
                <Pill className="size-5" />
              </div>
              <h3 className="font-bold">Active Medications</h3>
            </div>
            <div className="space-y-2">
              {healthSummary.currentMeds.map(m => (
                <div key={m} className="flex items-center gap-2 text-sm text-slate-700 bg-blue-50/50 p-2 rounded-lg">
                  <div className="size-1.5 rounded-full bg-blue-400" />
                  {m}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Filter Tabs */}
        <div className="bg-white rounded-2xl shadow-lg border border-primary/10 p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {types.map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-lg transition-colors font-medium ${
                  selectedType === type
                    ? "bg-primary text-white"
                    : "bg-muted hover:bg-primary/10 text-foreground"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
        
        {/* Records Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredRecords.map(record => (
            <div
              key={record.id}
              className="bg-white rounded-2xl shadow-lg border border-primary/10 p-6 hover:shadow-xl transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3 flex-1">
                  <div className="size-12 bg-linear-to-br from-primary to-secondary rounded-xl flex items-center justify-center shrink-0">
                    <FileText className="size-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold mb-1">{record.title}</h3>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(record.type)}`}>
                      {record.type}
                    </span>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">
                {record.description}
              </p>
              
              <div className="space-y-2 mb-4 pb-4 border-b border-primary/10">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="size-4" />
                  {record.date}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="size-4" />
                  {record.doctor}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="flex-1 py-2 px-4 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                  <Eye className="size-4" />
                  View
                </button>
                <button className="flex-1 py-2 px-4 bg-muted hover:bg-primary/10 text-foreground rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-2">
                  <Download className="size-4" />
                  Download
                </button>
                {record.canEdit && (
                  <button className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors">
                    <Trash2 className="size-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Empty State */}
        {filteredRecords.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg border border-primary/10 p-12 text-center">
            <div className="size-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="size-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No records found</h3>
            <button
              onClick={() => setSelectedType("All")}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-cyan-700 transition-colors"
            >
              View All Records
            </button>
          </div>
        )}
      </div>
      
      {/* Upload Modal (Basic) */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold mb-4 text-slate-800">New Medical Entry</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Entry Name</label>
                <input type="text" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none" />
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowUploadModal(false)} className="flex-1 py-2 bg-slate-100 rounded-lg font-bold text-slate-600">Cancel</button>
                <button onClick={() => setShowUploadModal(false)} className="flex-1 py-2 bg-primary text-white rounded-lg font-bold">Add Entry</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}