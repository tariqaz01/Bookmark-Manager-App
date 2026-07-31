"use client"
import { ArchiveIcon, HomeIcon } from "lucide-react"

interface SidebarProps {
  selectedTags?: string[];
  onTagToggle?: (tag: string) => void;
  tags?: { name: string, count: number }[];
  activeView?: 'home' | 'archived';
  onViewChange?: (view: 'home' | 'archived') => void;
  archivedCount?: number;
}

export default function Sidebar({ selectedTags = [], onTagToggle, tags = [], activeView = 'home', onViewChange, archivedCount = 0 }: SidebarProps) {
  

  return (
    <aside className="sidebar-bar w-64 bg-white dark:bg-[#111315] border-r border-gray-100 dark:border-[#292d32] p-4 flex flex-col transition-colors duration-300">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 bg-emerald-800 rounded-lg flex items-center justify-center">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="4" y="4" width="6" height="6" rx="1" fill="white" />
            <rect x="14" y="4" width="6" height="6" rx="1" fill="white" />
            <rect x="4" y="14" width="6" height="6" rx="1" fill="white" />
            <rect x="14" y="14" width="6" height="6" rx="1" fill="white" />
          </svg>
        </div>
        <span className="font-semibold text-gray-900 dark:text-white/90 text-lg">Bookmark Manager</span>
      </div>

      {/* Navigation */}
      <nav className="space-y-1 mb-6">
        <button 
          onClick={() => onViewChange?.('home')}
          className={`w-full flex items-center border cursor-pointer gap-3 px-3 py-2 rounded-lg font-medium transition-colors ${
            activeView === 'home' 
              ? 'border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-400' 
              : 'border-gray-200 dark:border-slate-600 text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-700'
          }`}
        >
          <HomeIcon size={16} />
          Home
        </button>
        <button 
          onClick={() => onViewChange?.('archived')}
          className={`w-full flex items-center border cursor-pointer gap-3 px-3 py-2 rounded-lg transition-colors ${
            activeView === 'archived' 
              ? 'border-amber-200 bg-amber-50 text-amber-700 font-medium dark:border-amber-800 dark:bg-amber-900/30 dark:text-amber-400' 
              : 'border-gray-200 dark:border-slate-600 text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-700'
          }`}
        >
          <ArchiveIcon size={16} />
          Archived
          {archivedCount > 0 && (
            <span className="ml-auto text-xs font-semibold bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full">
              {archivedCount}
            </span>
          )}
        </button>
      </nav>

      {/* Tags */}
      <div className="flex-1 overflow-y-auto">
        <h3 className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-3">
          Tags
        </h3>
        <div className="space-y-1">
          {tags.map((tag) => (
            <label
              key={tag.name}
              className="flex items-center gap-3 px-1 py-1.5 rounded cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
            >
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 accent-emerald-600 dark:accent-emerald-400 cursor-pointer"
                checked={selectedTags.includes(tag.name)}
                onChange={() => onTagToggle?.(tag.name)}
              />
              <span className="flex-1 text-sm text-gray-700 dark:text-slate-300">{tag.name}</span>
              <span className="tag-count text-xs font-medium text-gray-500 dark:text-slate-400 bg-slate-100 dark:bg-[#292d32] px-2 py-0.5 rounded-full">
                {tag.count}
              </span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  )
}
