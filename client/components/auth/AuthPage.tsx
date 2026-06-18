"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/components/auth/AuthProvider";
import { register } from "@/lib/api/auth";
import { setToken } from "@/lib/auth/token";
import { queryKeys } from "@/lib/query/query-keys";
import { ApiError } from "@/lib/api/client";

const input = "mt-1 w-full rounded border px-3 py-2";
const btn = "w-full rounded bg-zinc-900 py-2 text-white disabled:opacity-60";

export function LoginPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const { login, loginError, isLoggingIn } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="flex min-h-screen items-center justify-center" />;
  }

  const switchMode = (next: "login" | "register") => {
    setMode(next);
    setError(null);
  };

  if (mode === "register") {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <form
          className="w-full max-w-sm space-y-3"
          onSubmit={async (e) => {
            e.preventDefault();
            setError(null);
            setPending(true);
            const f = new FormData(e.currentTarget);
            try {
              const result = await register({
                name: String(f.get("name") ?? "").trim(),
                email: String(f.get("email") ?? "").trim(),
                password: String(f.get("password") ?? ""),
              });
              setToken(result.token);
              queryClient.setQueryData(queryKeys.auth.me, result.user);
              router.replace("/");
            } catch (err) {
              setError(
                err instanceof ApiError ? err.message : "فشل إنشاء الحساب"
              );
            } finally {
              setPending(false);
            }
          }}
        >
          <h1 className="text-xl font-semibold">إنشاء حساب</h1>
          <label className="block text-sm">
            الاسم
            <input name="name" required className={input} />
          </label>
          <label className="block text-sm">
            البريد
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              className={input}
            />
          </label>
          <label className="block text-sm">
            كلمة المرور
            <input
              name="password"
              type="password"
              required
              minLength={6}
              autoComplete="new-password"
              className={input}
            />
          </label>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button type="submit" disabled={pending} className={btn}>
            {pending ? "..." : "إنشاء حساب"}
          </button>
          <button
            type="button"
            onClick={() => switchMode("login")}
            className="w-full text-sm underline"
          >
            تسجيل الدخول
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <form
        className="w-full max-w-sm space-y-3"
        onSubmit={async (e) => {
          e.preventDefault();
          const f = new FormData(e.currentTarget);
          await login({
            email: String(f.get("email") ?? "").trim(),
            password: String(f.get("password") ?? ""),
          });
        }}
      >
        <h1 className="text-xl font-semibold">تسجيل الدخول</h1>
        <label className="block text-sm">
          البريد
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className={input}
          />
        </label>
        <label className="block text-sm">
          كلمة المرور
          <input
            name="password"
            type="password"
            required
            minLength={6}
            autoComplete="current-password"
            className={input}
          />
        </label>
        {loginError && <p className="text-sm text-red-600">{loginError}</p>}
        <button type="submit" disabled={isLoggingIn} className={btn}>
          {isLoggingIn ? "..." : "دخول"}
        </button>
        <button
          type="button"
          onClick={() => switchMode("register")}
          className="w-full text-sm underline"
        >
          إنشاء حساب
        </button>
      </form>
    </div>
  );
}
