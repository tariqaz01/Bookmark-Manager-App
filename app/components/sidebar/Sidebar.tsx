"use client"
import { ArchiveIcon, HomeIcon } from "lucide-react"

const tags = [
  { name: "AI", count: 1 },
  { name: "Community", count: 2 },
  { name: "Compatibility", count: 1 },
  { name: "CSS", count: 2 },
  { name: "Design", count: 1 },
  { name: "Framework", count: 2 },
  { name: "Git", count: 1 },
  { name: "HTML", count: 2 },
  { name: "JavaScript", count: 3 },
  { name: "Layout", count: 1 },
  { name: "Learning", count: 6 },
  { name: "Performance", count: 2 },
  { name: "Practice", count: 5 },
  { name: "Reference", count: 5 },
  { name: "Tips", count: 4 },
  { name: "Tools", count: 2 },
  { name: "Tutorial", count: 3 },
]

interface SidebarProps {
  selectedTags?: string[];
  onTagToggle?: (tag: string) => void;
}

export default function Sidebar({ selectedTags = [], onTagToggle }: SidebarProps) {
  

  return (
    <aside className="w-64 bg-white border-r border-e-gray-200 p-4 flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 bg-green-800 rounded-lg flex items-center justify-center">
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
        <span className="font-semibold text-foreground text-lg">Bookmark Manager</span>
      </div>

      {/* Navigation */}
      <nav className="space-y-1 mb-6">
        <button className="w-full flex items-center border border-gray-200 cursor-pointer gap-3 px-3 py-2 rounded-lg bg-accent text-accent-foreground font-medium">
          <HomeIcon size={16} />
          Home
        </button>
        <button className="w-full flex items-center border border-gray-200 cursor-pointer gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-muted transition-colors">
          <ArchiveIcon size={16} />
          Archived
        </button>
      </nav>

      {/* Tags */}
      <div className="flex-1 overflow-y-auto">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Tags
        </h3>
        <div className="space-y-1">
          {tags.map((tag) => (
            <label
              key={tag.name}
              className="flex items-center gap-3 px-1 py-1.5 rounded cursor-pointer hover:bg-muted transition-colors"
            >
              <input
                type="checkbox"
                className="h-4 w-4 border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                checked={selectedTags.includes(tag.name)}
                onChange={() => onTagToggle?.(tag.name)}
              />
              <span className="flex-1 text-sm text-foreground">{tag.name}</span>
              <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full bg-slate-200">
                {tag.count}
              </span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  )
}
