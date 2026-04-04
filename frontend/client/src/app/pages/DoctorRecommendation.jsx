import { useEffect, useMemo, useState } from "react";
import { Building2, Clock, Filter, MapPin, Search, Star, X } from "lucide-react";
import { Link } from "react-router";

const DOCTOR_DATA_URL = "/data/gwalior_doctors_dataset.csv";
const ALL_CITIES = "All Cities";
const ALL_SPECIALIZATIONS = "All Specializations";

const CITIES = [ALL_CITIES, "Kampoo", "Lashkar", "City Center", "Morar", "Thatipur", "Gandhi Road"];
const SPECIALIZATIONS = [
  ALL_SPECIALIZATIONS,
  "Cardiologist",
  "Urologist",
  "General Physician",
  "Neurologist",
  "Gynecologist",
  "Orthopedic",
  "Dermatologist",
  "Pediatrician",
];

function parseDoctorCsv(csvText) {
  const lines = csvText.trim().split(/\r?\n/);

  if (lines.length <= 1) {
    return [];
  }

  const headers = lines.shift().split(",").map((header) => header.trim());

  return lines.map((line, index) => {
    const values = line.split(",").map((value) => value.trim());
    const record = {};

    headers.forEach((header, headerIndex) => {
      record[header] = values[headerIndex] ?? "";
    });

    return {
      id: index + 1,
      name: record["Doctor Name"] || `Doctor ${index + 1}`,
      specialization: record["Specialization"] || "General Physician",
      experience: Number(record["Experience (Years)"] || 0),
      rating: Number(record["Rating"] || 0),
      reviewCount: Number(record["Reviews"] || 0),
      fees: Number(record["Fees (₹)"] || 0),
      location: record["Location"] || "",
      availability: record["Availability"] || "",
      hospitalName: record["Hospital Name"] || "",
    };
  });
}

function getInitials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function formatCurrency(value) {
  return `Rs. ${value.toLocaleString("en-IN")}`;
}

