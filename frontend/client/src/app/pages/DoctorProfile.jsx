import { useParams, Link } from "react-router";
import { MapPin, Star, Calendar, Clock, Award, GraduationCap, Briefcase, Phone, Mail, ArrowLeft, Heart } from "lucide-react";
import { useState } from "react";
import { ImageWithFallback } from "../ImageWithFallback";

const MOCK_DOCTOR_DETAILS = {
  1: {
    name: "Dr. Priya Sharma",
    photo: "https://images.unsplash.com/photo-1632054224477-c9cb3aae1b7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBkb2N0b3IlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzc1MTU0NzY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    specialization: "Cardiology",
    qualification: "MD, FACC",
    experience: 15,
    age: 42,
    gender: "Female",
    rating: 4.9,
    reviewCount: 234,
    clinic: "Apollo Hospitals",
    address: "Plot No. 13, Parsik Hill Road, Off Uran Road",
    city: "Mumbai",
    phone: "+91 98765 43210",
    email: "dr.sharma@apollohospitals.com",
    about: "Dr. Priya Sharma is a board-certified cardiologist with over 15 years of experience in treating cardiovascular diseases. She specializes in preventive cardiology, heart failure management, and cardiac imaging. Dr. Sharma is committed to providing personalized, compassionate care to each of her patients.",
    education: [
      "MD - AIIMS Delhi (2007)",
      "Residency in Internal Medicine - PGIMER Chandigarh (2010)",
      "Fellowship in Cardiology - CMC Vellore (2013)"
    ],
    specialties: [
      "Preventive Cardiology",
      "Heart Failure Management",
      "Cardiac Imaging",
      "Hypertension Treatment",
      "Cholesterol Management"
    ],
    availability: [
      { day: "Monday", time: "9:00 AM - 5:00 PM" },
      { day: "Tuesday", time: "9:00 AM - 5:00 PM" },
      { day: "Wednesday", time: "9:00 AM - 1:00 PM" },
      { day: "Thursday", time: "9:00 AM - 5:00 PM" },
      { day: "Friday", time: "9:00 AM - 3:00 PM" }
    ],
    reviews: [
      {
        author: "Rajesh Gupta",
        rating: 5,
        date: "2 weeks ago",
        comment: "Dr. Sharma is exceptional! She took the time to explain everything and made me feel comfortable throughout my treatment."
      },
      {
        author: "Meera Singh",
        rating: 5,
        date: "1 month ago",
        comment: "Highly recommend! Professional, knowledgeable, and truly cares about her patients."
      },
      {
        author: "Amit Kumar",
        rating: 4,
        date: "2 months ago",
        comment: "Great experience overall. Very thorough examination and clear explanations."
      }
    ]
  }
};

