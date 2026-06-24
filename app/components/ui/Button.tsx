"use client"

import { Plus } from "lucide-react";

interface ButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
}

const Button = ({ onClick, children }: ButtonProps) => {
  return (
    <>
      <div className="">
        <button
          onClick={onClick}
          className="inline-flex items-center justify-center gap-2 cursor-pointer rounded-md bg-emerald-800 text-white w-fit py-3.5 px-5 hover:bg-emerald-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          {children || "Add Bookmark"}
        </button>
      </div>
    </>
  );
};

export default Button;