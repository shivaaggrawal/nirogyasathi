import { useState } from "react";
import { Search, MapPin, Star, Filter, X, ChevronDown } from "lucide-react";
import { Link } from "react-router";
import { ImageWithFallback } from "../ImageWithFallback";

const MOCK_DOCTORS = [
  {
    id: 1,
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
    city: "Mumbai",
    availability: "Available Today"
  },
  {
    id: 2,
    name: "Dr. Rajesh Kumar",
    photo: "https://images.unsplash.com/photo-1632054226038-ed6997bfce1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMGRvY3RvciUyMGhlYWx0aGNhcmV8ZW58MXx8fHwxNzc1MTY2ODMxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    specialization: "Neurology",
    qualification: "MD, PhD",
    experience: 12,
    age: 39,
    gender: "Male",
    rating: 4.8,
    reviewCount: 189,
    clinic: "Max Healthcare",
    city: "Delhi",
    availability: "Available Tomorrow"
  },
  {
    id: 3,
    name: "Dr. Anjali Patel",
    photo: "https://images.unsplash.com/photo-1758691462119-792279713969?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMGRvY3RvciUyMHNwZWNpYWxpc3R8ZW58MXx8fHwxNzc1MjIyMjU5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    specialization: "Pediatrics",
    qualification: "MD, FAAP",
    experience: 8,
    age: 35,
    gender: "Female",
    rating: 4.9,
    reviewCount: 312,
    clinic: "Fortis Hospital",
    city: "Bangalore",
    availability: "Available Today"
  },
  {
    id: 4,
    name: "Dr. Vikram Singh",
    photo: "https://images.unsplash.com/photo-1758691463605-f4a3a92d6d37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwZG9jdG9yJTIwbWVkaWNhbHxlbnwxfHx8fDE3NzUyMjIyNTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    specialization: "Orthopedics",
    qualification: "MD, FAAOS",
    experience: 18,
    age: 48,
    gender: "Male",
    rating: 4.7,
    reviewCount: 156,
    clinic: "AIIMS",
    city: "Chennai",
    availability: "Available Next Week"
  },
];

const CITIES = ["All Cities", "Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", "Hyderabad"];
const SPECIALIZATIONS = ["All Specializations", "Cardiology", "Neurology", "Pediatrics", "Orthopedics", "Dermatology", "General Medicine"];
const GENDERS = ["All", "Male", "Female"];