export function DoctorProfile() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  const [isSaved, setIsSaved] = useState(false);
  
  const doctor = MOCK_DOCTOR_DETAILS[id] || MOCK_DOCTOR_DETAILS[1];
  
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-linear-to-br from-primary/5 via-secondary/5 to-accent/5">
      {/* Header Banner */}
      <div className="bg-white border-b border-primary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            to="/doctors"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="size-4" />
            Back to Doctors
          </Link>
          
          <div className="grid md:grid-cols-[auto_1fr] gap-6 items-start">
            {/* Doctor Photo */}
            <div className="relative">
              <div className="size-32 md:size-40 rounded-2xl overflow-hidden border-4 border-white shadow-lg">
                <ImageWithFallback
                  src={doctor.photo}
                  alt={doctor.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 size-12 bg-linear-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
                <Star className="size-6 fill-white text-white" />
              </div>
            </div>
            
            {/* Doctor Info */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{doctor.name}</h1>
                  <p className="text-xl text-primary font-medium mb-2">{doctor.specialization}</p>
                  <p className="text-muted-foreground">{doctor.qualification}</p>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsSaved(!isSaved)}
                    className={`p-3 rounded-xl border transition-all ${
                      isSaved
                        ? "bg-red-50 border-red-200 text-red-600"
                        : "bg-white border-primary/10 text-muted-foreground hover:border-primary/30"
                    }`}
                  >
                    <Heart className={`size-5 ${isSaved ? "fill-current" : ""}`} />
                  </button>
                  <button className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-cyan-700 transition-colors font-medium">
                    Book Appointment
                  </button>
                </div>
              </div>
              
              <div className="grid sm:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Briefcase className="size-5 text-primary" />
                  <span className="text-muted-foreground">{doctor.experience} years experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="size-5 text-primary" />
                  <div className="flex items-center gap-1">
                    <Star className="size-4 fill-accent text-accent" />
                    <span className="font-semibold">{doctor.rating}</span>
                    <span className="text-muted-foreground">({doctor.reviewCount} reviews)</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="size-5 text-primary" />
                  <span className="text-muted-foreground">{doctor.city}</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="size-4 text-muted-foreground" />
                  <a href={`tel:${doctor.phone}`} className="text-primary hover:underline">
                    {doctor.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="size-4 text-muted-foreground" />
                  <a href={`mailto:${doctor.email}`} className="text-primary hover:underline">
                    {doctor.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="bg-white border-b border-primary/10 sticky top-16 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            {[
              { id: "overview", label: "Overview" },
              { id: "reviews", label: "Reviews" },
              { id: "availability", label: "Availability" }
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
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {activeTab === "overview" && (
              <>
                <div className="bg-white rounded-2xl shadow-lg border border-primary/10 p-6">
                  <h2 className="text-xl font-bold mb-4">About</h2>
                  <p className="text-muted-foreground leading-relaxed">{doctor.about}</p>
                </div>
                
                <div className="bg-white rounded-2xl shadow-lg border border-primary/10 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="size-10 bg-linear-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                      <GraduationCap className="size-5 text-white" />
                    </div>
                    <h2 className="text-xl font-bold">Education & Training</h2>
                  </div>
                  <ul className="space-y-3">
                    {doctor.education.map((edu, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="size-2 rounded-full bg-primary mt-2 shrink-0" />
                        <span className="text-muted-foreground">{edu}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-white rounded-2xl shadow-lg border border-primary/10 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="size-10 bg-linear-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                      <Award className="size-5 text-white" />
                    </div>
                    <h2 className="text-xl font-bold">Specialties</h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {doctor.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            )}
            
            {activeTab === "reviews" && (
              <div className="bg-white rounded-2xl shadow-lg border border-primary/10 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Patient Reviews</h2>
                  <div className="flex items-center gap-2">
                    <Star className="size-5 fill-accent text-accent" />
                    <span className="text-2xl font-bold">{doctor.rating}</span>
                    <span className="text-muted-foreground">({doctor.reviewCount} reviews)</span>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {doctor.reviews.map((review, index) => (
                    <div key={index} className="border-b border-primary/10 pb-6 last:border-0 last:pb-0">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-semibold">{review.author}</p>
                          <p className="text-sm text-muted-foreground">{review.date}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star key={i} className="size-4 fill-accent text-accent" />
                          ))}
                        </div>
                      </div>
                      <p className="text-muted-foreground">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === "availability" && (
              <div className="bg-white rounded-2xl shadow-lg border border-primary/10 p-6">
                <h2 className="text-xl font-bold mb-6">Available Hours</h2>
                <div className="space-y-4">
                  {doctor.availability.map((slot, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-muted/50 rounded-xl"
                    >
                      <div className="flex items-center gap-3">
                        <Calendar className="size-5 text-primary" />
                        <span className="font-medium">{slot.day}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="size-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{slot.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-accent/10 border border-accent/20 rounded-xl">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-accent">Note:</strong> Appointment slots are subject to availability. 
                    Please book in advance to secure your preferred time.
                  </p>
                </div>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Location Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-primary/10 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="size-10 bg-linear-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                  <MapPin className="size-5 text-white" />
                </div>
                <h3 className="font-bold">Location</h3>
              </div>
              <div className="space-y-2 mb-4">
                <p className="font-medium">{doctor.clinic}</p>
                <p className="text-sm text-muted-foreground">{doctor.address}</p>
                <p className="text-sm text-muted-foreground">{doctor.city}</p>
              </div>
              <button className="w-full py-2 bg-muted hover:bg-primary/10 text-primary rounded-lg transition-colors text-sm font-medium">
                View on Map
              </button>
            </div>
            
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg border border-primary/10 p-6">
              <h3 className="font-bold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full py-2 bg-primary text-white rounded-lg hover:bg-cyan-700 transition-colors font-medium">
                  Book Appointment
                </button>
                <button className="w-full py-2 bg-accent text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
                  Message Doctor
                </button>
                <button className="w-full py-2 bg-muted hover:bg-primary/10 text-primary rounded-lg transition-colors font-medium">
                  Share Profile
                </button>
              </div>
            </div>
            
            {/* Insurance Info */}
            <div className="bg-white rounded-2xl shadow-lg border border-primary/10 p-6">
              <h3 className="font-bold mb-4">Accepted Insurance</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• Blue Cross Blue Shield</p>
                <p>• Aetna</p>
                <p>• UnitedHealthcare</p>
                <p>• Cigna</p>
                <p>• Medicare</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}