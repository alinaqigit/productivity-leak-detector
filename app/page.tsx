'use client';

import React, { useState } from 'react';

// --- ICONS (SVG inline for zero-dependency) ---
const ChartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>
);
const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);
const BrainIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>
);
const SparklesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
);
const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);

export default function LandingPage() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  // Mock function to simulate AI processing
  const handleAnalyze = () => {
    if (!input) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowResult(true);
      // Smooth scroll to results
      document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 1500);
  };

  const fillExample = () => {
    setInput("9:00 AM - Woke up\n9:30 AM - Checked Instagram & Twitter\n10:30 AM - Started coding but got distracted by Slack\n12:00 PM - Lunch\n1:00 PM - Deep work (actually just organized files)\n3:00 PM - Watched YouTube tutorial\n6:00 PM - Gaming");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100">
      
      {/* 1. NAVBAR */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                <ClockIcon />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-800">ProdLeak AI</span>
            </div>
            <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
              <a href="#how-it-works" className="hover:text-indigo-600 transition">How it Works</a>
              <a href="#demo" className="hover:text-indigo-600 transition">Live Demo</a>
            </div>
            <button 
              onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-800 transition"
            >
              Analyze My Day
            </button>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-semibold mb-6">
            <SparklesIcon /> AI-Powered Efficiency Tracker
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
            Find Where Your Time <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Really Goes</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto">
            Stop guessing why you're tired but unproductive. Our AI analyzes your unstructured daily routine and reveals hidden productivity leaks in seconds.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-indigo-500/30 transition transform hover:-translate-y-1"
            >
              Analyze My Productivity
            </button>
            <button className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-xl font-bold text-lg hover:bg-slate-50 transition">
              See How It Works
            </button>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS */}
      <section id="how-it-works" className="py-16 bg-white border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <div className="text-indigo-600"><ClockIcon /></div>, title: "1. Log Your Day", desc: "Paste your messy, unstructured daily routine or journal entry." },
              { icon: <div className="text-violet-600"><BrainIcon /></div>, title: "2. AI Processing", desc: "Our model identifies context switching, doom scrolling, and deep work." },
              { icon: <div className="text-fuchsia-600"><ChartIcon /></div>, title: "3. Get Insights", desc: "Receive a productivity score and specific fixes to save hours." }
            ].map((step, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-100 transition duration-300">
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center mb-4">
                  {step.icon}
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">{step.title}</h3>
                <p className="text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. MAIN INTERACTION (CORE FEATURE) */}
      <section id="demo" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="flex justify-between items-end mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Paste Your Routine</h2>
                  <p className="text-slate-500 text-sm mt-1">Don't worry about formatting. Just dump your brain.</p>
                </div>
                <button 
                  onClick={fillExample}
                  className="text-sm text-indigo-600 font-semibold hover:bg-indigo-50 px-3 py-1 rounded-md transition"
                >
                  ⚡ Paste Example
                </button>
              </div>

              <div className="relative">
                <textarea 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="e.g. Woke up at 9, scrolled TikTok for 30 mins, tried to study..."
                  className="w-full h-48 p-4 rounded-xl bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition resize-none text-slate-700 font-mono text-sm leading-relaxed"
                ></textarea>
              </div>

              <div className="mt-6 flex justify-end">
                <button 
                  onClick={handleAnalyze}
                  disabled={loading || !input}
                  className={`
                    flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-white transition-all
                    ${loading || !input ? 'bg-slate-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-indigo-500/25'}
                  `}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      Analyze Productivity <ArrowRightIcon />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* 5. RESULTS PREVIEW SECTION (Visible on State Change) */}
            {showResult && (
              <div id="results-section" className="bg-slate-50 border-t border-slate-100 p-8 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="flex items-center gap-2 mb-6">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Analysis Complete</span>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  
                  {/* Score Card */}
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <h4 className="text-slate-500 font-medium mb-4">Productivity Score</h4>
                    <div className="flex items-end gap-4">
                      <span className="text-6xl font-black text-slate-900">42<span className="text-2xl text-slate-400">/100</span></span>
                      <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold mb-4">CRITICAL</span>
                    </div>
                    <div className="mt-4 h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500 w-[42%] rounded-full"></div>
                    </div>
                  </div>

                  {/* Leaks Card */}
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <h4 className="text-slate-500 font-medium mb-4">Detected Leaks</h4>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3 text-slate-700">
                        <span className="w-2 h-2 rounded-full bg-red-500"></span>
                        Context Switching (Slack/Coding)
                        <span className="ml-auto text-slate-400 text-sm">-45m</span>
                      </li>
                      <li className="flex items-center gap-3 text-slate-700">
                        <span className="w-2 h-2 rounded-full bg-red-500"></span>
                        Social Media Spiral
                        <span className="ml-auto text-slate-400 text-sm">-1.5h</span>
                      </li>
                    </ul>
                  </div>

                </div>

                {/* 7. WOW FACTOR SECTION */}
                <div className="mt-8 p-6 bg-indigo-600 rounded-2xl text-white shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full blur-2xl"></div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2 opacity-90">
                      <SparklesIcon />
                      <span className="font-bold text-sm uppercase tracking-wide">AI Reality Check</span>
                    </div>
                    <p className="text-xl md:text-2xl font-medium leading-relaxed">
                      "You lost <span className="font-bold bg-white/20 px-1 rounded">2.4 hours</span> today. At an average rate of $50/hr, you essentially set <span className="font-bold text-yellow-300">$120 on fire</span>. Try batching your Slack checks to 9AM and 1PM tomorrow."
                    </p>
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>
      </section>

      {/* 6. WHY THIS MATTERS */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Why Track "Leaks"?</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div>
              <h3 className="font-bold text-lg text-indigo-400 mb-2">Stop Guessing</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Most people overestimate their productive hours by 50%. Get the real data.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-indigo-400 mb-2">Financial Impact</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Time is money. See exactly how much potential income you are losing daily.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-indigo-400 mb-2">Actionable Fixes</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Don't just feel bad. Get specific schedule changes to reclaim your time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="py-8 bg-slate-50 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p className="mb-2">ProdLeak AI — Built for the 2025 Hackathon</p>
          <div className="flex justify-center gap-4">
            <a href="#" className="hover:text-indigo-600">Privacy</a>
            <a href="#" className="hover:text-indigo-600">Twitter</a>
            <a href="#" className="hover:text-indigo-600">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}