export function DoctorRecommendation() {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState(ALL_CITIES);
  const [selectedSpecialization, setSelectedSpecialization] = useState(ALL_SPECIALIZATIONS);
  const [minFee, setMinFee] = useState(0);
  const [maxFee, setMaxFee] = useState(1200);
  const [feeLimit, setFeeLimit] = useState(1200);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        const response = await fetch(DOCTOR_DATA_URL);

        if (!response.ok) {
          throw new Error("Failed to load doctor dataset");
        }

        const csvText = await response.text();
        const parsedDoctors = parseDoctorCsv(csvText);
        const highestFee = parsedDoctors.reduce((currentMax, doctor) => Math.max(currentMax, doctor.fees), 0);

        setDoctors(parsedDoctors);
        setFeeLimit(highestFee);
        setMinFee(0);
        setMaxFee(highestFee || 1200);
      } catch (loadError) {
        console.error("Error loading doctors:", loadError);
        setError("Unable to load doctor listings right now.");
      } finally {
        setLoading(false);
      }
    };

    loadDoctors();
  }, []);

  const filteredDoctors = useMemo(() => {
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();

    return doctors.filter((doctor) => {
      const searchableText = [doctor.name, doctor.specialization, doctor.location, doctor.hospitalName]
        .join(" ")
        .toLowerCase();

      const matchesSearch = normalizedSearchTerm === "" || searchableText.includes(normalizedSearchTerm);
      const matchesCity = selectedCity === ALL_CITIES || doctor.location === selectedCity;
      const matchesSpecialization =
        selectedSpecialization === ALL_SPECIALIZATIONS || doctor.specialization === selectedSpecialization;
      const matchesFee = doctor.fees >= minFee && doctor.fees <= maxFee;

      return matchesSearch && matchesCity && matchesSpecialization && matchesFee;
    });
  }, [doctors, searchTerm, selectedCity, selectedSpecialization, minFee, maxFee]);

  const hasActiveFilters =
    selectedCity !== ALL_CITIES ||
    selectedSpecialization !== ALL_SPECIALIZATIONS ||
    minFee > 0 ||
    maxFee < feeLimit;

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCity(ALL_CITIES);
    setSelectedSpecialization(ALL_SPECIALIZATIONS);
    setMinFee(0);
    setMaxFee(feeLimit);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-linear-to-br from-primary/5 via-secondary/5 to-accent/5 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Find Your <span className="bg-linear-to-r from-primary to-cyan-600 bg-clip-text text-transparent">Perfect Doctor</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Browse verified doctors in Gwalior by city, specialization, and consultation fee
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-primary/10 p-4 md:p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by doctor name, hospital, or location..."
                className="w-full pl-12 pr-4 py-3 bg-input-background rounded-xl border border-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-xl hover:bg-cyan-700 transition-colors"
            >
              <Filter className="size-5" />
              Filters
            </button>

            <div className="hidden md:flex items-center gap-3">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="px-4 py-3 bg-input-background rounded-xl border border-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              >
                {CITIES.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>

              <select
                value={selectedSpecialization}
                onChange={(e) => setSelectedSpecialization(e.target.value)}
                className="px-4 py-3 bg-input-background rounded-xl border border-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              >
                {SPECIALIZATIONS.map((specialization) => (
                  <option key={specialization} value={specialization}>
                    {specialization}
                  </option>
                ))}
              </select>

              <div className="flex items-center gap-2 rounded-xl border border-primary/10 bg-input-background px-4 py-3">
                <span className="text-sm font-medium text-muted-foreground">Rs.</span>
                <input
                  type="number"
                  min="0"
                  max={feeLimit}
                  value={minFee}
                  onChange={(e) => {
                    const nextValue = Math.min(Number(e.target.value) || 0, maxFee);
                    setMinFee(nextValue);
                  }}
                  className="w-20 bg-transparent focus:outline-none"
                  placeholder="Min"
                />
                <span className="text-muted-foreground">-</span>
                <input
                  type="number"
                  min="0"
                  max={feeLimit}
                  value={maxFee}
                  onChange={(e) => {
                    const nextValue = Math.max(Number(e.target.value) || feeLimit, minFee);
                    setMaxFee(nextValue > feeLimit ? feeLimit : nextValue);
                  }}
                  className="w-20 bg-transparent focus:outline-none"
                  placeholder="Max"
                />
              </div>
            </div>
          </div>

          {showFilters && (
            <div className="mt-6 pt-6 border-t border-primary/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:hidden">
              <div>
                <label className="block text-sm text-muted-foreground mb-2">City</label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full px-4 py-2 bg-input-background rounded-lg border border-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  {CITIES.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
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
                  {SPECIALIZATIONS.map((specialization) => (
                    <option key={specialization} value={specialization}>
                      {specialization}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-muted-foreground mb-2">Minimum Fee (Rs.)</label>
                <input
                  type="number"
                  min="0"
                  max={feeLimit}
                  value={minFee}
                  onChange={(e) => {
                    const nextValue = Math.min(Number(e.target.value) || 0, maxFee);
                    setMinFee(nextValue);
                  }}
                  className="w-full px-4 py-2 bg-input-background rounded-lg border border-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="block text-sm text-muted-foreground mb-2">Maximum Fee (Rs.)</label>
                <input
                  type="number"
                  min="0"
                  max={feeLimit}
                  value={maxFee}
                  onChange={(e) => {
                    const nextValue = Math.max(Number(e.target.value) || feeLimit, minFee);
                    setMaxFee(nextValue > feeLimit ? feeLimit : nextValue);
                  }}
                  className="w-full px-4 py-2 bg-input-background rounded-lg border border-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
          )}

          {hasActiveFilters && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted-foreground">Active filters:</span>

              {selectedCity !== ALL_CITIES && (
                <button
                  onClick={() => setSelectedCity(ALL_CITIES)}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                >
                  {selectedCity}
                  <X className="size-3" />
                </button>
              )}

              {selectedSpecialization !== ALL_SPECIALIZATIONS && (
                <button
                  onClick={() => setSelectedSpecialization(ALL_SPECIALIZATIONS)}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                >
                  {selectedSpecialization}
                  <X className="size-3" />
                </button>
              )}

              {(minFee > 0 || maxFee < feeLimit) && (
                <button
                  onClick={() => {
                    setMinFee(0);
                    setMaxFee(feeLimit);
                  }}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                >
                  Fee {formatCurrency(minFee)} - {formatCurrency(maxFee)}
                  <X className="size-3" />
                </button>
              )}

              <button onClick={clearFilters} className="text-sm font-medium text-primary hover:underline">
                Clear all
              </button>
            </div>
          )}
        </div>

        <div className="mb-6">
          <p className="text-muted-foreground">
            Found <span className="font-semibold text-foreground">{filteredDoctors.length}</span> doctors
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="mx-auto mb-4 size-14 animate-pulse rounded-full bg-primary/10 flex items-center justify-center">
                <Search className="size-7 text-primary" />
              </div>
              <p className="text-muted-foreground">Loading doctor listings...</p>
            </div>
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center text-red-700">
            <p className="font-semibold">{error}</p>
            <p className="mt-2 text-sm text-red-600">Refresh the page to try again.</p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDoctors.map((doctor) => (
                <Link
                  key={doctor.id}
                  to={`/doctors/${doctor.id}`}
                  state={{ doctor }}
                  className="group bg-white rounded-2xl shadow-lg border border-primary/10 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all"
                >
                  <div className="relative bg-linear-to-br from-primary/10 via-secondary/10 to-accent/10 p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="size-16 rounded-2xl bg-white/90 shadow-sm flex items-center justify-center text-xl font-bold text-primary">
                        {getInitials(doctor.name)}
                      </div>
                      <div className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-semibold text-emerald-600 shadow-sm">
                        <Clock className="size-3" />
                        {doctor.availability}
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">{doctor.name}</h3>
                    <p className="text-primary font-medium mb-1">{doctor.specialization}</p>
                    <p className="text-sm text-muted-foreground mb-4">{doctor.hospitalName}</p>

                    <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                      <div className="rounded-xl bg-slate-50 p-3">
                        <p className="text-xs text-muted-foreground mb-1">Experience</p>
                        <p className="font-semibold">{doctor.experience} years</p>
                      </div>
                      <div className="rounded-xl bg-slate-50 p-3">
                        <p className="text-xs text-muted-foreground mb-1">Fees</p>
                        <p className="font-semibold">{formatCurrency(doctor.fees)}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <Star className="size-4 fill-accent text-accent" />
                      <span className="font-semibold">{doctor.rating.toFixed(1)}</span>
                      <span className="text-sm text-muted-foreground">({doctor.reviewCount} reviews)</span>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-primary/10">
                      <div className="flex items-start gap-2 text-sm">
                        <MapPin className="size-4 text-muted-foreground shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">{doctor.location}</p>
                          <p className="text-muted-foreground">City</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2 text-sm">
                        <Building2 className="size-4 text-muted-foreground shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">{doctor.hospitalName}</p>
                          <p className="text-muted-foreground">{doctor.specialization}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-primary px-4 py-3 text-white transition-colors group-hover:bg-cyan-700">
                      View Profile
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {filteredDoctors.length === 0 && (
              <div className="text-center py-16">
                <div className="size-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="size-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No doctors found</h3>
                <p className="text-muted-foreground mb-6">Try adjusting your city, fee, or specialization filters</p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-cyan-700 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
