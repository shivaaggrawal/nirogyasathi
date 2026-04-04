import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpDown,
  BadgeCheck,
  Clock3,
  Loader2,
  MapPin,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Star,
} from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api";

const defaultFilters = {
  minPrice: "",
  maxPrice: "",
  minRating: "",
  homeCollection: "any",
  openNow: false,
  sortBy: "highest_rating",
};

const filterLabels = [
  "blood test",
  "MRI",
  "xray",
  "cbc",
  "thyroid profile",
];

function renderStars(rating) {
  const filledStars = Math.round(rating);
  return Array.from({ length: 5 }, (_, index) => (
    <Star
      key={index}
      className={`size-4 ${index < filledStars ? "fill-amber-400 text-amber-400" : "text-slate-300"}`}
    />
  ));
}

function formatCurrency(value) {
  if (value === null || value === undefined || value === "") {
    return "N/A";
  }
  return `₹${Number(value).toLocaleString("en-IN")}`;
}

function LabSkeleton() {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50">
      <div className="h-5 w-28 rounded-full bg-slate-200 animate-pulse" />
      <div className="mt-4 h-8 w-3/4 rounded-2xl bg-slate-200 animate-pulse" />
      <div className="mt-3 h-4 w-1/2 rounded-full bg-slate-200 animate-pulse" />
      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="h-24 rounded-2xl bg-slate-200 animate-pulse" />
        <div className="h-24 rounded-2xl bg-slate-200 animate-pulse" />
      </div>
      <div className="mt-4 h-4 w-full rounded-full bg-slate-200 animate-pulse" />
      <div className="mt-3 h-4 w-2/3 rounded-full bg-slate-200 animate-pulse" />
    </div>
  );
}

