import { Link } from "react-router";
import { motion } from "framer-motion"; // Add this for animations
import { Activity, Stethoscope, FileText, Shield, Star, CheckCircle, ArrowRight } from "lucide-react";

// Animation Variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } }
};

export function Landing() {
  const features = [
    { icon: Activity, title: "AI Disease Prediction", description: "Advanced symptom analysis to identify potential health conditions with confidence scores." },
    { icon: Stethoscope, title: "Find Qualified Doctors", description: "Search and filter doctors by specialization, city, ratings, and availability." },
    { icon: FileText, title: "Medical Records", description: "Securely manage and share your medical history with healthcare providers." },
    { icon: Shield, title: "Secure & Private", description: "Your health data is encrypted and protected with industry-leading security." },
  ];

  const stats = [
    { value: "50K+", label: "Active Users" },
    { value: "10K+", label: "Verified Doctors" },
    { value: "98%", label: "Satisfaction Rate" },
    { value: "24/7", label: "Support" },
  ];

  return (
    <div className="bg-slate-50">
      {/* --- Professional Hero Section --- */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1758691463610-3c2ecf5fb3fa?auto=format&fit=crop&q=80&w=1920"
            alt="Healthcare"
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-[2px]" />
        </div>

        <motion.div 
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="container relative z-10 mx-auto px-4 text-center"
        >
          <div className="max-w-4xl mx-auto space-y-10">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 px-5 py-2 bg-cyan-500/10 backdrop-blur-xl rounded-full border border-cyan-500/30 mx-auto"
            >
              <div className="size-2 bg-cyan-400 rounded-full animate-pulse" />
              <span className="text-xs md:text-sm text-cyan-100 font-semibold tracking-wide uppercase">AI-Powered Healthcare</span>
            </motion.div>

            <h1 className="text-7xl font-black leading-tight text-white tracking-tight">
              Predict symptoms. <br />
              <span className="text-transparent text-7xl bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Find doctors.</span>
            </h1>

            <p className="text-2xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
              Experience the future of healthcare with our AI-driven diagnostic tools and a verified network of top-tier medical professionals.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center pt-6">
              <Link
                to="/symptoms"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-cyan-600 text-white rounded-2xl hover:bg-cyan-500 transition-all shadow-[0_0_20px_rgba(8,145,178,0.3)] font-bold text-lg"
              >
                Check Symptoms
                <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/doctors"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-2xl hover:bg-white/20 transition-all font-bold text-lg"
              >
                Find Doctors
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* --- Animated Features Section --- */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Modern Tools for <span className="text-cyan-600">Better Health</span>
            </h2>
            <div className="h-1.5 w-20 bg-cyan-500 mx-auto rounded-full mb-6" />
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="p-8 bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-cyan-100 transition-all"
              >
                <div className="size-14 bg-cyan-50 rounded-2xl flex items-center justify-center mb-6 text-cyan-600">
                  <feature.icon className="size-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- Professional Stats (Minimalist) --- */}
      <section className="py-20 bg-slate-900 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-10 left-10 size-64 bg-cyan-500 rounded-full blur-[120px]" />
            <div className="absolute bottom-10 right-10 size-64 bg-blue-500 rounded-full blur-[120px]" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {stats.map((stat, index) => (
              <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                key={index} 
                className="text-center"
              >
                <div className="text-4xl md:text-6xl font-black text-white mb-2">{stat.value}</div>
                <div className="text-cyan-400 font-medium tracking-widest uppercase text-xs">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Trust & Testimonials (Clean Layout) --- */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              className="relative"
            >
              <div className="absolute -top-4 -left-4 size-full bg-cyan-100 rounded-[3rem] -z-10" />
              <img
                src="https://images.unsplash.com/photo-1758691461516-7e716e0ca135?auto=format&fit=crop&q=80&w=1000"
                alt="Doctor"
                className="rounded-[3rem] shadow-2xl object-cover h-[500px] w-full"
              />
            </motion.div>
            
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              className="space-y-8"
            >
              <h2 className="text-4xl font-bold text-slate-900 leading-tight">
                Trusted by the Global <br />
                <span className="text-cyan-600">Medical Community</span>
              </h2>
              <div className="grid gap-4">
                {["HIPAA compliant infrastructure", "Real-time AI Accuracy", "Verified Credentials"].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <CheckCircle className="text-cyan-500 size-6" />
                    <span className="font-semibold text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- CTA Section (Modern Gradient) --- */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="bg-gradient-to-br from-cyan-600 to-blue-700 rounded-[3rem] p-12 md:p-20 text-center text-white shadow-2xl shadow-cyan-100"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8">Ready for a Healthier Life?</h2>
            <p className="text-cyan-100 text-lg md:text-xl mb-12 max-w-2xl mx-auto opacity-90">
              Join 50,000+ others who have transformed their medical experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/signup" className="px-12 py-5 bg-white text-cyan-700 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-colors shadow-lg">
                Get Started Now
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}