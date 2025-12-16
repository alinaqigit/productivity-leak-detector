import { UserButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import connectDB from '@/lib/mongodb';
import Analysis from '@/models/Analysis';
import Link from "next/link";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

// --- Types ---
interface AnalysisData {
  productivity_score: number;
  total_wasted_hours: number;
  money_wasted: number;
  leaks: { name: string; time_lost: string }[];
  roast: string;
  fixes: string[];
  suggestions: string[];
  createdAt?: Date;
}

// --- Icons (Inline for performance) ---
const TrendIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
);
const WalletIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
);
const ClockIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
);
const FireIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" /></svg>
);
const PlusIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
);
// NEW: Home Icon
const HomeIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
);

// --- Data Fetching ---
async function getAnalysisData(): Promise<AnalysisData | null> {
  try {
    const { userId } = await auth();
    if (!userId) return null;

    await connectDB();
    
    // Sort by createdAt desc to get the latest
    const analysis = await Analysis.findOne({ userId }).sort({ createdAt: -1 }).lean();
    
    if (analysis) {
        return {
          ...analysis,
          // Serialize ObjectId/Date if necessary, though lean() helps
          createdAt: analysis.createdAt ? new Date(analysis.createdAt) : undefined
        } as unknown as AnalysisData;
    }
  } catch (error) {
    console.error("Failed to read analysis data:", error);
  }
  return null;
}

