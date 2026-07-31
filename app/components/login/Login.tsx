import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/firebase";
import { toast } from "sonner";

interface RegisterProps {
  onClose: () => void;
  onLoginClick: () => void;
}

const getErrorMessage = (code: string): string => {
  switch (code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Incorrect email or password. Please try again.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/user-disabled":
      return "This account has been disabled. Contact support.";
    case "auth/too-many-requests":
      return "Too many failed attempts. Please try again later.";
    case "auth/network-request-failed":
      return "Network error. Please check your internet connection.";
    case "auth/popup-closed-by-user":
      return "Sign-in was cancelled. Please try again.";
    default:
      return "Something went wrong. Please try again.";
  }
};

export default function Register({ onClose, onLoginClick }: RegisterProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful!", {
        duration: 2000,
      });
      onClose();
    } catch (err: any) {
      setError(getErrorMessage(err.code));
      toast.error(getErrorMessage(err.code), {
        duration: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setGoogleLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        toast.success("Login successful!", {
          duration: 2000,
        });
        onClose();
      }
    } catch (err: any) {
      setError(getErrorMessage(err.code));
      toast.error(getErrorMessage(err.code), {
        duration: 2000,
      });
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center backdrop-blur-sm justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-white rounded-lg shadow mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-600 cursor-pointer hover:text-zinc-800"
        >
          ✕
        </button>
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <div className="flex items-center justify-center mb-2">
            <span className="flex items-center text-2xl font-semibold text-gray-900 ">
              Login
            </span>
          </div>
          
          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-200">
              {error}
            </div>
          )}

          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit} autoComplete="off">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 outline-none"
                placeholder="name@company.com"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 outline-none"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full text-white bg-emerald-800 hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer transition-colors disabled:opacity-55"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Don't have an account? <button type="button" onClick={onLoginClick} className="font-medium text-emerald-600 hover:underline dark:text-emerald-500 cursor-pointer">Register here</button>
            </p>
            <div className="flex items-center justify-between mt-4">
              <span className="w-1/5 border-b lg:w-full border-gray-200"></span>
              <span className="text-xs text-center text-zinc-400 uppercase mx-1">or</span>
              <span className="w-1/5 border-b lg:w-full border-gray-200"></span>
            </div>
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={googleLoading}
              className="flex items-center justify-center w-full px-4 py-2 mt-4 space-x-3 text-sm text-center text-gray-600 transition-colors duration-200 transform border rounded-lg hover:bg-gray-50 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {googleLoading ? (
                <svg className="w-5 h-5 animate-spin text-gray-400" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
              )}
              <span>{googleLoading ? "Redirecting..." : "Continue with Google"}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}