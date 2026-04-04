import { Outlet, Link, useLocation } from "react-router";
import { Menu, X, ArrowRight, HeartPulse } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Root() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] font-sans">

      {/* HEADER */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
            ? "bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm"
            : "bg-white border-b border-slate-100 shadow-amber-50"
          }`}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-linear-to-br from-cyan-600 to-blue-600 p-2 rounded-xl group-hover:scale-110 transition-transform shadow-lg shadow-cyan-200">
                <HeartPulse className="size-6 text-white" />
              </div>
              <span className="text-xl font-black tracking-tighter text-slate-900">
                Nirogya<span className="text-cyan-600">Sathi</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1 lg:gap-4">
              {[
                { name: "Home", path: "/" },
                { name: "Symptom Checker", path: "/symptoms" },
                { name: "Find Doctors", path: "/doctors" },
                { name: "Lab", path: "/lab" }, // ✅ Added
                { name: "Medical Profile", path: "/records" },
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-4 py-2 rounded-xl font-bold transition-all ${isActive(link.path)
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

            {/* Signup Button */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                to="/signup"
                className="px-6 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 flex items-center gap-2 active:scale-95"
              >
                Get Started <ArrowRight className="size-4" />
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-slate-50 text-slate-600 border border-slate-200"
            >
              {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="md:hidden py-6 border-t border-slate-100 space-y-2"
              >
                <Link to="/symptoms" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 font-bold text-slate-700 hover:bg-slate-50 rounded-xl">
                  Symptom Checker
                </Link>

                {/* ✅ LABS ADDED */}
                <Link to="/doctors" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 font-bold text-slate-700 hover:bg-slate-50 rounded-xl">
                  Find Doctors
                </Link>
                <Link to="/labs" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 font-bold text-slate-700 hover:bg-slate-50 rounded-xl">
                  Labs
                </Link>


                <div className="pt-4 px-4">
                  <Link
                    to="/signup"
                    className="block w-full py-3 bg-cyan-600 text-white text-center rounded-xl font-bold"
                  >
                    Get Started
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      {/* MAIN */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-400 border-t border-slate-900">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">

            <div>
              <div className="flex items-center gap-2 mb-4">
                <HeartPulse className="size-6 text-cyan-500" />
                <span className="text-white font-bold">NirogyaSathi</span>
              </div>
              <p className="text-sm">
                AI-powered healthcare platform.
              </p>
            </div>

            <div>
              <h4 className="text-white mb-3">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/symptoms">Symptoms</Link></li>
                <li><Link to="/doctors">Doctors</Link></li>
                <li><Link to="/labs">Labs</Link></li> {/* ✅ Added */}
              </ul>
            </div>

            <div>
              <h4 className="text-white mb-3">Account</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/signup">Register</Link></li>
              </ul>
            </div>

            <div>
              <p className="text-xs text-slate-500">
                For emergencies visit nearest hospital.
              </p>
            </div>

          </div>

          <div className="mt-10 text-center text-xs text-slate-600">
            © 2026 NirogyaSathi
          </div>
        </div>
      </footer>
    </div>
  );
}