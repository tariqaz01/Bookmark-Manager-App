"use client"

import { Eye, Calendar, Star, MoreVertical } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { Bookmark } from "../bookmarks/BookmarkGrid"
  
interface BookmarkCardProps {
  bookmark: Bookmark
  onRemove?: (id: string | number) => void;
  onArchive?: (id: string | number) => void;
  isLoggedIn?: boolean;
  isArchived?: boolean;
}

const tagColors: Record<string, string> = {
  Practice: "bg-[#e8f5f3] dark:bg-[#e8f5f3]/90 text-[#2a9d8f]",
  Learning: "bg-[#fef3c7] dark:bg-[#fef3c7]/90 text-[#b45309]",
  Community: "bg-[#ede9fe] dark:bg-[#ede9fe]/90 text-[#7c3aed]",
  Reference: "bg-[#dbeafe] dark:bg-[#dbeafe]/90 text-[#2563eb]",
  HTML: "bg-[#fee2e2] dark:bg-[#fee2e2]/90 text-[#dc2626]",
  CSS: "bg-[#dbeafe] dark:bg-[#dbeafe]/90 text-[#2563eb]",
  JavaScript: "bg-[#fef9c3] dark:bg-[#fef9c3]/90 text-[#a16207]",
  Framework: "bg-[#d1fae5] dark:bg-[#d1fae5]/90 text-[#059669]",
  Tools: "bg-[#f3e8ff] dark:bg-[#f3e8ff]/90 text-[#9333ea]",
  AI: "bg-[#fce7f3] dark:bg-[#fce7f3]/90 text-[#db2777]",
  Performance: "bg-[#ffedd5] dark:bg-[#ffedd5]/90 text-[#c2410c]",
  Tips: "bg-[#e0e7ff] dark:bg-[#e0e7ff]/90 text-[#4338ca]",
  Tutorial: "bg-[#ccfbf1] dark:bg-[#ccfbf1]/90 text-[#0d9488]",
}

const getTagColors = (tag: string) => {
  if (tagColors[tag]) return tagColors[tag];
  
  const matchedKey = Object.keys(tagColors).find(
    (k) => k.toLowerCase() === tag.toLowerCase()
  );
  if (matchedKey) return tagColors[matchedKey];

  // Dynamic color based on hash of string
  const defaultThemes = [
    "bg-blue-50 text-blue-700 border border-blue-100",
    "bg-purple-50 text-purple-700 border border-purple-100",
    "bg-pink-50 text-pink-700 border border-pink-100",
    "bg-amber-50 text-amber-700 border border-amber-100",
    "bg-emerald-50 text-emerald-700 border border-emerald-100",
    "bg-indigo-50 text-indigo-700 border border-indigo-100",
    "bg-rose-50 text-rose-700 border border-rose-100",
    "bg-cyan-50 text-cyan-700 border border-cyan-100",
  ];
  
  let hash = 0;
  for (let i = 0; i < tag.length; i++) {
    hash = tag.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % defaultThemes.length;
  return defaultThemes[index];
};

const getDomain = (url: string) => {
  try {
    const cleanUrl = url.startsWith("http://") || url.startsWith("https://") 
      ? url 
      : `https://${url}`;
    const urlObj = new URL(cleanUrl);
    return urlObj.hostname;
  } catch (e) {
    return url;
  }
};

export default function Card({ bookmark, onRemove, onArchive, isLoggedIn = false, isArchived = false }: BookmarkCardProps) {
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

  const bookmarkUrl = bookmark.url.startsWith("http://") || bookmark.url.startsWith("https://") 
    ? bookmark.url 
    : `https://${bookmark.url}`;

  return (
    <>
    <div className="bookmark-card bg-white dark:bg-[#1A1D21] rounded-xl border border-gray-100 dark:border-[#292d32] p-4 hover:shadow-md transition-all duration-300">
      
      <div className="flex items-start gap-3 mb-3">
        <a 
          href={bookmarkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold shrink-0 shadow-sm overflow-hidden hover:opacity-90 transition-opacity"
          style={{ backgroundColor: bookmark.iconColor || "#10B981" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://www.google.com/s2/favicons?domain=${getDomain(bookmark.url)}&sz=64`}
            alt={bookmark.title}
            className="w-6 h-6 object-contain bg-white rounded-md p-0.5"
            onError={(e) => {
              const target = e.currentTarget;
              target.style.display = "none";
              const parent = target.parentElement;
              if (parent) {
                parent.innerText = bookmark.title.charAt(0).toUpperCase();
              }
            }}
          />
        </a>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 dark:text-slate-200 truncate hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
            <a href={bookmarkUrl} target="_blank" rel="noopener noreferrer">
              {bookmark.title}
            </a>
          </h3>
          <p className="text-xs text-gray-400 dark:text-slate-500 truncate">
            <a href={bookmarkUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
              {bookmark.url}
            </a>
          </p>
        </div>
        {isLoggedIn && (
        <div className="relative" ref={dropdownRef}>
          <div 
            className="border border-gray-200 dark:border-slate-600 p-1 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors cursor-pointer text-gray-500 dark:text-slate-400"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <MoreVertical size={20}/>
          </div>
          
          {isDropdownOpen && (
            <div className="absolute right-0 mt-1 w-40 bg-white dark:bg-slate-800 rounded-md shadow-lg border border-gray-100 dark:border-slate-700 z-10 overflow-hidden">
              {!isArchived && (
                <button 
                  className="w-full cursor-pointer text-left px-4 py-2 text-sm text-amber-600 hover:bg-amber-50 transition-colors flex items-center gap-2"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    onArchive?.(bookmark.id);
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="21 8 21 21 3 21 3 8"/><rect x="1" y="3" width="22" height="5"/><line x1="10" y1="12" x2="14" y2="12"/></svg>
                  Add to Archive
                </button>
              )}
              {isArchived && (
                <button 
                  className="w-full cursor-pointer text-left px-4 py-2 text-sm text-emerald-600 hover:bg-emerald-50 transition-colors flex items-center gap-2"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    onArchive?.(bookmark.id);
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 9 3 21 21 21 21 9"/><rect x="1" y="3" width="22" height="6"/><line x1="10" y1="12" x2="14" y2="12"/></svg>
                  Unarchive
                </button>
              )}
              {!isArchived && (
                <button 
                  className="w-full cursor-pointer text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    onRemove?.(bookmark.id);
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                  Remove
                </button>
              )}
            </div>
          )}
        </div>
        )}
        
      </div>
      <p className="text-sm text-gray-500 dark:text-slate-400 mb-3 line-clamp-3">
        {bookmark.description}
      </p>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {bookmark.tags.map((tag) => (
          <span
            key={tag}
            className={`text-xs px-2 py-0.5 rounded-full border transition-all ${getTagColors(tag)}`}
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-4 text-xs text-gray-400 dark:text-slate-500 border-t border-gray-100 dark:border-slate-700 pt-3">
        <span className="flex items-center gap-1">
          <Eye className="w-3.5 h-3.5" />
          {bookmark.stats?.views ?? 0}
        </span>
        <span className="flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5" />
          {bookmark.stats?.date ?? "Today"}
        </span>
        <span className="flex items-center gap-1">
          <Star className="w-3.5 h-3.5" />
          {bookmark.stats?.stars ?? 0}
        </span>
      </div>
    </div>
    </>
  )
}
