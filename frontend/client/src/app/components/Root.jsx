import { Outlet, Link, useLocation } from "react-router";
import { User, Menu, X, ArrowRight, HeartPulse } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Root() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll logic for the new theme "Glass" effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] font-sans">
     
      <header 
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled 
            ? "bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm" 
            : "bg-white border-b border-slate-100 shadow-amber-50"
        }`}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            
            {/* Logo: New Theme Style */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-gradient-to-br from-cyan-600 to-blue-600 p-2 rounded-xl group-hover:scale-110 transition-transform shadow-lg shadow-cyan-200">
                <HeartPulse className="size-6 text-white" />
              </div>
              <span className="text-xl font-black tracking-tighter text-slate-900">
                Nirogya<span className="text-cyan-600">Sathi</span>
              </span>
            </Link>
            
            {/* Desktop Nav: Old Simple Layout + New Interactive Hover */}
            <div className="hidden md:flex items-center gap-1 lg:gap-4">
              {[
                { name: "Home", path: "/" },
                { name: "Symptom Checker", path: "/symptoms" },
                { name: "Find Doctors", path: "/doctors" },
                { name: "Medical Profile", path: "/records" },
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-4 py-2 rounded-xl text-{} font-bold transition-all ${
                    isActive(link.path) 
                      ? "text-cyan-600 bg-cyan-50/50" 
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <motion.div 
                      layoutId="navIndicator"
                      className="absolute bottom-1 left-4 right-4 h-0.5 bg-cyan-600 rounded-full"
                    />
                  )}
                </Link>
              ))}
            </div>
            
            {/* Actions: New Theme Buttons in Old Layout positions */}
            <div className="hidden md:flex items-center gap-4">
              <Link to="/login" className="text-sm font-bold text-slate-500 hover:text-cyan-600 transition-colors">
                Login
              </Link>
              <Link
                to="/signup"
                className="px-6 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 flex items-center gap-2 active:scale-95"
              >
                Join Now <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/profile"
                className={`p-2 rounded-xl border transition-all ${
                  isActive("/profile") 
                    ? "bg-cyan-50 border-cyan-200 text-cyan-600" 
                    : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
                }`}
              >
                <User className="size-5" />
              </Link>
            </div>
            
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-slate-50 text-slate-600 border border-slate-200"
            >
              {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
          
          {/* Mobile Menu Dropdown */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="md:hidden py-6 border-t border-slate-100 space-y-2"
              >
                <Link to="/symptoms" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 font-bold text-slate-700 hover:bg-slate-50 rounded-xl">Symptom Checker</Link>
                <Link to="/doctors" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 font-bold text-slate-700 hover:bg-slate-50 rounded-xl">Find Doctors</Link>
                <div className="pt-4 flex gap-3 px-4">
                  <Link to="/signup" className="flex-1 py-3 bg-cyan-600 text-white text-center rounded-xl font-bold">Sign Up</Link>
                  <Link to="/login" className="flex-1 py-3 bg-slate-100 text-slate-900 text-center rounded-xl font-bold">Login</Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>
      
      {/* Main Content Area */}
      <main className="flex-1">
        <Outlet />
      </main>
      
      {/* --- FOOTER: Old 4-Column Layout + New Theme Colors --- */}
      <footer className="bg-slate-950 text-slate-400 border-t border-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
            
            {/* Col 1: Branding */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <HeartPulse className="size-6 text-cyan-500" />
                <span className="text-xl font-black text-white tracking-tighter uppercase">NirogyaSathi</span>
              </div>
              <p className="text-sm leading-relaxed max-w-xs">
                Next-gen healthcare platform combining AI diagnostics with human expertise.
              </p>
            </div>

            {/* Col 2: Navigation */}
            <div>
              <h4 className="text-white font-bold mb-5 text-xs uppercase tracking-[0.2em]">Platform</h4>
              <ul className="space-y-3 text-sm">
                <li><Link to="/symptoms" className="hover:text-cyan-400 transition-colors">Symptom AI</Link></li>
                <li><Link to="/doctors" className="hover:text-cyan-400 transition-colors">Find Doctors</Link></li>
                <li><Link to="/records" className="hover:text-cyan-400 transition-colors">Records Vault</Link></li>
              </ul>
            </div>

            {/* Col 3: Account */}
            <div>
              <h4 className="text-white font-bold mb-5 text-xs uppercase tracking-[0.2em]">Account</h4>
              <ul className="space-y-3 text-sm">
                <li><Link to="/profile" className="hover:text-cyan-400 transition-colors">User Profile</Link></li>
                <li><Link to="/login" className="hover:text-cyan-400 transition-colors">Member Login</Link></li>
                <li><Link to="/signup" className="hover:text-cyan-400 transition-colors">Register Free</Link></li>
              </ul>
            </div>

            {/* Col 4: Trust */}
            <div>
              <h4 className="text-white font-bold mb-5 text-xs uppercase tracking-[0.2em]">Medical Info</h4>
              <p className="text-xs italic leading-relaxed text-slate-500">
                All AI data is for reference only. For emergencies, please contact 911 or visit the nearest hospital.
              </p>
            </div>

          </div>
          
          {/* Bottom Bar */}
          <div className="mt-16 pt-8 border-t border-slate-900 text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">
              © 2026 NirogyaSathi • Engineered for Humanity
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}