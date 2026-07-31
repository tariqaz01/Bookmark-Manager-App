"use client"

import { ArrowUpDown, Eye, Calendar, Star, Check } from "lucide-react"
import Card from "../card/Card"
import { useState, useRef, useEffect } from "react"

export const initialBookmarks = [
  {
    id: 1,
    title: "Frontend Mentor",
    url: "frontendmentor.io",
    description:
      "Improve your front-end coding skills by building real projects. Solve real-world HTML, CSS and JavaScript challenges whilst working to professional designs.",
    tags: ["Practice", "Learning", "Community"],
    icon: "frontend-mentor",
    stats: { views: 47, date: "25 Sep", stars: 15 },
    iconColor: "#3F54A3",
  },
  {
    id: 2,
    title: "MDN Web Docs",
    url: "developer.mozilla.org",
    description:
      "The MDN Web Docs site provides information about Open Web technologies including HTML, CSS, and APIs for both Web sites and progressive web apps.",
    tags: ["Reference", "HTML", "CSS", "JavaScript"],
    icon: "mdn",
    stats: { views: 152, date: "24 Sep", stars: 10 },
    iconColor: "#000000",
  },
  {
    id: 3,
    title: "React Docs",
    url: "react.dev",
    description:
      "The library for web and native user interfaces. Build user interfaces out of individual pieces called components.",
    tags: ["JavaScript", "Framework", "Reference"],
    icon: "react",
    stats: { views: 0, date: "Never", stars: 20 },
    iconColor: "#61DAFB",
  },
  {
    id: 4,
    title: "Claude",
    url: "claude.ai",
    description:
      "An AI assistant created by Anthropic that can help with analysis, writing, coding, math, and creative tasks through natural conversation.",
    tags: ["Tools", "AI", "Learning"],
    icon: "claude",
    stats: { views: 23, date: "19 Feb", stars: 18 },
    iconColor: "#D97757",
  },
  {
    id: 5,
    title: "Web.dev",
    url: "web.dev",
    description:
      "Guidance to build modern web experiences that work on any browser. Learn about web vitals, PWAs, and more.",
    tags: ["Performance", "Learning", "Tips"],
    icon: "webdev",
    stats: { views: 18, date: "16 Aug", stars: 15 },
    iconColor: "#1A73E8",
  },
  {
    id: 6,
    title: "Tailwind CSS",
    url: "tailwindcss.com",
    description:
      "A utility-first CSS framework for rapidly building modern websites without ever leaving your HTML.",
    tags: ["CSS", "Framework", "Tools"],
    icon: "tailwind",
    stats: { views: 89, date: "12 Mar", stars: 25 },
    iconColor: "#06B6D4",
  },
  {
    id: 7,
    title: "Dev.to",
    url: "dev.to",
    description:
      "A constructive and inclusive social network for software developers. Share knowledge and grow your career.",
    tags: ["Community", "Learning", "Tips"],
    icon: "devto",
    stats: { views: 34, date: "8 Jan", stars: 12 },
    iconColor: "#000000",
  },
  {
    id: 8,
    title: "JavaScript.info",
    url: "javascript.info",
    description:
      "The Modern JavaScript Tutorial. How it's done now. From the basics to advanced topics with simple, but detailed explanations.",
    tags: ["JavaScript", "Tutorial", "Reference"],
    icon: "jsinfo",
    stats: { views: 67, date: "3 Dec", stars: 22 },
    iconColor: "#F7DF1E",
  },
  {
    id: 9,
    title: "freeCodeCamp",
    url: "freecodecamp.org",
    description:
      "Learn to code for free. Build projects. Earn certifications. An open source community that helps you learn to code with free online courses and certifications.",
    tags: ["Practice", "Learning", "Tutorial"],
    icon: "freecodecamp",
    stats: { views: 156, date: "28 Nov", stars: 30 },
    iconColor: "#0A0A23",
  },
]

export interface Bookmark {
  id: number | string;
  title: string;
  url: string;
  description: string;
  tags: string[];
  icon: string;
  stats?: { views: number; date: string; stars: number };
  iconColor: string;
  archived?: boolean;
}

interface BookmarkGridProps {
  bookmarks: Bookmark[]
  selectedTags?: string[]
  searchQuery?: string
  onRemove?: (id: string | number) => void
  onArchive?: (id: string | number) => void
  isLoggedIn?: boolean
}

