'use client';

import React, { useState } from 'react';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';

// --- Types representing the API Response Structure ---
interface AnalysisResult {
  productivity_score: number;
  total_wasted_hours: number;
  money_wasted: number;
  leaks: { name: string; time_lost: string }[];
  roast: string;
  fixes: string[];
}

// --- Icons ---
const ChartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>
);
const SparklesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
);
const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);
const ArrowLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
);

export default function AnalyzePage() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState('');

  // Handle Form Submission with Real API Call
  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault(); 
    if (!input) return;
    
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ routine: input }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze. Please try again.');
      }

      const data = await response.json();
      setResult(data);

      // Scroll to results after data loads
      setTimeout(() => {
        document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);

    } catch (err) {
      setError('Something went wrong. Please check your connection or try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fillExample = () => {
    setInput("9:00 AM - Woke up\n9:30 AM - Checked Instagram & Twitter\n10:30 AM - Started coding but got distracted by Slack\n12:00 PM - Lunch\n1:00 PM - Deep work (actually just organized files)\n3:00 PM - Watched YouTube tutorial\n6:00 PM - Gaming");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 p-8">
      
      {/* Header */}
      <div className="max-w-4xl mx-auto flex justify-between items-center mb-12">
        <Link href="/" className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition font-medium">
           <ArrowLeftIcon /> Back to Home
        </Link>
        <UserButton afterSignOutUrl="/" />
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          <div className="p-8 md:p-12">
            
            <div className="flex justify-between items-end mb-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Paste Your Routine</h2>
                <p className="text-slate-500 text-sm mt-1">Don't worry about formatting. Just dump your brain.</p>
              </div>
              <button 
                type="button"
                onClick={fillExample}
                className="text-sm text-indigo-600 font-semibold hover:bg-indigo-50 px-3 py-1 rounded-md transition"
              >
                ⚡ Paste Example
              </button>
            </div>

            {/* FORM START */}
            <form onSubmit={handleAnalyze} className="relative">
              <textarea 
                name="routine"
                required
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="e.g. Woke up at 9, scrolled TikTok for 30 mins, tried to study..."
                className="w-full h-48 p-4 rounded-xl bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition resize-none text-slate-700 font-mono text-sm leading-relaxed"
              ></textarea>

              {error && (
                <p className="text-red-500 text-sm mt-2 font-medium">{error}</p>
              )}

              <div className="mt-6 flex justify-end">
                <button 
                  type="submit"
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
            </form>
            {/* FORM END */}
            
          </div>

          {/* RESULTS PREVIEW SECTION (DYNAMIC) */}
          {result && (
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
                    <span className="text-6xl font-black text-slate-900">
                      {result.productivity_score}
                      <span className="text-2xl text-slate-400">/100</span>
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold mb-4 ${
                      result.productivity_score < 50 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {result.productivity_score < 50 ? 'CRITICAL' : 'GOOD'}
                    </span>
                  </div>
                  <div className="mt-4 h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ease-out ${
                        result.productivity_score < 50 ? 'bg-red-500' : 'bg-green-500'
                      }`} 
                      style={{ width: `${result.productivity_score}%` }}
                    ></div>
                  </div>
                </div>

                {/* Leaks Card */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                  <h4 className="text-slate-500 font-medium mb-4">Detected Leaks</h4>
                  <ul className="space-y-3">
                    {result.leaks.length > 0 ? (
                      result.leaks.map((leak, index) => (
                        <li key={index} className="flex items-center gap-3 text-slate-700">
                          <span className="w-2 h-2 rounded-full bg-red-500"></span>
                          {leak.name}
                          <span className="ml-auto text-slate-400 text-sm">-{leak.time_lost}</span>
                        </li>
                      ))
                    ) : (
                      <li className="text-slate-500 italic">No major leaks detected!</li>
                    )}
                  </ul>
                </div>
              </div>

              {/* WOW FACTOR SECTION (Dynamic Roast) */}
              <div className="mt-8 p-6 bg-indigo-600 rounded-2xl text-white shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full blur-2xl"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2 opacity-90">
                    <SparklesIcon />
                    <span className="font-bold text-sm uppercase tracking-wide">AI Reality Check</span>
                  </div>
                  <p className="text-xl md:text-2xl font-medium leading-relaxed">
                    "{result.roast}"
                  </p>
                  <div className="mt-4 pt-4 border-t border-white/20 flex gap-4 text-sm font-medium opacity-90">
                    <span>🔥 Wasted Hours: <span className="font-bold">{result.total_wasted_hours}h</span></span>
                    <span>💸 Money Burned: <span className="font-bold text-yellow-300">${result.money_wasted}</span></span>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}