"use client"
export default function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type="text"
      data-slot="input"
      className={
        `h-8 w-full rounded-md bg-transparent px-3 py-1 text-base border-0 outline-0 placeholder:text-zinc-800 placeholder:text-sm `
      }
      {...props}
    />
  )
}

