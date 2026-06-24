"use client"
import { Search } from "lucide-react"
import { useState, useEffect } from "react"
import { onAuthStateChanged, signOut, User } from "firebase/auth"
import { auth } from "@/firebase"
import Input from "../ui/Input"
import Button from "../ui/Button"
import Register from "../login/Login"
import Login from "../register/Register"

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
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex items-center gap-4  p-6 justify-between bg-white">
      <div className="flex items-center border border-gray-200 w-[340px] p-2 rounded-lg">
        <Search className="w-5 h-5" />
        <Input 
          value={searchQuery}
          onChange={(e) => onSearchChange?.(e.target.value)}
          placeholder="Search by title..."
        />
      </div>
      
      {/* buttons */}
      <div className="flex items-center gap-4">
      <Button onClick={onAddClick} />

      {user ? (
        <div className="flex items-center gap-3">
          <span className=" text-white bg-blue-400 w-14 h-14 flex items-center justify-center rounded-full border border-gray-200">
            {user.displayName || user.email}
          </span>
          <button 
            onClick={handleLogout}
            className="p-2.5 bg-gray-50 border border-gray-200 hover:bg-gray-100  rounded-lg transition-colors cursor-pointer flex items-center justify-center"
            title="Logout"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/svg/log-out.svg" 
              alt="Logout" 
              className="w-5 h-5 object-contain opacity-70 hover:opacity-100 transition-opacity" 
            />
          </button>
        </div>
      ) : (
        <button 
          onClick={onLoginClick}
          className="px-6 py-3.5 bg-emerald-800 text-white rounded-md hover:bg-emerald-700 transition-colors cursor-pointer"
        >
          Login / Signup
        </button>
      )}
      </div>
    </div>
  )
}
