import React, { useState, useEffect } from 'react';
import {
  Star, MapPin, Clock, Home, Beaker, Filter, X, ChevronDown,
  Search, Phone
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LabFinding() {
  const navigate = useNavigate();
  const [labs, setLabs] = useState([]);
  const [filteredLabs, setFilteredLabs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [selectedTests, setSelectedTests] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 3500]);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [homeCollectionOnly, setHomeCollectionOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Available tests extracted from data
  const [availableTests, setAvailableTests] = useState([]);

  // Load labs data
  useEffect(() => {
    const loadLabs = async () => {
      try {
        const response = await fetch('/data/labs.json');
        const data = await response.json();
        setLabs(data);

        // Extract unique tests
        const tests = new Set();
        data.forEach(lab => {
          lab.tests_available.forEach(test => tests.add(test));
        });
        setAvailableTests(Array.from(tests).sort());
        setFilteredLabs(data);
        setLoading(false);
      } catch (error) {
        console.error('Error loading labs:', error);
        setLoading(false);
      }
    };

    loadLabs();
  }, []);

  // Apply filters
  useEffect(() => {
    let result = labs;

    // Filter by tests
    if (selectedTests.length > 0) {
      result = result.filter(lab =>
        selectedTests.some(test =>
          lab.tests_available.includes(test)
        )
      );
    }

    // Filter by price range
    result = result.filter(lab =>
      lab.price_min >= priceRange[0] && lab.price_max <= priceRange[1]
    );

    // Filter by rating
    if (ratingFilter > 0) {
      result = result.filter(lab => lab.rating >= ratingFilter);
    }

    // Filter by home collection
    if (homeCollectionOnly) {
      result = result.filter(lab => lab.home_collection === 'yes');
    }

    setFilteredLabs(result);
  }, [selectedTests, priceRange, ratingFilter, homeCollectionOnly, labs]);

  const handleTestChange = (test) => {
    setSelectedTests(prev =>
      prev.includes(test)
        ? prev.filter(t => t !== test)
        : [...prev, test]
    );
  };

  const clearFilters = () => {
    setSelectedTests([]);
    setPriceRange([0, 3500]);
    setRatingFilter(0);
    setHomeCollectionOnly(false);
  };

  const hasActiveFilters = selectedTests.length > 0 || ratingFilter > 0 || homeCollectionOnly || priceRange[0] > 0 || priceRange[1] < 3500;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50 pb-20">
      {/* Header */}
      <div className="bg-linear-to-r from-[#0092B8] to-[#007a99] text-white rounded-lg">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h1 className="text-4xl font-bold mb-2">Find Diagnostic Labs</h1>
          <p className="text-blue-100 text-lg">Search and compare labs based on tests, price, rating, and services</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Filter className="size-5 text-blue-600" />
                  Filters
                </h2>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Test Filter */}
              <div className="mb-8 pb-8 border-b border-slate-200">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Beaker className="size-4" />
                  Tests Available
                </h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {availableTests.map(test => (
                    <label key={test} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedTests.includes(test)}
                        onChange={() => handleTestChange(test)}
                        className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
                      />
                      <span className="text-sm text-slate-700 group-hover:text-slate-900 capitalize">
                        {test.replace(/-/g, ' ')}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-8 pb-8 border-b border-slate-200">
                <h3 className="font-bold text-slate-900 mb-4">Price Range (₹)</h3>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <input
                      type="number"
                      min="0"
                      max="3500"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Math.min(parseInt(e.target.value) || 0, priceRange[1]), priceRange[1]])}
                      className="w-1/2 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                      placeholder="Min"
                    />
                    <input
                      type="number"
                      min="0"
                      max="3500"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Math.max(parseInt(e.target.value) || 3500, priceRange[0])])}
                      className="w-1/2 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                      placeholder="Max"
                    />
                  </div>
                  <div className="text-xs text-slate-600">
                    ₹{priceRange[0]} - ₹{priceRange[1]}
                  </div>
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-8 pb-8 border-b border-slate-200">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Star className="size-4" />
                  Minimum Rating
                </h3>
                <div className="space-y-2">
                  {[0, 3, 3.5, 4, 4.5].map(rating => (
                    <label key={rating} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="rating"
                        checked={ratingFilter === rating}
                        onChange={() => setRatingFilter(rating)}
                        className="w-4 h-4 accent-blue-600 cursor-pointer"
                      />
                      <span className="text-sm text-slate-700 group-hover:text-slate-900">
                        {rating === 0 ? 'All ratings' : `${rating}+ stars`}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Home Collection Filter */}
              <div>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={homeCollectionOnly}
                    onChange={(e) => setHomeCollectionOnly(e.target.checked)}
                    className="w-5 h-5 accent-blue-600 rounded cursor-pointer"
                  />
                  <div className="flex items-center gap-2">
                    <Home className="size-4 text-blue-600" />
                    <span className="text-sm font-medium text-slate-900 group-hover:text-slate-700">
                      Home Collection Available
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden mt-4 w-full bg-blue-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700"
            >
              <Filter className="size-5" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                {filteredLabs.length} {filteredLabs.length === 1 ? 'Lab' : 'Labs'} Found
              </h2>
              {hasActiveFilters && (
                <p className="text-sm text-slate-600">
                  Showing results filtered by: {selectedTests.length > 0 && `tests, `}
                  {priceRange[0] > 0 || priceRange[1] < 3500 ? 'price, ' : ''}
                  {ratingFilter > 0 ? 'rating, ' : ''}
                  {homeCollectionOnly ? 'home collection' : ''}
                </p>
              )}
            </div>

            {/* Labs Grid */}
            {loading ? (
              <div className="flex items-center justify-center h-96">
                <div className="text-center">
                  <div className="animate-spin mb-4">
                    <Beaker className="size-12 text-blue-600 mx-auto" />
                  </div>
                  <p className="text-slate-600">Loading labs...</p>
                </div>
              </div>
            ) : filteredLabs.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <Beaker className="size-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">No labs found</h3>
                <p className="text-slate-600 mb-6">
                  Try adjusting your filters to find more labs
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredLabs.map(lab => (
                  <div
                    key={lab.lab_id}
                    className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden border border-slate-100 hover:border-blue-300 cursor-pointer group"
                    onClick={() => navigate(`/lab-profile/${lab.lab_id}`, { state: { lab } })}
                  >
                    {/* Lab Card Header */}
                    <div className="bg-linear-to-r from-blue-50 to-slate-50 p-6 border-b border-slate-100">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {lab.lab_name}
                        </h3>
                        {lab.home_collection === 'yes' && (
                          <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                            <Home className="size-3" />
                            Home
                          </div>
                        )}
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 bg-amber-100 px-3 py-1 rounded-lg">
                          <Star className="size-4 fill-amber-500 text-amber-500" />
                          <span className="font-bold text-amber-900">{lab.rating}</span>
                          <span className="text-xs text-amber-700">({lab.reviews_count})</span>
                        </div>
                      </div>
                    </div>

                    {/* Lab Details */}
                    <div className="p-6 space-y-4">
                      {/* Location */}
                      <div className="flex items-start gap-3">
                        <MapPin className="size-5 text-blue-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm text-slate-600">{lab.city}</p>
                        </div>
                      </div>

                      {/* Timing */}
                      <div className="flex items-center gap-3">
                        <Clock className="size-5 text-blue-600 flex-shrink-0" />
                        <p className="text-sm text-slate-700">
                          {lab.opening_time} - {lab.closing_time}
                        </p>
                      </div>

                      {/* Price Range */}
                      <div className="bg-blue-50 rounded-lg p-3">
                        <p className="text-xs text-blue-600 font-semibold mb-1">Price Range</p>
                        <p className="text-lg font-bold text-blue-900">
                          ₹{lab.price_min} - ₹{lab.price_max}
                        </p>
                      </div>

                      {/* Tests Available */}
                      <div>
                        <p className="text-xs font-bold text-slate-600 mb-2 flex items-center gap-1">
                          <Beaker className="size-4" />
                          Tests Available
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {lab.tests_available.slice(0, 3).map(test => (
                            <span
                              key={test}
                              className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs font-medium capitalize"
                            >
                              {test}
                            </span>
                          ))}
                          {lab.tests_available.length > 3 && (
                            <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs font-medium">
                              +{lab.tests_available.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Action Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/lab-profile/${lab.lab_id}`, { state: { lab } });
                        }}
                        className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <Phone className="size-4" />
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
