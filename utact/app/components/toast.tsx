"use client";

interface ToastProps {
  show: boolean;
  message: string;
}

export function Toast({ show, message }: ToastProps) {
  if (!show) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-800 px-4 py-3 rounded-lg shadow-lg animate-in slide-in-from-right-5 fade-in-0 duration-300 border border-slate-700 dark:border-slate-300">
        <div className="flex items-center gap-2">
          <span className="text-lg">🤔</span>
          <span className="font-medium">{message}</span>
        </div>
      </div>
    </div>
  );
}
