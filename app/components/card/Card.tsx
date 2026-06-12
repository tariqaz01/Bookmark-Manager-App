"use client"

import { Eye, Calendar, Star, MoreVertical } from "lucide-react"
import { useState, useRef, useEffect } from "react"

interface BookmarkCardProps {
  bookmark: {
    id: number
    title: string
    url: string
    description: string
    tags: string[]
    icon: string
    stats: { views: number; date: string; stars: number }
    iconColor: string
  }
}

const tagColors: Record<string, string> = {
  Practice: "bg-[#e8f5f3] text-[#2a9d8f]",
  Learning: "bg-[#fef3c7] text-[#b45309]",
  Community: "bg-[#ede9fe] text-[#7c3aed]",
  Reference: "bg-[#dbeafe] text-[#2563eb]",
  HTML: "bg-[#fee2e2] text-[#dc2626]",
  CSS: "bg-[#dbeafe] text-[#2563eb]",
  JavaScript: "bg-[#fef9c3] text-[#a16207]",
  Framework: "bg-[#d1fae5] text-[#059669]",
  Tools: "bg-[#f3e8ff] text-[#9333ea]",
  AI: "bg-[#fce7f3] text-[#db2777]",
  Performance: "bg-[#ffedd5] text-[#c2410c]",
  Tips: "bg-[#e0e7ff] text-[#4338ca]",
  Tutorial: "bg-[#ccfbf1] text-[#0d9488]",
}

export default function Card({ bookmark }: BookmarkCardProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
    <div className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-shadow">
      
      <div className="flex items-start gap-3 mb-3">
        <span>BKicon</span>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate">
            {bookmark.title}
          </h3>
          <p className="text-xs text-muted-foreground truncate">
            {bookmark.url}
          </p>
        </div>
        <div className="relative" ref={dropdownRef}>
          <div 
            className="border border-gray-200 p-1 rounded-lg hover:bg-gray-50 transition-colors"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <MoreVertical size={20}/>
          </div>
          
          {isDropdownOpen && (
            <div className="absolute right-0 mt-1 w-32 bg-white rounded-md shadow-lg border border-gray-100 z-10">
              <button 
                className="w-full cursor-pointer text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                onClick={() => {
                  setIsDropdownOpen(false);
                  // Add remove logic here in the future
                }}
              >
                Remove
              </button>
            </div>
          )}
        </div>
        
      </div>
      <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
        {bookmark.description}
      </p>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {bookmark.tags.map((tag) => (
          <span
            key={tag}
            className={`text-xs px-2 py-0.5 rounded-full ${tagColors[tag] || "bg-muted text-muted-foreground"}`}
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-4 text-xs text-muted-foreground border-t border-gray-200 pt-3">
        <span className="flex items-center gap-1">
          <Eye className="w-3.5 h-3.5" />
          {bookmark.stats.views}
        </span>
        <span className="flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5" />
          {bookmark.stats.date}
        </span>
        <span className="flex items-center gap-1">
          <Star className="w-3.5 h-3.5" />
          {bookmark.stats.stars}
        </span>
      </div>
    </div>
    </>
  )
}
