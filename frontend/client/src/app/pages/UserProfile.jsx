import { User, Mail, Phone, MapPin, Calendar, FileText, Heart, Clock, Edit } from "lucide-react";
import { useState } from "react";

export function UserProfile() {
  const [activeTab, setActiveTab] = useState("overview");
  
  // Mock user data
  const user = {
    name: "John Anderson",
    email: "john.anderson@email.com",
    phone: "+1 (555) 987-6543",
    dateOfBirth: "January 15, 1985",
    gender: "Male",
    bloodType: "O+",
    address: "456 Health St, Apt 12B, New York, NY 10001",
    emergencyContact: "+1 (555) 123-7890"
  };
  
  const appointments = [
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      specialization: "Cardiology",
      date: "April 15, 2026",
      time: "10:00 AM",
      status: "Upcoming"
    },
    {
      id: 2,
      doctor: "Dr. Michael Chen",
      specialization: "Neurology",
      date: "March 28, 2026",
      time: "2:30 PM",
      status: "Completed"
    }
  ];
  
  const savedDoctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialization: "Cardiology",
      rating: 4.9
    },
    {
      id: 2,
      name: "Dr. Emily Rodriguez",
      specialization: "Pediatrics",
      rating: 4.9
    }
  ];
  
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg border border-primary/10 p-6 md:p-8 mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="size-24 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center text-white">
              <User className="size-12" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Mail className="size-4" />
                  {user.email}
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="size-4" />
                  {user.phone}
                </div>
              </div>
            </div>
            <button className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-cyan-700 transition-colors flex items-center gap-2">
              <Edit className="size-4" />
              Edit Profile
            </button>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="bg-white rounded-t-2xl shadow-lg border border-primary/10 border-b-0">
          <div className="px-6 flex gap-8 border-b border-primary/10">
            {[
              { id: "overview", label: "Overview" },
              { id: "appointments", label: "Appointments" },
              { id: "savedDoctors", label: "Saved Doctors" }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-primary text-primary font-medium"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Content */}
        <div className="bg-white rounded-b-2xl shadow-lg border border-primary/10 p-6 md:p-8">
          {activeTab === "overview" && (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-bold text-lg mb-4">Personal Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <Calendar className="size-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Date of Birth</p>
                      <p className="font-medium">{user.dateOfBirth}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <User className="size-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Gender</p>
                      <p className="font-medium">{user.gender}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <FileText className="size-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Blood Type</p>
                      <p className="font-medium">{user.bloodType}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <MapPin className="size-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Address</p>
                      <p className="font-medium">{user.address}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-bold text-lg mb-4">Health Summary</h3>
                <div className="space-y-3">
                  <div className="p-4 bg-accent/10 border border-accent/20 rounded-xl">
                    <p className="text-sm text-muted-foreground mb-1">Emergency Contact</p>
                    <p className="font-medium">{user.emergencyContact}</p>
                  </div>
                  <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl">
                    <p className="text-sm text-muted-foreground mb-1">Upcoming Appointments</p>
                    <p className="text-2xl font-bold text-primary">{appointments.filter(a => a.status === "Upcoming").length}</p>
                  </div>
                  <div className="p-4 bg-secondary/10 border border-secondary/20 rounded-xl">
                    <p className="text-sm text-muted-foreground mb-1">Saved Doctors</p>
                    <p className="text-2xl font-bold text-secondary">{savedDoctors.length}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === "appointments" && (
            <div>
              <h3 className="font-bold text-lg mb-6">My Appointments</h3>
              <div className="space-y-4">
                {appointments.map(appointment => (
                  <div
                    key={appointment.id}
                    className="p-4 border border-primary/10 rounded-xl hover:border-primary/30 transition-all"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{appointment.doctor}</h4>
                        <p className="text-sm text-primary mb-2">{appointment.specialization}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="size-4" />
                            {appointment.date}
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="size-4" />
                            {appointment.time}
                          </div>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        appointment.status === "Upcoming"
                          ? "bg-accent/10 text-accent"
                          : "bg-muted text-muted-foreground"
                      }`}>
                        {appointment.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === "savedDoctors" && (
            <div>
              <h3 className="font-bold text-lg mb-6">Saved Doctors</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {savedDoctors.map(doctor => (
                  <div
                    key={doctor.id}
                    className="p-4 border border-primary/10 rounded-xl hover:border-primary/30 transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold mb-1">{doctor.name}</h4>
                        <p className="text-sm text-primary">{doctor.specialization}</p>
                      </div>
                      <button className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors">
                        <Heart className="size-5 fill-current" />
                      </button>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1 text-sm">
                        <FileText className="size-4 text-accent fill-accent" />
                        <span className="font-medium">{doctor.rating}</span>
                      </div>
                    </div>
                    <button className="w-full py-2 bg-primary text-white rounded-lg hover:bg-cyan-700 transition-colors text-sm font-medium">
                      View Profile
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}