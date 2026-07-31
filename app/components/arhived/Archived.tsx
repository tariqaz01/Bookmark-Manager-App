"use client";

import { Bookmark } from "../bookmarks/BookmarkGrid";
import Card from "../card/Card";

interface ArchiveGridProps {
  bookmarks: Bookmark[]
  onUnarchive?: (id: string | number) => void
  isLoggedIn?: boolean
}


export default function ArchiveGrid({ bookmarks, onUnarchive, isLoggedIn = false }: ArchiveGridProps) {
  const archivedBookmarks = bookmarks.filter((b) => b.archived);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold text-foreground dark:text-white/90">Archived bookmarks</h1>
        <span className="text-sm text-muted-foreground bg-white px-3 py-1.5 rounded-full border border-gray-200 dark:text-white/90 dark:bg-[#111315]">
          {archivedBookmarks.length} item{archivedBookmarks.length !== 1 ? 's' : ''}
        </span>
      </div>
      {archivedBookmarks.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-gray-200 dark:border-[#292d32] rounded-2xl dark:bg-[#111315]/50 text-center">
          <p className="text-gray-500 font-medium mb-1 dark:text-white/90">No archived bookmarks</p>
          <p className="text-xs text-muted-foreground max-w-xs mx-auto dark:text-white/90">
            Archive bookmarks from the three-dot menu on any card.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {archivedBookmarks.map((bookmark) => (
            <Card key={bookmark.id} bookmark={bookmark} onArchive={onUnarchive} isLoggedIn={isLoggedIn} isArchived />
          ))}
        </div>
      )}
    </div>
  )
}