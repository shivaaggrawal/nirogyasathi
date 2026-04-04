import { useState } from "react";
import { FileText, Upload, Download, Eye, Calendar, User, Trash2, Plus } from "lucide-react";

export function MedicalRecords() {
  // eslint-disable-next-line no-unused-vars
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
              
              {!record.canEdit && (
                <p className="text-xs text-muted-foreground mt-3 flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-muted-foreground" />
                  Doctor-managed record
                </p>
              )}
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
            <p className="text-muted-foreground mb-6">
              No {selectedType !== "All" ? selectedType.toLowerCase() : ""} records in this category
            </p>
            <button
              onClick={() => setSelectedType("All")}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-cyan-700 transition-colors"
            >
              View All Records
            </button>
          </div>
        )}
        
        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-2xl shadow-lg border border-primary/10 p-6">
            <div className="size-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
              <FileText className="size-6 text-primary" />
            </div>
            <h3 className="font-bold mb-2">Secure Storage</h3>
            <p className="text-sm text-muted-foreground">
              Your medical records are encrypted and stored securely with industry-leading security standards.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg border border-primary/10 p-6">
            <div className="size-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
              <User className="size-6 text-accent" />
            </div>
            <h3 className="font-bold mb-2">Doctor Access</h3>
            <p className="text-sm text-muted-foreground">
              Share your records with healthcare providers securely. Control who can view and edit your information.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg border border-primary/10 p-6">
            <div className="size-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-4">
              <Download className="size-6 text-secondary" />
            </div>
            <h3 className="font-bold mb-2">Easy Export</h3>
            <p className="text-sm text-muted-foreground">
              Download your records anytime in standard formats for easy sharing with any healthcare provider.
            </p>
          </div>
        </div>
      </div>
      
      {/* Upload Modal (Simple version) */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold mb-4">Upload Medical Record</h2>
            <div className="space-y-4">
              <div>
                <label className="block mb-2">Record Title</label>
                <input
                  type="text"
                  placeholder="Enter record title"
                  className="w-full px-4 py-3 bg-input-background rounded-xl border border-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="block mb-2">Type</label>
                <select className="w-full px-4 py-3 bg-input-background rounded-xl border border-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20">
                  <option>Prescription</option>
                  <option>Lab Report</option>
                  <option>Diagnosis</option>
                  <option>Scan</option>
                </select>
              </div>
              <div>
                <label className="block mb-2">File</label>
                <div className="border-2 border-dashed border-primary/20 rounded-xl p-8 text-center hover:border-primary/40 transition-colors cursor-pointer">
                  <Upload className="size-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    PDF, JPG, PNG up to 10MB
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 py-3 bg-muted hover:bg-primary/10 text-foreground rounded-xl transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 py-3 bg-primary text-white rounded-xl hover:bg-cyan-700 transition-colors font-medium"
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}