import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  AlertCircle, TrendingUp, ArrowRight, Loader2, 
  ShieldAlert, Activity, HeartPulse, CheckCircle2, AlertTriangle, Info, Sparkles
} from "lucide-react";
import { Link } from "react-router-dom";

const EXAMPLES = [
  { label: "🤧 Cold / Flu", text: "I have runny nose, sneezing, sore throat, mild fever and body aches since 2 days. 28 year old." },
  { label: "💛 Liver / Jaundice", text: "I notice yellow skin, yellow eyes, dark urine, pale stools and right upper quadrant pain. 40-year-old male." },
  { label: "🫀 Cardiac Emergency", text: "I have chest pain, shortness of breath, palpitations and rapid heartbeat. 62 year old male." },
  { label: "🧠 Stroke Signs", text: "I have one side weakness, speech difficulty, severe headache and facial drooping. 55 year old male." },
];

// Animation Variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const containerStagger = {
  animate: { transition: { staggerChildren: 0.1 } }
};

export function SymptomChecker() {
  const [text, setText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [predictionData, setPredictionData] = useState(null);
  const [error, setError] = useState(null);

  const analyzeSymptoms = useCallback(async () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    
    setIsAnalyzing(true);
    setPredictionData(null);
    setError(null);
    
    try {
      const res = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: trimmed }),
      });
      const result = await res.json();
      if (result.error) setError(result.error);
      else setPredictionData(result);
    } catch (err) {
      // Mock Data Fallback
      setTimeout(() => {
        setPredictionData({
          severity: { 
            level: "CRITICAL", 
            emergency_alert: "POSSIBLE STROKE: Use FAST test. Call emergency IMMEDIATELY."
          },
          vital_signs: { age: "55 yrs", gender: "Male" },
          detected_symptoms: ["One Side Weakness", "Severe Headache", "Speech Difficulty"],
          predictions: [
            { rank: 1, disease: "Migraine", confidence: 77.3, doctor: "Neurologist" },
            { rank: 2, disease: "Multiple Sclerosis", confidence: 14.4, doctor: "Neurologist" },
          ],
          conclusion: {
            disease: "Migraine",
            recommendations: ["Rest in a dark room", "Apply cold compress", "Avoid screens"]
          }
        });
        setIsAnalyzing(false);
      }, 1500);
      return;
    } 
    setIsAnalyzing(false);
  }, [text]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-16 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* --- Header --- */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-50 rounded-full border border-amber-200 text-amber-700 text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles className="size-3" /> AI Diagnostic Assistant
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-4">
            Symptom <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">Analysis</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-xl mx-auto leading-relaxed">
            Describe how you feel in natural language. Our neural network will identify patterns and suggest next steps.
          </p>
        </motion.div>

        {/* --- Input Section --- */}
        <motion.div 
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/60 border border-slate-100 p-8 mb-10"
        >
          <div className="space-y-4">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Start typing your symptoms here..."
              className="w-full p-6 bg-slate-50 rounded-3xl border border-slate-200 focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 outline-none transition-all text-lg min-h-[160px] text-slate-700 leading-relaxed"
            />
            
            <div className="flex flex-wrap gap-2 pt-2">
              {EXAMPLES.map((ex, i) => (
                <button
                  key={i}
                  onClick={() => setText(ex.text)}
                  className="px-4 py-2 bg-white border border-slate-200 hover:border-cyan-500 hover:text-cyan-600 rounded-2xl text-sm font-bold text-slate-500 transition-all active:scale-95"
                >
                  {ex.label}
                </button>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-slate-100">
              <p className="text-sm text-slate-400 font-medium italic">
                Press <span className="bg-slate-100 px-2 py-1 rounded-lg not-italic font-bold">Ctrl + Enter</span> to quick start
              </p>
              
              <button
                onClick={analyzeSymptoms}
                disabled={!text.trim() || isAnalyzing}
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-4 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:bg-slate-800 disabled:opacity-50 transition-all shadow-xl shadow-slate-300"
              >
                {isAnalyzing ? (
                  <Loader2 className="size-5 animate-spin" />
                ) : (
                  <>Analyze Now <TrendingUp className="size-5" /></>
                )}
              </button>
            </div>
          </div>
        </motion.div>

        {/* --- Results Section --- */}
        <AnimatePresence>
          {predictionData && !isAnalyzing && (
            <motion.div 
              variants={containerStagger}
              initial="initial"
              animate="animate"
              className="space-y-8"
            >
              {/* Emergency Banner */}
              {predictionData.severity?.emergency_alert && (
                <motion.div 
                  variants={fadeInUp}
                  className="bg-red-50 border-2 border-red-200 rounded-3xl p-8 flex items-start gap-6 shadow-lg shadow-red-100"
                >
                  <div className="bg-red-500 p-4 rounded-2xl shadow-lg shadow-red-200">
                    <ShieldAlert className="size-8 text-white" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-red-600 font-black text-xl uppercase tracking-tighter">Urgent Medical Attention</h3>
                    <p className="text-red-700 font-bold text-lg leading-snug">
                      {predictionData.severity.emergency_alert}
                    </p>
                  </div>
                </motion.div>
              )}

              <div className="grid md:grid-cols-3 gap-8">
                {/* Severity Card */}
                <motion.div variants={fadeInUp} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-lg text-center space-y-4">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Risk Level</h4>
                  <div className={`text-4xl font-black ${predictionData.severity?.level === 'CRITICAL' ? 'text-red-500' : 'text-emerald-500'}`}>
                    {predictionData.severity?.level || 'LOW'}
                  </div>
                  <div className="flex justify-center gap-4 text-sm font-bold text-slate-500 pt-4 border-t border-slate-50">
                    <span>{predictionData.vital_signs?.age}</span>
                    <span>•</span>
                    <span>{predictionData.vital_signs?.gender}</span>
                  </div>
                </motion.div>

                {/* Analysis Card */}
                <motion.div variants={fadeInUp} className="md:col-span-2 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-lg space-y-6">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Differential Diagnosis</h4>
                  <div className="space-y-4">
                    {predictionData.predictions?.map((pred, i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex justify-between items-end">
                          <span className="font-bold text-slate-900 text-lg">{pred.disease}</span>
                          <span className="font-black text-cyan-600">{pred.confidence}%</span>
                        </div>
                        <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${pred.confidence}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Conclusion Card */}
              <motion.div variants={fadeInUp} className="bg-slate-900 rounded-[3rem] p-10 md:p-14 text-white space-y-10">
                <div className="flex items-center gap-6">
                  <div className="size-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-cyan-400 border border-white/10">
                    <HeartPulse className="size-8" />
                  </div>
                  <div>
                    <h5 className="text-cyan-400 font-bold uppercase tracking-widest text-xs mb-1">Primary Conclusion</h5>
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight">{predictionData.conclusion?.disease}</h2>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-12 border-t border-white/10 pt-10">
                  <div className="space-y-6">
                    <h4 className="font-bold text-xl">Self-Care Protocols</h4>
                    <ul className="space-y-4">
                      {predictionData.conclusion?.recommendations?.map((rec, i) => (
                        <li key={i} className="flex items-center gap-4 text-slate-300">
                          <div className="size-2 bg-cyan-500 rounded-full" />
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-white/5 rounded-3xl p-8 border border-white/10 self-start">
                    <h4 className="font-bold mb-4 flex items-center gap-3">
                      <AlertTriangle className="size-5 text-amber-400" /> Medical Disclaimer
                    </h4>
                    <p className="text-sm text-slate-400 leading-relaxed font-medium">
                      This AI tool is for informational purposes only. It is not a replacement for professional diagnosis. If symptoms persist or worsen, consult a doctor.
                    </p>
                    <Link
                      to="/doctors"
                      className="mt-8 flex items-center justify-center gap-3 w-full bg-cyan-600 hover:bg-cyan-500 py-4 rounded-2xl font-bold transition-all"
                    >
                      Find Specialists <ArrowRight className="size-5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}