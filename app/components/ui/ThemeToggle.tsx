"use client";

import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  // Default to light theme, but check if user previously selected dark
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const isDarkMode = savedTheme === "dark";
    setIsDark(isDarkMode);
    document.documentElement.classList.toggle("dark", isDarkMode);
    document.documentElement.setAttribute("data-theme", isDarkMode ? "dark" : "light");
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <button
      onClick={toggle}
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`
        relative flex items-center shrink-0 w-16 h-8 rounded-full p-1 cursor-pointer
        transition-colors duration-300 ease-in-out focus:outline-none
        focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500
        ${isDark ? "bg-gray-700" : "bg-gray-200"}
      `}
    >
      {/* Sun icon — left */}
      <span
        className={`
          absolute left-2 transition-opacity duration-300
          ${isDark ? "opacity-40" : "opacity-100"}
        `}
      >
        <SunIcon className="w-4 h-4 text-yellow-500" />
      </span>

      {/* Moon icon — right */}
      <span
        className={`
          absolute right-2 transition-opacity duration-300
          ${isDark ? "opacity-100" : "opacity-40"}
        `}
      >
        <MoonIcon className="w-4 h-4 text-indigo-300" />
      </span>

      {/* Sliding circle indicator */}
      <span
        className={`
          relative z-10 flex items-center justify-center
          w-6 h-6 rounded-full shadow-md
          transition-transform duration-300 ease-in-out
          ${isDark
            ? "translate-x-8 bg-gray-900"
            : "translate-x-0 bg-white"
          }
        `}
      >
        {isDark
          ? <MoonIcon className="w-3.5 h-3.5 text-indigo-300" />
          : <SunIcon className="w-3.5 h-3.5 text-yellow-500" />
        }
      </span>
    </button>
  );
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.166 17.834a.75.75 0 0 0-1.06 1.06l1.59 1.591a.75.75 0 1 0 1.061-1.06l-1.59-1.591ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.166 6.166a.75.75 0 0 0 1.06 1.06l-1.59-1.59a.75.75 0 0 0-1.061 1.06l1.59 1.59Z" />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
