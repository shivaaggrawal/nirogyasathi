import { Outlet, Link, useLocation } from "react-router";
import { Activity, User, FileText, Menu, X, ArrowRight, ShieldCheck, HeartPulse } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Root() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll effect for header
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: "Symptom Checker", path: "/symptoms" },
    { name: "Find Doctors", path: "/doctors" },
    { name: "Records", path: "/records" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* --- MODERN HEADER --- */}
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
                Health<span className="text-cyan-600">AI</span>
              </span>
            </Link>

            {/* Desktop Nav Items */}
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

            {/* Auth Actions */}
            <div className="hidden md:flex items-center gap-4">
              <Link 
                to="/login" 
                className="text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="flex items-center gap-2 bg-slate-900 text-white px-6 py-2.5 rounded-2xl text-sm font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-95"
              >
                Join Now
                <ArrowRight className="size-4" />
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

      {/* --- PAGE CONTENT --- */}
      <main className="flex-1 relative">
        <Outlet />
      </main>

      {/* --- PROFESSIONAL FOOTER --- */}
      <footer className="bg-slate-950 text-slate-400 pt-20 pb-10">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
            
            <div className="md:col-span-4 space-y-6">
              <div className="flex items-center gap-3">
                <div className="bg-cyan-500/20 p-2 rounded-xl border border-cyan-500/30">
                  <HeartPulse className="size-6 text-cyan-400" />
                </div>
                <span className="text-2xl font-black text-white">HealthAI</span>
              </div>
              <p className="text-slate-400 leading-relaxed max-w-sm">
                Revolutionizing personal healthcare through AI-driven insights and world-class medical expertise.
              </p>
              <div className="flex gap-4">
                <div className="p-2 bg-slate-900 rounded-lg hover:text-white transition-colors cursor-pointer border border-slate-800">
                  <ShieldCheck className="size-5" />
                </div>
                {/* Social icons handle here */}
              </div>
            </div>

            <div className="md:col-span-2 space-y-4">
              <h4 className="text-white font-bold">Platform</h4>
              <ul className="space-y-3 text-sm">
                <li><Link to="/symptoms" className="hover:text-cyan-400 transition-colors">Symptom AI</Link></li>
                <li><Link to="/doctors" className="hover:text-cyan-400 transition-colors">Specialists</Link></li>
                <li><Link to="/records" className="hover:text-cyan-400 transition-colors">Vault</Link></li>
              </ul>
            </div>

            <div className="md:col-span-2 space-y-4">
              <h4 className="text-white font-bold">Resources</h4>
              <ul className="space-y-3 text-sm">
                <li><Link to="/blog" className="hover:text-cyan-400 transition-colors">Health Blog</Link></li>
                <li><Link to="/faq" className="hover:text-cyan-400 transition-colors">Support Center</Link></li>
                <li><Link to="/contact" className="hover:text-cyan-400 transition-colors">Connect</Link></li>
              </ul>
            </div>

            <div className="md:col-span-4 space-y-6">
              <h4 className="text-white font-bold">Stay Updated</h4>
              <p className="text-sm">Get the latest medical insights delivered to your inbox.</p>
              <div className="flex p-1 bg-slate-900 border border-slate-800 rounded-2xl">
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="bg-transparent border-none focus:ring-0 text-sm px-4 w-full text-white" 
                />
                <button className="bg-cyan-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-cyan-500 transition-all">
                  Join
                </button>
              </div>
            </div>

          </div>

          <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs uppercase tracking-widest font-bold text-slate-600">
              © 2026 HealthAI • Build for Humanity
            </p>
            <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-slate-600">
              <a href="#" className="hover:text-white">Privacy</a>
              <a href="#" className="hover:text-white">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}