export function DoctorRecommendation() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [selectedSpecialization, setSelectedSpecialization] = useState("All Specializations");
  const [selectedGender, setSelectedGender] = useState("All");
  const [minRating, setMinRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  
  const filteredDoctors = MOCK_DOCTORS.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = selectedCity === "All Cities" || doctor.city === selectedCity;
    const matchesSpecialization = selectedSpecialization === "All Specializations" || 
                                   doctor.specialization === selectedSpecialization;
    const matchesGender = selectedGender === "All" || doctor.gender === selectedGender;
    const matchesRating = doctor.rating >= minRating;
    
    return matchesSearch && matchesCity && matchesSpecialization && matchesGender && matchesRating;
  });
  
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-linear-to-br from-primary/5 via-secondary/5 to-accent/5 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Find Your{" "}
            <span className="bg-linear-to-r from-primary to-cyan-600 bg-clip-text text-transparent">
              Perfect Doctor
            </span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Browse our network of verified healthcare professionals
          </p>
        </div>
        
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl shadow-lg border border-primary/10 p-4 md:p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name or specialization..."
                className="w-full pl-12 pr-4 py-3 bg-input-background rounded-xl border border-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
            
            {/* Filter Toggle Button (Mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-xl hover:bg-cyan-700 transition-colors"
            >
              <Filter className="size-5" />
              Filters
            </button>
            
            {/* Quick Filters (Desktop) */}
            <div className="hidden md:flex items-center gap-3">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="px-4 py-3 bg-input-background rounded-xl border border-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              >
                {CITIES.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-3 bg-muted hover:bg-primary/10 rounded-xl transition-colors flex items-center gap-2"
              >
                <Filter className="size-5" />
                More Filters
              </button>
            </div>
          </div>
          
          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-primary/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm text-muted-foreground mb-2">City</label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full px-4 py-2 bg-input-background rounded-lg border border-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  {CITIES.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm text-muted-foreground mb-2">Specialization</label>
                <select
                  value={selectedSpecialization}
                  onChange={(e) => setSelectedSpecialization(e.target.value)}
                  className="w-full px-4 py-2 bg-input-background rounded-lg border border-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  {SPECIALIZATIONS.map(spec => (
                    <option key={spec} value={spec}>{spec}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm text-muted-foreground mb-2">Gender</label>
                <select
                  value={selectedGender}
                  onChange={(e) => setSelectedGender(e.target.value)}
                  className="w-full px-4 py-2 bg-input-background rounded-lg border border-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  {GENDERS.map(gender => (
                    <option key={gender} value={gender}>{gender}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm text-muted-foreground mb-2">
                  Minimum Rating: {minRating > 0 ? minRating.toFixed(1) : "Any"}
                </label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.5"
                  value={minRating}
                  onChange={(e) => setMinRating(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          )}
          
          {/* Active Filters Display */}
          {(selectedCity !== "All Cities" || selectedSpecialization !== "All Specializations" || selectedGender !== "All" || minRating > 0) && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {selectedCity !== "All Cities" && (
                <button
                  onClick={() => setSelectedCity("All Cities")}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                >
                  {selectedCity}
                  <X className="size-3" />
                </button>
              )}
              {selectedSpecialization !== "All Specializations" && (
                <button
                  onClick={() => setSelectedSpecialization("All Specializations")}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                >
                  {selectedSpecialization}
                  <X className="size-3" />
                </button>
              )}
              {selectedGender !== "All" && (
                <button
                  onClick={() => setSelectedGender("All")}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                >
                  {selectedGender}
                  <X className="size-3" />
                </button>
              )}
              {minRating > 0 && (
                <button
                  onClick={() => setMinRating(0)}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                >
                  Rating {minRating.toFixed(1)}+
                  <X className="size-3" />
                </button>
              )}
            </div>
          )}
        </div>
        
        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Found <span className="font-semibold text-foreground">{filteredDoctors.length}</span> doctors
          </p>
        </div>
        
        {/* Doctor Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map(doctor => (
            <Link
              key={doctor.id}
              to={`/doctors/${doctor.id}`}
              className="group bg-white rounded-2xl shadow-lg border border-primary/10 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <div className="relative h-48 overflow-hidden bg-linear-to-br from-primary/10 to-secondary/10">
                <ImageWithFallback
                  src={doctor.photo}
                  alt={doctor.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 px-3 py-1 bg-white rounded-full shadow-sm text-sm font-medium">
                  {doctor.availability}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {doctor.name}
                </h3>
                
                <div className="space-y-2 mb-4">
                  <p className="text-primary font-medium">{doctor.specialization}</p>
                  <p className="text-sm text-muted-foreground">{doctor.qualification}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{doctor.experience} years exp.</span>
                    <span>•</span>
                    <span>{doctor.gender}, {doctor.age}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="size-4 fill-accent text-accent" />
                    <span className="font-semibold">{doctor.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({doctor.reviewCount} reviews)
                  </span>
                </div>
                
                <div className="space-y-2 pt-4 border-t border-primary/10">
                  <div className="flex items-start gap-2 text-sm">
                    <MapPin className="size-4 text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">{doctor.clinic}</p>
                      <p className="text-muted-foreground">{doctor.city}</p>
                    </div>
                  </div>
                </div>
                
                <button className="w-full mt-4 py-2 bg-primary text-white rounded-lg hover:bg-cyan-700 transition-colors">
                  View Profile
                </button>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Empty State */}
        {filteredDoctors.length === 0 && (
          <div className="text-center py-16">
            <div className="size-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="size-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No doctors found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your filters or search criteria
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCity("All Cities");
                setSelectedSpecialization("All Specializations");
                setSelectedGender("All");
                setMinRating(0);
              }}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-cyan-700 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}