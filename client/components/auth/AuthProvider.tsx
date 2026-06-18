"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { useCurrentUser, useLogin } from "@/lib/query/auth";
import { clearToken, getToken, setToken } from "@/lib/auth/token";
import type { LoginInput, User } from "@/lib/types/user";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query/query-keys";

type AuthContextValue = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (input: LoginInput) => Promise<void>;
  logout: () => void;
  loginError: string | null;
  isLoggingIn: boolean;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [hasToken, setHasToken] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  useEffect(() => {
    setHasToken(!!getToken());
  }, []);

  const { data: user, isLoading, isError } = useCurrentUser();
  const loginMutation = useLogin();

  useEffect(() => {
    if (hasToken && isError) {
      clearToken();
      setHasToken(false);
      queryClient.removeQueries({ queryKey: queryKeys.auth.me });
    }
  }, [hasToken, isError, queryClient]);

  const login = useCallback(
    async (input: LoginInput) => {
      setLoginError(null);
      try {
        const result = await loginMutation.mutateAsync(input);
        setToken(result.token);
        setHasToken(true);
        router.replace("/");
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "فشل تسجيل الدخول";
        setLoginError(message);
        throw error;
      }
    },
    [loginMutation, router]
  );

  const logout = useCallback(() => {
    clearToken();
    setHasToken(false);
    queryClient.removeQueries({ queryKey: queryKeys.auth.me });
    router.replace("/login");
  }, [queryClient, router]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user: user ?? null,
      isLoading: hasToken && isLoading,
      isAuthenticated: !!user && hasToken,
      login,
      logout,
      loginError,
      isLoggingIn: loginMutation.isPending,
    }),
    [
      user,
      hasToken,
      isLoading,
      login,
      logout,
      loginError,
      loginMutation.isPending,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
