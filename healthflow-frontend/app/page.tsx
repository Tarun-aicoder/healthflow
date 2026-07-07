"use client";

import React, { useState, useEffect } from 'react';
import { Calendar, AlertCircle, DollarSign, ListOrdered, Sparkles, Activity, RefreshCw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  ArrowRight,
  ArrowDown,
} from "lucide-react";

function WorkflowStep({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="min-w-37.5 glass-panel rounded-2xl p-4 text-center hover:scale-105 transition-all">
      <div className="text-white font-semibold">
        {title}
      </div>
      <div className="text-xs text-zinc-500 mt-1">
        {subtitle}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

  const loadDashboard = () => {
    fetch(`${apiBase}/dashboard`)
      .then(res => res.json())
      .then(json => { setData(json); setIsLoading(false); })
      .catch((err) => { console.error(err); setIsLoading(false); });
  };

  useEffect(() => { loadDashboard(); }, []);

  const handleResetDemo = async () => {
    await fetch(`${apiBase}/reset`, { method: 'POST' });
    loadDashboard();
  };

  if (isLoading || !data) return <div className="p-8 text-zinc-400 animate-pulse flex items-center justify-center h-full">Syncing Operations...</div>;

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
      <header className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Hospital Operations Copilot</h1>
          <p className="text-zinc-400 text-sm mt-1">Predictive operational sync for hospital coordinators.</p>
        </div>
        <button onClick={handleResetDemo} className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900/60 border border-zinc-800 text-zinc-400 hover:text-white text-xs font-medium transition-all">
          <RefreshCw className="w-3.5 h-3.5" /> Reset Pitch Data
        </button>
      </header>

      <div className="glass-panel rounded-3xl overflow-hidden relative p-8 md:p-10 bg-white/3">
  
  

  <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">

    <div>
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-zinc-300 text-xs mb-4">
        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        AI Copilot Active
      </div>

      <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
        Predict No-Shows.
        <br />
        Protect Revenue.
      </h1>

      <p className="text-zinc-400 mt-5 max-w-xl">
        HealthFlow AI continuously analyzes appointment behavior,
        identifies high-risk patients, and automatically recommends
        waitlist optimizations before revenue is lost.
      </p>

      <div className="flex flex-wrap gap-3 mt-6">
        <div className="px-4 py-2 rounded-xl bg-zinc-900/60 border border-zinc-800">
          <span className="text-xs text-zinc-500">Appointments</span>
          <div className="text-lg font-bold">{data.total_appointments}</div>
        </div>

        <div className="px-4 py-2 rounded-xl bg-zinc-900/60 border border-zinc-800">
          <span className="text-xs text-zinc-500">Risks Detected</span>
          <div className="text-lg font-bold text-amber-400">
            {data.predicted_no_shows}
          </div>
        </div>

        <div className="px-4 py-2 rounded-xl bg-zinc-900/60 border border-zinc-800">
          <span className="text-xs text-zinc-500">Revenue Risk</span>
          <div className="text-lg font-bold text-red-400">
            ${data.revenue_at_risk}
          </div>
        </div>
      </div>
    </div>

    <div className="flex items-center justify-center">
  <div className="text-center">

    <div className="relative w-72 h-72 flex items-center justify-center mx-auto">

      <div className="absolute w-72 h-72 rounded-full border border-white/5" />

      <div className="absolute w-56 h-56 rounded-full border border-white/10" />

      <div className="absolute w-40 h-40 rounded-full border border-white/15" />

      <div className="absolute w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-2xl">
        <div className="absolute w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-2xl">

  <div className="relative w-full h-full flex items-center justify-center">

    {/* Schedule */}
    <div className="absolute -top-17 left-1/2 -translate-x-1/2 flex items-center gap-1 text-xs font-semibold text-blue-400">
      <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
      <span>Schedule</span>
    </div>

    {/* Risk */}
    <div className="absolute top-1/2 -translate-y-1/2 -right-16 flex items-center gap-1 text-xs font-semibold text-red-400">
      <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
      <span>Risk</span>
    </div>

    {/* Waitlist */}
    <div className="absolute -bottom-12 -right-8 flex items-center gap-1 text-xs font-semibold text-emerald-400">
      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
      <span>Waitlist</span>
    </div>

    {/* Revenue */}
    <div className="absolute -bottom-12 -left-8 flex items-center gap-1 text-xs font-semibold text-amber-400">
      <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
      <span>Revenue</span>
    </div>

    {/* Patient */}
    <div className="absolute top-1/2 -translate-y-1/2 -left-20 flex items-center gap-1 text-xs font-semibold text-cyan-400">
      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
      <span>Patient</span>
    </div>

    <Activity className="w-8 h-8 text-black" />

  </div>

</div>
      </div>

    </div>

    <p className="text-sm text-zinc-500 mt-6">
      Gemini AI Monitoring Live Operations
    </p>

  </div>
</div>

  </div>
      </div>
      <div className="glass-panel rounded-3xl p-6">
  <div className="flex items-center justify-between mb-6">
    <h2 className="text-white font-bold text-lg">
      AI Optimization Workflow
    </h2>

    <span className="text-xs text-zinc-500">
      Real-time Decision Pipeline
    </span>
  </div>

  <div className="flex flex-col lg:flex-row items-center justify-between gap-6">

    <WorkflowStep
      title="Appointment"
      subtitle="Patient Scheduled"
    />

    <div className="hidden lg:block flex-1 h-px bg-white/10" />
    <ArrowDown className="lg:hidden text-zinc-600" />

    <WorkflowStep
      title="AI Analysis"
      subtitle="Behavior Assessment"
    />

    <div className="hidden lg:block flex-1 h-px bg-white/10" />
    <ArrowDown className="lg:hidden text-zinc-600" />

    <WorkflowStep
      title="Risk Detection"
      subtitle="No-Show Prediction"
    />

    <div className="hidden lg:block flex-1 h-px bg-white/10" />
    <ArrowDown className="lg:hidden text-zinc-600" />

    <WorkflowStep
      title="Waitlist Match"
      subtitle="Replacement Found"
    />

    <div className="hidden lg:block flex-1 h-px bg-white/10" />
    <ArrowDown className="lg:hidden text-zinc-600" />

    <WorkflowStep
      title="Revenue Saved"
      subtitle="$2500 Protected"
    />

  </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl">
          <div className="flex items-center justify-between text-xs font-semibold uppercase text-zinc-400"><span>Total Appointments</span><Calendar className="w-4 h-4 text-zinc-400" /></div>
          <div className="text-3xl font-bold mt-3 text-white">{data.total_appointments}</div>
        </div>
        <div className="glass-panel p-5 rounded-2xl border-amber-900/30">
          <div className="flex items-center justify-between text-xs font-semibold uppercase text-zinc-400"><span>Predicted No-Shows</span><AlertCircle className="w-4 h-4 text-zinc-400" /></div>
          <div className="text-3xl font-bold mt-3 text-white">{data.predicted_no_shows}</div>
        </div>
        <div className="glass-panel p-5 rounded-2xl border-red-900/30">
          <div className="flex items-center justify-between text-xs font-semibold uppercase text-zinc-400"><span>Revenue at Risk</span><DollarSign className="w-4 h-4 text-red-400" /></div>
          <div className="text-3xl font-bold mt-3 text-red-400">${data.revenue_at_risk}</div>
        </div>
        <div className="glass-panel p-5 rounded-2xl border-emerald-900/30">
          <div className="flex items-center justify-between text-xs font-semibold uppercase text-zinc-400"><span>Waitlist Pool</span><ListOrdered className="w-4 h-4 text-zinc-400" /></div>
          <div className="text-3xl font-bold mt-3 text-white">{data.waitlist_size}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4"><Sparkles className="w-4 h-4 text-indigo-400" /><h2 className="text-sm font-bold uppercase tracking-wider text-white">Active Copilot Insights</h2></div>
          <div className="space-y-4">
            {data.insights.map((ins: any) => (
              <div key={ins.id} className="p-4 bg-zinc-950/50 rounded-xl border border-zinc-800/50 flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Badge variant={ins.type === 'warning' ? 'destructive' : 'default'} className="text-[10px] uppercase">{ins.type}</Badge>
                  <h4 className="text-sm font-semibold text-white">{ins.title}</h4>
                </div>
                <p className="text-sm text-zinc-400 mt-1">{ins.description}</p>
              </div>
            ))}
          </div>
          
          <div className="flex items-center gap-2 mb-4 mt-8"><Activity className="w-4 h-4 text-emerald-400" /><h2 className="text-sm font-bold uppercase tracking-wider text-white">Recent Automation Actions</h2></div>
          <div className="space-y-3">
             {data.recent_actions.length === 0 ? (
               <p className="text-xs text-zinc-500">No recent operational changes.</p>
             ) : (
               data.recent_actions.map((act: any) => (
                 <div key={act.id} className="flex items-center justify-between p-3 bg-zinc-900/30 border border-zinc-800/50 rounded-lg">
                   <p className="text-sm text-zinc-300">{act.action}</p>
                   <span className="text-xs font-semibold text-emerald-400">+${act.revenue}</span>
                 </div>
               ))
             )}
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-5">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-4 text-white">Department Utilization</h2>
          <div className="space-y-5">
            {data.utilization.map((dept: any, i: number) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-xs text-white"><span>{dept.department}</span><span className="text-zinc-400 font-mono">{dept.current}%</span></div>
                <div className="w-full bg-zinc-950 rounded-full h-2 overflow-hidden border border-zinc-800">
                  <div  className="bg-linear-to-r from-cyan-400 via-blue-500 to-violet-500 h-2 rounded-full"
  style={{ width: `${dept.current}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}