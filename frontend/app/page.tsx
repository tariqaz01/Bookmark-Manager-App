"use client"

import Image from "next/image";
import Sidebar from "./components/sidebar/Sidebar";
import { Header } from "./components/header/Header";
import BookmarkGrid from "./components/bookmarks/BookmarkGrid";
import { useState } from "react";

export default function Home() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <>
    <div className="flex min-h-screen">
      <Sidebar selectedTags={selectedTags} onTagToggle={handleTagToggle} />
      <main className="flex-1 bg-green-50">
        <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <BookmarkGrid selectedTags={selectedTags} searchQuery={searchQuery} />
      </main>
    </div>
   

   </>
  );
}
