"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [email, setEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setEmail(payload.email);
      } catch {
        setEmail(null);
      }
    } else {
      setEmail(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-200 via-purple-200 to-pink-200 animate-gradient-x">
      <div className="bg-white/90 rounded-3xl shadow-2xl p-10 max-w-lg w-full border-2 border-purple-300 flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-purple-400 to-pink-400 flex items-center justify-center mb-6 shadow-lg">
          <svg
            className="w-14 h-14 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h2 className="text-4xl font-bold text-purple-700 mb-2 text-center">
          Welcome to your Profile!
        </h2>
        <p className="text-lg text-gray-700 mb-6 text-center">
          {email ? (
            <>Logged in as <span className="font-semibold text-purple-600">{email}</span></>
          ) : (
            <>You are logged in.</>
          )}
        </p>
        <button
          className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold text-lg shadow-md hover:from-purple-500 hover:to-pink-500 transition-all"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <style>{`
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 8s ease-in-out infinite;
        }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  );
}