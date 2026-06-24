"use client"

import React, { useState } from "react";
import { X, Tag, Link2, Type, FileText, Palette } from "lucide-react";

interface AddBookmarkModalProps {
  onClose: () => void;
  onAdd?: (bookmark: {
    title: string;
    url: string;
    description: string;
    tags: string[];
    iconColor: string;
    icon: string;
  }) => void;
}

const PRESET_COLORS = [
  "#3F54A3", // Indigo
  "#000000", // Black
  "#61DAFB", // Cyan/React
  "#D97757", // Terracotta
  "#1A73E8", // Blue
  "#06B6D4", // Teal
  "#10B981", // Emerald
  "#EC4899", // Pink
  "#F59E0B", // Amber
];

export default function AddBookmarkModal({ onClose, onAdd }: AddBookmarkModalProps) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [iconColor, setIconColor] = useState(PRESET_COLORS[0]);
  const [icon, setIcon] = useState("default");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !url.trim()) return;

    // Process tags
    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t !== "");

    if (onAdd) {
      onAdd({
        title,
        url,
        description,
        tags,
        iconColor,
        icon,
      });
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col max-h-[90vh] overflow-hidden transform transition-all scale-100 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span className="p-1.5 bg-emerald-50 rounded-lg text-emerald-700">
              <Link2 className="w-5 h-5" />
            </span>
            Add New Bookmark
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
              <Type className="w-4 h-4 text-gray-400" />
              Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Next.js Documentation"
              className="w-full bg-gray-50/50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 block p-3 outline-none transition-all"
            />
          </div>

          {/* URL */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
              <Link2 className="w-4 h-4 text-gray-400" />
              URL <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="e.g. nextjs.org/docs"
              className="w-full bg-gray-50/50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 block p-3 outline-none transition-all"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-gray-400" />
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of the bookmark..."
              rows={3}
              className="w-full bg-gray-50/50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 block p-3 outline-none transition-all resize-none"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
              <Tag className="w-4 h-4 text-gray-400" />
              Tags
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="e.g. Reference, React, Tools (comma-separated)"
              className="w-full bg-gray-50/50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 block p-3 outline-none transition-all"
            />
            <p className="mt-1 text-xs text-gray-400">Separate multiple tags with commas</p>
          </div>

          {/* Icon Color Picker presets */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
              <Palette className="w-4 h-4 text-gray-400" />
              Theme Color
            </label>
            <div className="flex flex-wrap gap-2.5 mt-1">
              {PRESET_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setIconColor(color)}
                  className={`w-7 h-7 rounded-full cursor-pointer transition-all ${
                    iconColor === color
                      ? "ring-2 ring-emerald-500 ring-offset-2 scale-110"
                      : "hover:scale-105"
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-emerald-800 text-white text-sm font-medium hover:bg-emerald-700 transition-colors cursor-pointer"
            >
              Create Bookmark
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
