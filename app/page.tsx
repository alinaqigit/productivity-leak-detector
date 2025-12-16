'use client';

import React from 'react';
import { 
  SignInButton, 
  SignUpButton, 
  SignedIn, 
  SignedOut, 
  UserButton, 
  useUser 
} from '@clerk/nextjs';
import Link from 'next/link';

// --- ICONS (No changes here) ---
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

export default function LandingPage() {
  const { user } = useUser(); // Get user details if logged in

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100">
      
      {/* 1. NAVBAR - Integrated with Clerk */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                <ClockIcon />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-800">ProdLeak AI</span>
            </div>
            
            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
              <a href="#how-it-works" className="hover:text-indigo-600 transition">How it Works</a>
              
              {/* NEW: Dashboard Link in Navbar (Only visible when signed in) */}
              <SignedIn>
                <Link href="/dashboard" className="hover:text-indigo-600 transition text-indigo-600 font-semibold">
                  Dashboard
                </Link>
              </SignedIn>
            </div>

            {/* Clerk Authentication Buttons */}
            <div className="flex items-center gap-4">
              <SignedOut>
                <div className="hidden sm:block">
                  <SignInButton mode="modal">
                    <button className="text-slate-600 font-medium hover:text-slate-900 text-sm">Sign In</button>
                  </SignInButton>
                </div>
                <SignUpButton mode="modal">
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition shadow-md shadow-indigo-200">
                    Get Started
                  </button>
                </SignUpButton>
              </SignedOut>

              <SignedIn>
                 {/* Show User Name and Avatar when logged in */}
                <div className="flex items-center gap-3">
                    <span className="hidden sm:block text-sm font-medium text-slate-600">
                      Hi, {user?.firstName}
                    </span>
                    <UserButton afterSignOutUrl="/" />
                </div>
              </SignedIn>
            </div>
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
            {/* Primary Button */}
            <Link 
              href="/analyze"
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-indigo-500/30 transition transform hover:-translate-y-1"
            >
              Analyze My Productivity
            </Link>

            {/* NEW: Secondary Dashboard Button (Only visible when signed in) */}
            <SignedIn>
              <Link 
                href="/dashboard"
                className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-xl font-bold text-lg hover:bg-slate-50 transition shadow-sm"
              >
                View Dashboard
              </Link>
            </SignedIn>
          </div>

        </div>
      </section>

      {/* 3. HOW IT WORKS (Unchanged) */}
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

      {/* FOOTER */}
      <footer className="py-8 bg-slate-50 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p className="mb-2">ProdLeak AI — Built for the 2025 Hackathon</p>
        </div>
      </footer>
    </div>
  );
}