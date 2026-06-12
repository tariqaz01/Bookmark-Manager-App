"use client"

import { Plus } from "lucide-react";

const Button = () => {
  return (
    <>
      <div className="">
        <button
          className={`inline-flex items-center justify-center gap-2 cursor-pointer rounded-md bg-emerald-800 text-white w-fit py-3.5 px-5`}
        >
          <Plus />
          Add Bookmark
        </button>
      </div>
    </>
  );
};

export default Button;