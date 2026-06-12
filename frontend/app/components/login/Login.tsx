import Image from "next/image";
import Link from "next/link";

interface RegisterProps {
  onClose: () => void;
  onLoginClick: () => void;
}

export default function Register({ onClose, onLoginClick }: RegisterProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-white rounded-lg shadow mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-600"
        >
          ✕
        </button>
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <div className="flex items-center justify-center mb-2">
            <span className="flex items-center text-2xl font-semibold text-gray-900 ">
              Login
            </span>
          </div>
          
          <form className="space-y-4 md:space-y-6" action="#" autoComplete="off">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
              <input type="email" name="email" id="email" autoComplete="off" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
              <input type="password" name="password" id="password" autoComplete="new-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
           
            
            <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create an account</button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Don't have an account? <button type="button" onClick={onLoginClick} className="font-medium text-blue-600 hover:underline dark:text-blue-500 cursor-pointer">Register here</button>
            </p>
          </form>
        </div>


      </div>
    </div>
  );
}