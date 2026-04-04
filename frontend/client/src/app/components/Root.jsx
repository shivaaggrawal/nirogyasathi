import { Outlet, Link, useLocation } from "react-router";
import { Activity, User, FileText, Menu, X, ArrowRight, ShieldCheck, HeartPulse } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Root() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll effect for header transparency
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  // Nav links including Home
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Symptom Checker", path: "/symptoms" },
    { name: "Find Doctors", path: "/doctors" },
    { name: "Records", path: "/records" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#edf4f8ce]">
      {/* --- HEADER (UI Unchanged) --- */}
      <header 
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled 
            ? "bg-white/70 backdrop-blur-xl border-b border-slate-200 py-2 shadow-sm" 
            : "bg-transparent py-4"
        }`}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div 
                whileHover={{ rotate: 15 }}
                className="bg-gradient-to-tr from-cyan-600 to-blue-600 p-2.5 rounded-2xl shadow-lg shadow-cyan-200"
              >
                <HeartPulse className="size-6 text-white" />
              </motion.div>
              <span className="text-2xl font-black tracking-tighter text-slate-900">
                Nirogya<span className="text-cyan-600">Sathi</span>
              </span>
            </Link>

            {/* Desktop Navigation with Home */}
            <div className="hidden md:flex items-center bg-slate-100/50 border border-slate-200 p-1 rounded-2xl">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                    isActive(link.path)
                      ? "text-white"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {isActive(link.path) && (
                    <motion.div 
                      layoutId="activeTab"
                      className="absolute inset-0 bg-slate-900 rounded-xl -z-10 shadow-lg shadow-slate-300"
                    />
                  )}
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="hidden md:flex items-center gap-4">
              <Link to="/login" className="text-sm font-bold text-slate-600 hover:text-slate-900">Sign In</Link>
              <Link
                to="/signup"
                className="flex items-center gap-2 bg-slate-900 text-white px-6 py-2.5 rounded-2xl text-sm font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-95"
              >
                Join Now <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/profile"
                className={`p-2.5 rounded-2xl border transition-all ${
                  isActive("/profile")
                    ? "bg-cyan-50 border-cyan-200 text-cyan-600"
                    : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                }`}
              >
                <User className="size-5" />
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-900"
            >
              {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-slate-200 overflow-hidden"
            >
              <div className="container mx-auto px-6 py-8 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-xl font-bold ${isActive(link.path) ? "text-cyan-600" : "text-slate-900"}`}
                  >
                    {link.name}
                  </Link>
                ))}
                <hr className="border-slate-100 my-2" />
                <div className="flex flex-col gap-4">
                  <Link to="/login" className="text-lg font-bold text-slate-500">Login</Link>
                  <Link to="/signup" className="bg-slate-900 text-white text-center py-4 rounded-2xl font-bold">Sign Up Free</Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* --- CONTENT --- */}
      <main className="flex-1 relative">
        <Outlet />
      </main>

      {/* --- FOOTER (UI Unchanged) --- */}
      <footer className="bg-slate-950 text-slate-400 pt-20 pb-10">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
            <div className="md:col-span-4 space-y-6 text-left">
              <div className="flex items-center gap-3">
                <div className="bg-cyan-500/20 p-2 rounded-xl border border-cyan-500/30">
                  <HeartPulse className="size-6 text-cyan-400" />
                </div>
                <span className="text-2xl font-black text-white uppercase tracking-tighter">NirogyaSathi</span>
              </div>
              <p className="text-slate-400 leading-relaxed max-w-sm">
                Revolutionizing personal healthcare through AI-driven insights and world-class medical expertise.
              </p>
            </div>
            {/* Keeping footer grid clean as requested */}
            <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
                <div className="space-y-4 text-left">
                  <h4 className="text-white font-bold">Platform</h4>
                  <ul className="space-y-2 text-sm">
                    <li><Link to="/symptoms" className="hover:text-cyan-400 transition-colors">Symptom AI</Link></li>
                    <li><Link to="/doctors" className="hover:text-cyan-400 transition-colors">Find Doctors</Link></li>
                  </ul>
                </div>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs font-bold text-slate-600 uppercase tracking-widest italic">
              © 2026 NirogyaSathi • Build for Humanity
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}