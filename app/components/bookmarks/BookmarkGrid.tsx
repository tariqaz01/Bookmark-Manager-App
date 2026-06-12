"use client"

import { ArrowUpDown, Eye, Calendar, Star } from "lucide-react"
import Card from "../card/Card"

const bookmarks = [
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

interface BookmarkGridProps {
  selectedTags?: string[]
  searchQuery?: string
}

export default function BookmarkGrid({ selectedTags = [], searchQuery = "" }: BookmarkGridProps) {
  const filteredBookmarks = bookmarks.filter((b) => {
    const matchesTags = selectedTags.length > 0 ? b.tags.some((t) => selectedTags.includes(t)) : true;
    const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTags && matchesSearch;
  });

  return (
    <div className=" p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold text-foreground">All bookmarks</h1>
        <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors bg-white p-2 rounded-md border border-gray-200 cursor-pointer">
          <ArrowUpDown className="w-4 h-4" />
          Sort by
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBookmarks.map((bookmark) => (
          <Card key={bookmark.id} bookmark={bookmark} />
        ))}
      </div>
    </div>
  )
}
