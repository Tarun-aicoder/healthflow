"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Toaster } from "@/components/ui/toaster" ; 
import { LayoutDashboard, CalendarDays, ListOrdered, Activity, Menu, X } from 'lucide-react';
import { GeistSans } from 'geist/font/sans'
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Appointments', href: '/appointments', icon: CalendarDays },
    { name: 'Waitlist', href: '/waitlist', icon: ListOrdered },
  ];

  const NavLinks = () => (
    <div className="space-y-1">
      <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4 px-2">Operations Hub</div>
      {navigation.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            onClick={() => setIsMobileMenuOpen(false)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              isActive ? 'bg-white text-black shadow-lg' : 'text-zinc-400 hover:bg-zinc-800/40 hover:text-white'
            }`}
          >
            <item.icon className="w-5 h-5" />
            {item.name}
          </Link>
        );
      })}
    </div>
  );

  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={`h-screen w-screen overflow-hidden bg-slate-950 text-slate-100 flex antialiased ${GeistSans.className}`}>
        <div className="absolute top-[-20%] right-[10%] w-160 h-160 rounded-full bg-violet-600/10 blur-[180px] pointer-events-none" />
        <div className="absolute bottom-[-20%] left-[20%] w-140 h-140 rounded-full bg-cyan-600/10 blur-[200px] pointer-events-none" />
        <aside className="hidden md:flex w-64 h-full glass-panel flex-col sticky top-0 z-30 border-r-zinc-800/60">
          <div className="h-16 flex items-center px-6 border-b border-zinc-800/60 gap-2">
            <Activity className="w-5 h-5 text-white" />
            <span className="text-white font-bold text-lg tracking-tight">HealthFlow AI</span>
          </div>
          <nav className="flex-1 px-4 py-6"><NavLinks /></nav>
        </aside>

        <div className="md:hidden fixed top-0 left-0 right-0 h-16 glass-panel px-4 flex items-center justify-between z-40">
          <span className="text-white font-bold tracking-tight flex items-center gap-2"><Activity className="w-4 h-4 text-indigo-500"/> HealthFlow AI</span>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-zinc-400">{isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}</button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 top-16 bg-zinc-950/95 backdrop-blur-lg z-30 p-6"><nav className="space-y-6"><NavLinks /></nav></div>
        )}

        <main className="flex-1 h-full overflow-y-auto pt-16 md:pt-0 relative z-10 w-full">{children}</main>
        <Toaster /> 
      </body>
    </html>
  );
}