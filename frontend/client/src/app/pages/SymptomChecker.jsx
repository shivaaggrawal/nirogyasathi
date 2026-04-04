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

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 }
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
      setTimeout(() => {
        setPredictionData({
          severity: { level: "CRITICAL", emergency_alert: "POSSIBLE STROKE: Use FAST test. Call emergency IMMEDIATELY." },
          vital_signs: { age: "55 yrs", gender: "Male" },
          detected_symptoms: ["One Side Weakness", "Severe Headache", "Speech Difficulty"],
          predictions: [
            { rank: 1, disease: "Migraine", confidence: 77.3, doctor: "Neurologist" },
            { rank: 2, disease: "Multiple Sclerosis", confidence: 14.4, doctor: "Neurologist" },
          ],
          conclusion: { disease: "Migraine", recommendations: ["Rest in a dark room", "Apply cold compress", "Avoid screens"] }
        });
        setIsAnalyzing(false);
      }, 1000);
    } 
    setIsAnalyzing(false);
  }, [text]);

  return (
    <div className="min-h-screen bg-[#dfedfb] py-8 px-4"> {/* Reduced top/bottom padding */}
      <div className="max-w-4xl mx-auto">
        
        {/* --- Header --- */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 rounded-full border border-amber-200 text-amber-700 text-[10px] font-bold uppercase tracking-widest mb-4">
            <Sparkles className="size-3" /> AI Diagnostic Assistant
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-2">
            Symptom <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">Analysis</span>
          </h1>
          <p className="text-slate-500 text-base max-w-lg mx-auto leading-relaxed">
            Our neural network will identify patterns and suggest next steps.
          </p>
        </motion.div>

        {/* --- Input Section --- */}
        <motion.div variants={fadeInUp} initial="initial" animate="animate" className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6 mb-6">
          <div className="space-y-4">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Start typing your symptoms here..."
              className="w-full p-5 bg-slate-50 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 outline-none transition-all text-base min-h-[120px] text-slate-700"
            />
            
            <div className="flex flex-wrap gap-2">
              {EXAMPLES.map((ex, i) => (
                <button
                  key={i}
                  onClick={() => setText(ex.text)}
                  className="px-3 py-1.5 bg-white border border-slate-200 hover:border-cyan-500 hover:text-cyan-600 rounded-xl text-xs font-bold text-slate-500 transition-all active:scale-95"
                >
                  {ex.label}
                </button>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
              <p className="text-xs text-slate-400 font-medium">
                Press <span className="bg-slate-100 px-1.5 py-0.5 rounded font-bold">Ctrl + Enter</span>
              </p>
              
              <button
                onClick={analyzeSymptoms}
                disabled={!text.trim() || isAnalyzing}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-slate-900 text-white rounded-xl font-bold text-base hover:bg-slate-800 disabled:opacity-50 transition-all shadow-lg"
              >
                {isAnalyzing ? <Loader2 className="size-4 animate-spin" /> : <>Analyze Now <TrendingUp className="size-4" /></>}
              </button>
            </div>
          </div>
        </motion.div>

        {/* --- Results Section --- */}
        <AnimatePresence>
          {predictionData && !isAnalyzing && (
            <motion.div variants={containerStagger} initial="initial" animate="animate" className="space-y-4">
              
              {/* Emergency Banner */}
              {predictionData.severity?.emergency_alert && (
                <motion.div variants={fadeInUp} className="bg-red-50 border border-red-200 rounded-2xl p-5 flex items-center gap-4 shadow-md">
                  <div className="bg-red-500 p-3 rounded-xl flex-shrink-0">
                    <ShieldAlert className="size-6 text-white" />
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="text-red-600 font-bold text-sm uppercase tracking-tight">Urgent Attention Required</h3>
                    <p className="text-red-700 font-semibold text-base leading-tight">
                      {predictionData.severity.emergency_alert}
                    </p>
                  </div>
                </motion.div>
              )}

              <div className="grid md:grid-cols-3 gap-4">
                {/* Severity Card */}
                <motion.div variants={fadeInUp} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm text-center">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Risk Level</h4>
                  <div className={`text-3xl font-black mb-3 ${predictionData.severity?.level === 'CRITICAL' ? 'text-red-500' : 'text-emerald-500'}`}>
                    {predictionData.severity?.level || 'LOW'}
                  </div>
                  <div className="text-xs font-bold text-slate-500 pt-3 border-t border-slate-50 flex justify-center gap-2">
                    <span>{predictionData.vital_signs?.age}</span><span>•</span><span>{predictionData.vital_signs?.gender}</span>
                  </div>
                </motion.div>

                {/* Analysis Card */}
                <motion.div variants={fadeInUp} className="md:col-span-2 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Differential Diagnosis</h4>
                  <div className="space-y-3">
                    {predictionData.predictions?.map((pred, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex justify-between items-end">
                          <span className="font-bold text-slate-800 text-sm">{pred.disease}</span>
                          <span className="font-black text-cyan-600 text-xs">{pred.confidence}%</span>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: `${pred.confidence}%` }} transition={{ duration: 0.8 }} className="h-full bg-indigo-500" />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Conclusion Card */}
              <motion.div variants={fadeInUp} className="bg-slate-950 rounded-[2rem] p-8 md:p-10 text-white">
                <div className="flex items-center gap-4 mb-8">
                  <div className="size-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center text-cyan-400 border border-white/10">
                    <HeartPulse className="size-6" />
                  </div>
                  <div>
                    <h5 className="text-cyan-400 font-bold uppercase tracking-widest text-[10px]">Conclusion</h5>
                    <h2 className="text-2xl md:text-3xl font-black leading-none">{predictionData.conclusion?.disease}</h2>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 border-t border-white/10 pt-8">
                  <div className="space-y-4">
                    <h4 className="font-bold text-base">Self-Care Protocols</h4>
                    <ul className="space-y-2">
                      {predictionData.conclusion?.recommendations?.map((rec, i) => (
                        <li key={i} className="flex items-center gap-3 text-slate-300 text-sm">
                          <div className="size-1.5 bg-cyan-500 rounded-full" /> {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                    <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
                      <AlertTriangle className="size-4 text-amber-400" /> Disclaimer
                    </h4>
                    <p className="text-[11px] text-slate-400 leading-normal mb-4">
                      Not a replacement for professional diagnosis. Consult a doctor if symptoms worsen.
                    </p>
                    <Link to="/doctors" className="flex items-center justify-center gap-2 w-full bg-cyan-600 hover:bg-cyan-500 py-3 rounded-xl font-bold text-sm transition-all">
                      Find Specialists <ArrowRight className="size-4" />
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