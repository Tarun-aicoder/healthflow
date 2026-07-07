"use client";

import React, { useState, useEffect } from 'react';
import { ListOrdered, MapPin, AlertCircle } from 'lucide-react';

export default function WaitlistPage() {
  const [waitlist, setWaitlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
    fetch(`${apiBase}/waitlist`)
      .then(res => res.json())
      .then(json => { setWaitlist(json); setIsLoading(false); })
      .catch((err) => { console.error(err); setIsLoading(false); });
  }, []);

  if (isLoading) return <div className="p-8 text-zinc-400 animate-pulse flex justify-center">Loading Waitlist Pool...</div>;

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-5xl mx-auto">
      <header>
        <h1 className="text-2xl font-bold text-white">Waitlist Management</h1>
        <p className="text-zinc-400 text-sm">Prioritized replacement candidates for high-risk cancellations.</p>
      </header>

      <div className="bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-md rounded-2xl overflow-hidden">
        <div className="p-5 border-b border-zinc-800/60 bg-zinc-950/30 flex items-center gap-2">
          <ListOrdered className="w-5 h-5 text-emerald-500" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-white">Active Pool ({waitlist.length})</h2>
        </div>
        
        <div className="divide-y divide-zinc-800/60">
          {waitlist.length === 0 ? (
            <div className="p-8 text-center text-zinc-500 text-sm">Waitlist is currently empty.</div>
          ) : (
            waitlist.map((patient: any) => (
              <div key={patient.id} className="p-5 hover:bg-zinc-800/20 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
                
                <div>
                  <h3 className="text-lg font-bold text-white">{patient.patient_name}</h3>
                  <p className="text-sm text-zinc-400 mt-1">Requested: {patient.department}</p>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-950 rounded-lg border border-zinc-800">
                    <MapPin className="w-4 h-4 text-zinc-400" />
                    <span className="text-xs text-zinc-300">{patient.distance_miles} miles away</span>
                  </div>
                  
                  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border ${
                    patient.urgency === 'High' ? 'bg-red-950/30 border-red-900/50 text-red-400' : 'bg-amber-950/30 border-amber-900/50 text-amber-400'
                  }`}>
                    <AlertCircle className="w-3 h-3" />
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase">
                              {patient.urgency === "High" ? "URGENT" : "MODERATE"}
                              </span>
                  </div>
                </div>

              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}