type SortOption = {
  label: string;
  value: string;
  icon: React.ReactNode;
}

const sortOptions: SortOption[] = [
  { label: "Title A → Z",   value: "title-asc",   icon: <span className="text-xs font-mono">A↑</span> },
  { label: "Title Z → A",   value: "title-desc",  icon: <span className="text-xs font-mono">Z↓</span> },
  { label: "Most Viewed",   value: "views-desc",  icon: <Eye className="w-3.5 h-3.5" /> },
  { label: "Least Viewed",  value: "views-asc",   icon: <Eye className="w-3.5 h-3.5" /> },
  { label: "Most Starred",  value: "stars-desc",  icon: <Star className="w-3.5 h-3.5" /> },
  { label: "Newest Date",   value: "date-desc",   icon: <Calendar className="w-3.5 h-3.5" /> },
]

export default function BookmarkGrid({ bookmarks, selectedTags = [], searchQuery = "", onRemove, onArchive, isLoggedIn = false }: BookmarkGridProps) {
  const [sortBy, setSortBy] = useState("title-asc");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setIsSortOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredBookmarks = bookmarks.filter((b) => {
    if (b.archived) return false;
    const matchesTags = selectedTags.length > 0 ? b.tags.some((t) => selectedTags.includes(t)) : true;
    const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTags && matchesSearch;
  });

  const sortedBookmarks = [...filteredBookmarks].sort((a, b) => {
    switch (sortBy) {
      case "title-asc":   return a.title.localeCompare(b.title);
      case "title-desc":  return b.title.localeCompare(a.title);
      case "views-desc":  return (b.stats?.views ?? 0) - (a.stats?.views ?? 0);
      case "views-asc":   return (a.stats?.views ?? 0) - (b.stats?.views ?? 0);
      case "stars-desc":  return (b.stats?.stars ?? 0) - (a.stats?.stars ?? 0);
      case "date-desc":   return (b.stats?.date ?? "").localeCompare(a.stats?.date ?? "");
      default: return 0;
    }
  });

  const activeSortLabel = sortOptions.find(o => o.value === sortBy)?.label ?? "Sort by";

  return (
    <div className=" p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white/90">All bookmarks</h1>
        <div className="relative" ref={sortRef}>
          <button
            onClick={() => setIsSortOpen(prev => !prev)}
            className="flex items-center gap-2 text-sm text-gray-500 dark:text-slate-400 hover:text-gray-800 dark:hover:text-slate-200 transition-colors bg-white dark:bg-[#111315] px-3 py-2 rounded-md border border-gray-200 dark:border-[#292d32] cursor-pointer select-none"
          >
            <ArrowUpDown className="w-4 h-4" />
            {activeSortLabel}
          </button>

          {isSortOpen && (
            <div className="absolute right-0 mt-1 w-44 bg-white dark:bg-[#111315] rounded-xl shadow-lg border border-gray-100 dark:border-[#292d32] z-20 overflow-hidden py-1">
              {sortOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => { setSortBy(opt.value); setIsSortOpen(false); }}
                  className={`w-full flex items-center gap-2.5 px-4 py-2 text-sm cursor-pointer transition-colors ${
                    sortBy === opt.value
                      ? "bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400 font-medium"
                      : "text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-[#24282e]"
                  }`}
                >
                  <span className="text-gray-400 dark:text-slate-500">{opt.icon}</span>
                  {opt.label}
                  {sortBy === opt.value && <Check className="w-3.5 h-3.5 ml-auto text-emerald-600 dark:text-emerald-400" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      {sortedBookmarks.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-gray-200 rounded-2xl bg-white/50 text-center">
          <p className="text-gray-500 font-medium mb-1">No bookmarks found</p>
          <p className="text-xs text-muted-foreground max-w-xs mx-auto">
            {selectedTags.length > 0 || searchQuery 
              ? "Try clearing your tag filters or changing your search query." 
              : "Click the 'Add Bookmark' button at the top to save your first link!"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedBookmarks.map((bookmark) => (
            <Card key={bookmark.id} bookmark={bookmark} onRemove={onRemove} onArchive={onArchive} isLoggedIn={isLoggedIn} />
          ))}
        </div>
      )}
    </div>
  )
}




