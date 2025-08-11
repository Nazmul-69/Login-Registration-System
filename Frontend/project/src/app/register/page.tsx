"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const res = await axios.post("http://localhost:3000/auth/register", {
        email,
        password,
      });
      setMessage(res.data.message || "Registration successful!");
      if (res.data.message === "Registration successful") {
        setTimeout(() => {
          router.push("/login");
        }, 1000);
      }
    } catch (err: any) {
      setMessage(
        err.response?.data?.message || "Registration failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary/20 via-base-200 to-secondary/20 animate-gradient-x">
      <div className="card w-full max-w-md shadow-2xl bg-base-100/90 backdrop-blur-md border border-primary/30">
        <div className="card-body">
          <h2 className="card-title text-3xl font-extrabold text-primary mb-4 text-center">Register</h2>
          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="input input-bordered w-full"
            />
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              required
              minLength={6}
              maxLength={32}
              className="input input-bordered w-full"
            />
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full"
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : "Register"}
            </button>
            {message && (
              <div className={`alert ${message.includes("success") ? "alert-success" : "alert-error"} mt-2`}>
                {message}
              </div>
            )}
          </form>
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="btn btn-link w-full mt-4"
          >
            Already have an account? Login
          </button>
        </div>
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