// --- Main Component ---
export default async function DashboardPage() {
  const data = await getAnalysisData();
  const user = await currentUser();

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100 pb-20">
      
      {/* Top Navigation */}
      <nav className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          
          {/* Left Side: Logo */}
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-md shadow-indigo-200">
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
             </div>
             <span className="font-bold text-xl text-slate-800 tracking-tight">Dashboard</span>
          </div>

          {/* Right Side: Home Link + User Button */}
          <div className="flex items-center gap-6">
            <Link 
              href="/" 
              className="hidden md:flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-600 transition"
            >
              <HomeIcon />
              Home
            </Link>
            <UserButton afterSignOutUrl="/" />
          </div>

        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-8">
        
        {/* Welcome Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Welcome back, {user?.firstName || 'Productivity Hunter'} 👋
            </h1>
            <p className="text-slate-500 mt-2">
              Here is your latest performance report. You've been busy (mostly).
            </p>
          </div>
          <Link href="/analyze" className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-3 rounded-xl font-semibold transition shadow-lg shadow-slate-200">
            <PlusIcon /> New Analysis
          </Link>
        </div>

        {data ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-8">
            
            {/* 1. KPI Grid (Bento Box Style) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Card 1: Productivity Score */}
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Productivity Score</p>
                    <p className="text-xs text-slate-400 mt-1">Daily Efficiency Rating</p>
                  </div>
                  <div className={`p-2 rounded-lg ${data.productivity_score >= 50 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                    <TrendIcon />
                  </div>
                </div>
                <div className="flex items-end gap-3">
                  <span className={`text-5xl font-black ${data.productivity_score >= 50 ? 'text-slate-900' : 'text-red-600'}`}>
                    {data.productivity_score}
                  </span>
                  <span className="text-lg text-slate-400 mb-1 font-medium">/100</span>
                </div>
                {/* Visual Progress Bar */}
                <div className="w-full bg-slate-100 h-2 rounded-full mt-4 overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${data.productivity_score >= 50 ? 'bg-gradient-to-r from-green-500 to-emerald-400' : 'bg-gradient-to-r from-red-500 to-orange-400'}`}
                    style={{ width: `${data.productivity_score}%` }}
                  />
                </div>
              </div>

              {/* Card 2: Money Wasted */}
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm group hover:shadow-md transition">
                <div className="flex justify-between items-start mb-4">
                   <div>
                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Financial Loss</p>
                    <p className="text-xs text-slate-400 mt-1">Opportunity Cost ($50/hr)</p>
                   </div>
                   <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                     <WalletIcon />
                   </div>
                </div>
                <div className="flex items-center gap-2">
                   <span className="text-5xl font-black text-slate-900">${data.money_wasted}</span>
                </div>
                <p className="mt-4 text-sm text-red-500 font-medium bg-red-50 inline-block px-2 py-1 rounded-md">
                   ⚠️ Money literally burned
                </p>
              </div>

              {/* Card 3: Time Wasted */}
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm group hover:shadow-md transition">
                <div className="flex justify-between items-start mb-4">
                   <div>
                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Time Leaks</p>
                    <p className="text-xs text-slate-400 mt-1">Hours spent on non-essentials</p>
                   </div>
                   <div className="p-2 rounded-lg bg-orange-50 text-orange-600">
                     <ClockIcon />
                   </div>
                </div>
                <span className="text-5xl font-black text-slate-900">{data.total_wasted_hours}h</span>
                <p className="mt-4 text-sm text-slate-500">
                   Equivalent to <span className="font-bold text-slate-800">{Math.round((data.total_wasted_hours / 24) * 100)}%</span> of your day
                </p>
              </div>
            </div>

            {/* 2. Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left Column (2/3 width) */}
              <div className="lg:col-span-2 space-y-8">
                
                {/* AI Roast Section */}
                <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl p-8 text-white shadow-xl shadow-indigo-200 relative overflow-hidden">
                  <div className="absolute top-0 right-0 -mr-8 -mt-8 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-4 opacity-90">
                      <div className="bg-white/20 p-1.5 rounded-lg backdrop-blur-sm">
                        <FireIcon />
                      </div>
                      <span className="font-bold text-sm tracking-wide uppercase">AI Reality Check</span>
                    </div>
                    <blockquote className="text-xl md:text-2xl font-medium leading-relaxed font-display">
                      "{data.roast}"
                    </blockquote>
                  </div>
                </div>

                {/* Fixes List */}
                <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <span className="w-2 h-6 bg-indigo-500 rounded-full"></span>
                    Actionable Fixes
                  </h3>
                  <div className="space-y-4">
                    {data.fixes.map((fix, idx) => (
                      <div key={idx} className="flex gap-4 items-start p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-indigo-200 transition group">
                        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-white border border-slate-200 text-indigo-600 rounded-full text-sm font-bold shadow-sm group-hover:scale-110 transition">
                          {idx + 1}
                        </div>
                        <p className="text-slate-700 leading-relaxed pt-1">{fix}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column (1/3 width) */}
              <div className="space-y-8">
                
                {/* Leaks List */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                  <h3 className="font-bold text-slate-900 mb-5">Top Time Leaks</h3>
                  <div className="space-y-3">
                    {data.leaks.map((leak, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition border border-transparent hover:border-slate-100">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-red-400"></div>
                          <span className="text-slate-600 font-medium text-sm">{leak.name}</span>
                        </div>
                        <span className="text-slate-900 font-bold text-sm bg-red-50 px-2 py-1 rounded">-{leak.time_lost}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Suggestions / Habits */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                  <h3 className="font-bold text-slate-900 mb-5">Habit Suggestions</h3>
                  <div className="flex flex-wrap gap-2">
                    {data.suggestions.map((suggestion, idx) => (
                      <span key={idx} className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                        ✨ {suggestion}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        ) : (
          /* EMPTY STATE */
          <div className="mt-20 text-center max-w-lg mx-auto p-10 bg-white rounded-3xl border border-dashed border-slate-300">
            <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <ClockIcon />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No Analysis Found</h3>
            <p className="text-slate-500 mb-8">
              We haven't analyzed your productivity yet. Log your first day to uncover your time leaks.
            </p>
            <Link 
              href="/analyze" 
              className="inline-flex items-center justify-center w-full px-6 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition shadow-lg shadow-indigo-200"
            >
              Start First Analysis <ArrowRightIconClass />
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}

// Helper for the empty state icon
const ArrowRightIconClass = () => (
  <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
);