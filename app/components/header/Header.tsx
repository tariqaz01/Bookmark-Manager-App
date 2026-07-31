"use client"
import Image from "next/image"
import { useState, useEffect } from "react"
import { onAuthStateChanged, signOut, User } from "firebase/auth"
import { auth } from "@/firebase"
import { Search } from "lucide-react"
import Input from "../ui/Input"
import Button from "../ui/Button"
import ThemeToggle from "../ui/ThemeToggle"
import logoutIcon from "@/public/svg/log-out.svg"
import { toast, Toaster } from "sonner"

interface HeaderProps {
  searchQuery?: string;
  onSearchChange?: (val: string) => void;
  onAddClick?: () => void;
  onLoginClick?: () => void;
}

export function Header({ searchQuery = "", onSearchChange, onAddClick, onLoginClick }: HeaderProps = {}) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logout successful", {
        duration: 1000,
      });
      
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed");
    }
  };

  return (
    <div className="header-bar flex items-center gap-4 p-6 justify-between bg-white dark:bg-[#111315] border-b border-gray-100 dark:border-[#292d32] transition-colors duration-300">
  <div className="search-bar flex items-center border border-gray-200 dark:border-[#343941] dark:bg-[#1a1d21] w-[340px] p-2 rounded-lg transition-colors duration-300">
    <Search className="w-5 h-5 text-gray-400 dark:text-gray-500" />
    <Input 
      value={searchQuery}
      onChange={(e) => onSearchChange?.(e.target.value)}
      placeholder="Search by title..."
    />
  </div>
  
  {/* buttons */}
  <div className="flex items-center gap-3">
    <ThemeToggle />
    <Button onClick={onAddClick} />

    {user ? (
      <div className="flex items-center gap-3">
        <div 
          className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-lg shadow-md border-2 border-white dark:border-[#292d32] ring-2 ring-indigo-50 dark:ring-indigo-950"
          title={user.displayName || user.email || "User"}
        >
          {(user.displayName 
            ? user.displayName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() 
            : user.email 
              ? user.email.substring(0, 2).toUpperCase() 
              : "U")}
        </div>

        <button 
          onClick={handleLogout}
          className="p-2.5 bg-gray-50 dark:bg-[#1a1d21] border border-gray-200 dark:border-[#343941] hover:bg-gray-100 dark:hover:bg-[#24282e] rounded-lg transition-colors cursor-pointer flex items-center justify-center"
          title="Logout"
        >
          <Image 
            src={logoutIcon} 
            alt="Logout" 
            width={24}
            height={24}
            sizes="50vw"
            className="w-5 h-5 object-contain opacity-70 hover:opacity-100 transition-opacity dark:invert" 
          />
        </button>
      </div>
    ) : (
      <button 
        onClick={onLoginClick}
        className="px-6 py-3 text-sm cursor-pointer select-none rounded-xl active:scale-[0.98] bg-emerald-700/90 dark:bg-emerald-900/50 text-white dark:text-emerald-100 border-emerald-700/50 shadow-[0_0_20px_-5px_rgba(16,185,129,0.15)] backdrop-blur-md hover:bg-emerald-900/90 hover:border-emerald-500/60 hover:text-white"
      >
        Login / Signup
      </button>
    )}
  </div>
</div>
  )
}
