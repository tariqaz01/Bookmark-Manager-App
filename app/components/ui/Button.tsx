"use client"

import { Plus } from "lucide-react";

interface ButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
}

const Button = ({ onClick, children }: ButtonProps) => {
  return (
    <>
      <div className="relative group/btn inline-block">
  {/* Ambient background glow on hover */}
  <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 opacity-0 blur-md transition duration-500 group-hover/btn:opacity-30 dark:group-hover/btn:opacity-50" />

  <button
    onClick={onClick}
    className="relative inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl text-sm font-semibold tracking-wide cursor-pointer select-none transition-all duration-200 ease-out active:scale-[0.98] bg-emerald-700/90 dark:bg-emerald-900/50 text-white dark:text-emerald-100 border-emerald-700/50 shadow-[0_0_20px_-5px_rgba(16,185,129,0.15)] backdrop-blur-md hover:bg-emerald-900/90 hover:border-emerald-500/60 hover:text-white"
  >
    <Plus className="w-4 h-4 text-emerald-300/90 transition-transform duration-300 group-hover/btn:rotate-90 group-hover/btn:scale-110 dark:text-emerald-400" />
    <span>{children || "Add Bookmark"}</span>
  </button>
</div>
    </>
  );
};

export default Button;