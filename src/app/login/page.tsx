"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function LoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      const from = searchParams.get("from") || "/";
      router.push(from);
      router.refresh();
    } else {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-900">
      <div className="w-full max-w-sm mx-6">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="flex justify-center mb-6">
            <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="48" height="48" rx="10" fill="#102a43" />
              <text x="24" y="31" textAnchor="middle" fill="white" fontSize="18" fontWeight="700" fontFamily="system-ui, sans-serif">HD</text>
            </svg>
          </div>
          <h1 className="text-xl font-semibold text-text-primary text-center mb-1">
            Hotel Distribution
          </h1>
          <p className="text-sm text-text-secondary text-center mb-8">
            Enter the access code to continue
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Access code"
              className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-sm text-text-primary
                         focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent
                         placeholder:text-text-muted"
              autoFocus
            />
            {error && (
              <p className="text-sm text-red-500 text-center">
                Incorrect access code
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-brand-600 text-white text-sm font-semibold rounded-xl
                         hover:bg-brand-700 transition-colors disabled:opacity-50 shadow-sm"
            >
              {loading ? "Verifying…" : "Continue"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