export function LabRecommendations() {
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState(defaultFilters);
  const [labs, setLabs] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setQuery(searchInput.trim());
    }, 350);

    return () => clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    const controller = new AbortController();

    async function loadLabs() {
      setLoading(true);
      setError("");

      try {
        const params = new URLSearchParams();

        if (query) {
          params.set("search", query);
        }
        if (filters.minPrice) {
          params.set("min_price", filters.minPrice);
        }
        if (filters.maxPrice) {
          params.set("max_price", filters.maxPrice);
        }
        if (filters.minRating) {
          params.set("min_rating", filters.minRating);
        }
        if (filters.homeCollection !== "any") {
          params.set("home_collection", filters.homeCollection);
        }
        if (filters.openNow) {
          params.set("open_now", "true");
        }
        if (filters.sortBy) {
          params.set("sort_by", filters.sortBy);
        }

        const response = await fetch(`${API_BASE_URL}/labs?${params.toString()}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Unable to load lab recommendations");
        }

        const data = await response.json();
        setLabs(data.results ?? []);
        setCount(data.count ?? 0);
      } catch (requestError) {
        if (requestError.name !== "AbortError") {
          setError("Unable to load labs right now. Please retry.");
          setLabs([]);
          setCount(0);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadLabs();

    return () => controller.abort();
  }, [query, filters]);

  function handleSubmit(event) {
    event.preventDefault();
    setQuery(searchInput.trim());
  }

  function handleReset() {
    setSearchInput("");
    setQuery("");
    setFilters(defaultFilters);
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#F6FAFD]">
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-cyan-950 via-slate-950 to-blue-900 text-white">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -left-24 top-0 size-72 rounded-full bg-cyan-500/30 blur-3xl" />
          <div className="absolute right-0 top-24 size-80 rounded-full bg-blue-500/30 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-cyan-100 backdrop-blur">
              <Sparkles className="size-4" />
              Lab recommendations powered by live filters
            </div>
            <h1 className="text-4xl font-black leading-tight tracking-tight md:text-6xl">
              Find diagnostic labs that match the exact test you need.
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-slate-200 md:text-lg">
              Search by test name, refine by price, rating, home collection, and open-now status, then compare cards side by side.
            </p>
            <div className="flex flex-wrap gap-3 text-sm text-slate-100/90">
              {filterLabels.map((label) => (
                <span key={label} className="rounded-full border border-white/10 bg-white/10 px-4 py-2 backdrop-blur">
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <motion.form
          onSubmit={handleSubmit}
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="sticky top-20 z-30 rounded-[2rem] border border-slate-200 bg-white/90 p-4 shadow-xl shadow-slate-200/60 backdrop-blur-xl lg:p-6"
        >
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.24em] text-cyan-700">
            <SlidersHorizontal className="size-4" />
            Search and filters
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-[1.4fr_0.7fr_0.7fr]">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Search tests</span>
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <Search className="size-5 text-slate-400" />
                <input
                  value={searchInput}
                  onChange={(event) => setSearchInput(event.target.value)}
                  placeholder='Try “blood test”, “MRI”, or “xray”'
                  className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Min price</span>
              <input
                type="number"
                min="0"
                value={filters.minPrice}
                onChange={(event) => setFilters((current) => ({ ...current, minPrice: event.target.value }))}
                placeholder="0"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Max price</span>
              <input
                type="number"
                min="0"
                value={filters.maxPrice}
                onChange={(event) => setFilters((current) => ({ ...current, maxPrice: event.target.value }))}
                placeholder="5000"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500"
              />
            </label>
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-4">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Minimum rating</span>
              <select
                value={filters.minRating}
                onChange={(event) => setFilters((current) => ({ ...current, minRating: event.target.value }))}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500"
              >
                <option value="">Any rating</option>
                <option value="4.5">4.5+</option>
                <option value="4">4.0+</option>
                <option value="3.5">3.5+</option>
                <option value="3">3.0+</option>
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Home collection</span>
              <select
                value={filters.homeCollection}
                onChange={(event) => setFilters((current) => ({ ...current, homeCollection: event.target.value }))}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500"
              >
                <option value="any">Any</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </label>

            <label className="flex items-end gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <input
                type="checkbox"
                checked={filters.openNow}
                onChange={(event) => setFilters((current) => ({ ...current, openNow: event.target.checked }))}
                className="size-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500"
              />
              <span className="text-sm font-semibold text-slate-700">Open now only</span>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Sort by</span>
              <select
                value={filters.sortBy}
                onChange={(event) => setFilters((current) => ({ ...current, sortBy: event.target.value }))}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500"
              >
                <option value="highest_rating">Highest rating</option>
                <option value="lowest_price">Lowest price</option>
              </select>
            </label>
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-3 text-sm text-slate-500">
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 font-medium text-slate-700">
                <ArrowUpDown className="size-4" />
                {query ? `Searching for “${query}”` : "Showing all labs"}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-cyan-50 px-4 py-2 font-medium text-cyan-700">
                <BadgeCheck className="size-4" />
                {count} labs found
              </span>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
              >
                <Search className="size-4" />
                Search Labs
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              >
                Reset
              </button>
            </div>
          </div>
        </motion.form>

        <div className="mt-8">
          {loading ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <LabSkeleton key={index} />
              ))}
            </div>
          ) : error ? (
            <div className="rounded-[2rem] border border-rose-200 bg-rose-50 p-8 text-center text-rose-700">
              <p className="text-xl font-bold">Something went wrong</p>
              <p className="mt-2 text-sm text-rose-600">{error}</p>
            </div>
          ) : labs.length === 0 ? (
            <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm shadow-slate-200/40">
              <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-cyan-50 text-cyan-700">
                <Search className="size-8" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">No labs found</h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-600">
                Try a broader test name, lower the minimum rating, or remove one of the active filters.
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="mt-6 rounded-2xl bg-cyan-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-cyan-500"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {labs.map((lab, index) => (
                <motion.article
                  key={lab.lab_id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(index * 0.04, 0.2) }}
                  className={`group overflow-hidden rounded-[2rem] border bg-white p-6 shadow-lg shadow-slate-200/40 transition hover:-translate-y-1 hover:shadow-cyan-100 ${
                    lab.top_rated ? "border-cyan-200 ring-1 ring-cyan-100" : "border-slate-200"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        {lab.top_rated && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">
                            <Sparkles className="size-3.5" />
                            Top Rated
                          </span>
                        )}
                        {lab.home_collection && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-cyan-50 px-3 py-1 text-xs font-bold text-cyan-700">
                            <ShieldCheck className="size-3.5" />
                            Home collection
                          </span>
                        )}
                      </div>
                      <h2 className="mt-4 text-2xl font-black tracking-tight text-slate-950">{lab.lab_name}</h2>
                      <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                        <MapPin className="size-4" />
                        {lab.city}
                        <span className="text-slate-300">•</span>
                        <span>{lab.distance_km} km away</span>
                      </div>
                    </div>

                    <div className="rounded-2xl bg-slate-50 px-4 py-3 text-right">
                      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Rating</div>
                      <div className="mt-1 text-2xl font-black text-slate-900">{lab.rating}</div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <div className="flex items-center gap-0.5">{renderStars(lab.rating)}</div>
                    <span className="text-sm font-medium text-slate-500">({lab.reviews_count.toLocaleString()} reviews)</span>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Price range</p>
                      <p className="mt-2 text-lg font-bold text-slate-950">{formatCurrency(lab.min_price)} - {formatCurrency(lab.max_price)}</p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Hours</p>
                      <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-slate-800">
                        <Clock3 className="size-4 text-cyan-600" />
                        {lab.opening_time} - {lab.closing_time}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Available tests</div>
                    <div className="flex flex-wrap gap-2">
                      {lab.tests_available.slice(0, 5).map((test) => (
                        <span
                          key={test}
                          className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700"
                        >
                          {test}
                        </span>
                      ))}
                      {lab.tests_available.length > 5 && (
                        <span className="rounded-full bg-cyan-50 px-3 py-1.5 text-xs font-semibold text-cyan-700">
                          +{lab.tests_available.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
