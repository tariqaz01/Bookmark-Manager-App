"use client"

import Sidebar from "./components/sidebar/Sidebar";
import { Header } from "./components/header/Header";
import BookmarkGrid, { initialBookmarks, Bookmark } from "./components/bookmarks/BookmarkGrid";
import AddBookmarkModal from "./components/bookmarks/AddBookmarkModal";
import Register from "./components/login/Login";
import Login from "./components/register/Register";
import { useState, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { collection, query, where, onSnapshot, addDoc, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "@/firebase";

export default function Home() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeAuthModal, setActiveAuthModal] = useState<'register' | 'login' | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

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

    // Clear previous bookmarks instantly before loading Firestore data
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
      // If user is not logged in/registered, show signup (register) modal
      setActiveAuthModal("register");
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
      } catch (error) {
        console.error("Error adding bookmark to Firestore:", error);
      }
    } else {
      const bookmark: Bookmark = {
        ...newBookmark,
        id: Date.now(),
        stats: { views: 0, date: "Today", stars: 0 },
      };
      setBookmarks((prev) => [bookmark, ...prev]);
    }
  };

  const handleRemoveBookmark = async (id: string | number) => {
    if (user) {
      try {
        await deleteDoc(doc(db, "bookmarks", id as string));
      } catch (error) {
        console.error("Error deleting bookmark:", error);
      }
    }
    // Guest users cannot remove bookmarks — handled at UI level via isLoggedIn prop
  };

  return (
    <>
      <div className="flex min-h-screen">
        <Sidebar selectedTags={selectedTags} onTagToggle={handleTagToggle} />
        <main className="flex-1 bg-green-50">
          <Header
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onAddClick={handleAddClick}
            onLoginClick={() => setActiveAuthModal("login")}
          />

          <BookmarkGrid
            bookmarks={bookmarks}
            selectedTags={selectedTags}
            searchQuery={searchQuery}
            onRemove={handleRemoveBookmark}
            isLoggedIn={!!user}
          />
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
