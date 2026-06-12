"use client"
import { Search } from "lucide-react"
import { useState } from "react"
import Input from "../ui/Input"
import Button from "../ui/Button"
import Register from "../login/Login"
import Login from "../register/Register"

interface HeaderProps {
  searchQuery?: string;
  onSearchChange?: (val: string) => void;
}

export function Header({ searchQuery = "", onSearchChange }: HeaderProps = {}) {
  const [activeModal, setActiveModal] = useState<'register' | 'login' | null>(null);

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
      <div className="flex gap-4">
      <Button />

      <button 
        onClick={() => setActiveModal('login')}
        className="px-6 py-3.5 bg-emerald-800 text-white rounded-md hover:bg-green-700 transition-colors cursor-pointer"
      >
        Signup
      </button>
      </div>

      {activeModal === 'register' && <Register onClose={() => setActiveModal(null)} onLoginClick={() => setActiveModal('login')} />}
      {activeModal === 'login' && <Login onClose={() => setActiveModal(null)} onRegisterClick={() => setActiveModal('register')} />}
    </div>
  )
}
