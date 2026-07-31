"use client"

import Sidebar from "./components/sidebar/Sidebar";
import { Header } from "./components/header/Header";
import BookmarkGrid, { initialBookmarks, Bookmark } from "./components/bookmarks/BookmarkGrid";
import ArchiveGrid from "./components/arhived/Archived";
import AddBookmarkModal from "./components/bookmarks/AddBookmarkModal";
import Register from "./components/login/Login";
import Login from "./components/register/Register";
import { useState, useEffect, useMemo } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { collection, query, where, onSnapshot, addDoc, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "@/firebase";
import { toast } from "sonner";

export default function Home() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeAuthModal, setActiveAuthModal] = useState<'login' | 'register' | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [activeView, setActiveView] = useState<'home' | 'archived'>('home');

  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    bookmarks.filter(b => !b.archived).forEach((bookmark) => {
      if (bookmark.tags) {
        bookmark.tags.forEach((tag) => {
          counts[tag] = (counts[tag] || 0) + 1;
        });
      }
    });
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [bookmarks]);

  const archivedCount = useMemo(() => bookmarks.filter(b => b.archived).length, [bookmarks]);

  // Listen to Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Listen to Firestore Bookmarks or fallback to default bookmarks
  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      setBookmarks(initialBookmarks);
      return;
    }

    
    setBookmarks([]);

    const q = query(
      collection(db, "bookmarks"),
      where("userId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs: Bookmark[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        docs.push({
          id: doc.id,
          title: data.title,
          url: data.url,
          description: data.description,
          tags: data.tags || [],
          icon: data.icon || "default",
          iconColor: data.iconColor || "#3F54A3",
          stats: data.stats || { views: 0, date: "Today", stars: 0 },
          archived: data.archived || false,
        });
      });
      setBookmarks(docs);
    }, (error) => {
      console.error("Firestore listener error:", error);
    });

    return () => unsubscribe();
  }, [user, authLoading]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleAddClick = () => {
    if (!user) {
      setActiveAuthModal("login");
    } else {
      setIsAddModalOpen(true);
    }
  };

  const handleAddBookmark = async (newBookmark: Omit<Bookmark, "id" | "stats">) => {
    if (user) {
      try {
        await addDoc(collection(db, "bookmarks"), {
          ...newBookmark,
          userId: user.uid,
          createdAt: new Date().toISOString(),
          stats: { views: 0, date: "Today", stars: 0 },
        });
        toast.success("Bookmark added successfully");
      } catch (error) {
        console.error("Error adding bookmark to Firestore:", error);
        toast.error("Failed to add bookmark");
      }
    } else {
      const bookmark: Bookmark = {
        ...newBookmark,
        id: Date.now(),
        stats: { views: 0, date: "Today", stars: 0 },
      };
      setBookmarks((prev) => [bookmark, ...prev]);
      toast.success("Bookmark added locally");
    }
  };

  const handleRemoveBookmark = async (id: string | number) => {
    if (user) {
      try {
        await deleteDoc(doc(db, "bookmarks", id as string));
        toast.success("Bookmark deleted successfully");
      } catch (error) {
        console.error("Error deleting bookmark:", error);
        toast.error("Failed to delete bookmark");
      }
    }
  };

  const handleArchiveBookmark = async (id: string | number) => {
    if (user) {
      try {
        const { updateDoc, doc: firestoreDoc } = await import("firebase/firestore");
        const bookmark = bookmarks.find(b => b.id === id);
        await updateDoc(firestoreDoc(db, "bookmarks", id as string), { archived: !bookmark?.archived });
        if (bookmark?.archived) {
          toast.success("Bookmark unarchived successfully", {
            duration: 2000,
          });

        } else {
          toast.success("Bookmark archived successfully", {
            duration: 2000,
          });
        }
      } catch (error) {
        console.error("Error archiving bookmark:", error);
        toast.error("Failed to update bookmark status");
      }
    } else {
      setBookmarks(prev => prev.map(b => b.id === id ? { ...b, archived: !b.archived } : b));
      const bookmark = bookmarks.find(b => b.id === id);
      if (bookmark?.archived) {
        toast.success("Bookmark unarchived locally", {
          duration: 2000,
        });
      } else {
        toast.success("Bookmark archived locally", {
          duration: 2000,
        });
      }
    }
  };

  return (
    <>
      <div className="flex min-h-screen">
        <Sidebar 
          selectedTags={selectedTags} 
          onTagToggle={handleTagToggle} 
          tags={tagCounts}
          activeView={activeView}
          onViewChange={setActiveView}
          archivedCount={archivedCount}
        />
        <main className="main-bg flex-1 bg-pink-50 dark:bg-[#111315] transition-colors duration-300">
          <Header
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onAddClick={handleAddClick}
            onLoginClick={() => setActiveAuthModal("login")}
          />

          {activeView === 'home' ? (
            <BookmarkGrid
              bookmarks={bookmarks}
              selectedTags={selectedTags}
              searchQuery={searchQuery}
              onRemove={handleRemoveBookmark}
              onArchive={handleArchiveBookmark}
              isLoggedIn={!!user}
            />
          ) : (
            <ArchiveGrid
              bookmarks={bookmarks}
              onUnarchive={handleArchiveBookmark}
              isLoggedIn={!!user}
            />
          )}
        </main>
      </div>

      {isAddModalOpen && (
        <AddBookmarkModal
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddBookmark}
        />
      )}

      {activeAuthModal === "register" && (
        <Register
          onClose={() => setActiveAuthModal(null)}
          onLoginClick={() => setActiveAuthModal("login")}
        />
      )}

      {activeAuthModal === "login" && (
        <Login
          onClose={() => setActiveAuthModal(null)}
          onRegisterClick={() => setActiveAuthModal("register")}
        />
      )}
    </>
  );
}
