"use client"

import { useToast } from "@/hooks/use-toast"
import { X } from "lucide-react"

export function Toaster() {
  const { toasts, dismiss } = useToast()

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 w-full max-w-sm px-4 md:px-0">
      {toasts.map(function ({ id, title, description }) {
        return (
          <div key={id} className="bg-zinc-950 border border-emerald-900/50 text-white p-4 rounded-xl shadow-xl flex justify-between items-start animate-in slide-in-from-right-full duration-300">
            <div className="grid gap-1">
              {title && <div className="font-semibold text-sm">{title}</div>}
              {description && <div className="text-sm text-zinc-400">{description}</div>}
            </div>
            <button onClick={() => dismiss(id)} className="text-zinc-500 hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        )
      })}
    </div>
  )
}