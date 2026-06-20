"use client";

import React, { useEffect, useState } from 'react';
import { CheckCircle, X } from 'lucide-react';

interface Toast { id: number; message: string; type?: 'success' | 'error'; }

let toastId = 0;
const listeners: ((toast: Toast) => void)[] = [];

export const showToast = (message: string, type: 'success' | 'error' = 'success') => { const toast = { id: ++toastId, message, type }; listeners.forEach(listener => listener(toast)); };

export function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  useEffect(() => {
    const addToast = (toast: Toast) => { setToasts(prev => [...prev, toast]); setTimeout(() => { setToasts(prev => prev.filter(t => t.id !== toast.id)); }, 3000); };
    listeners.push(addToast);
    return () => { const index = listeners.indexOf(addToast); if (index > -1) listeners.splice(index, 1); };
  }, []);
  return (<div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2">{toasts.map(toast => (<div key={toast.id} className="toast flex items-center gap-3 rounded-2xl bg-zinc-900 px-4 py-3 text-sm text-white shadow-xl">{toast.type === 'success' && <CheckCircle className="h-4 w-4 text-emerald-400" />}<span>{toast.message}</span><button onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))} className="ml-2 opacity-60 hover:opacity-100"><X className="h-3.5 w-3.5" /></button></div>))}</div>);
}