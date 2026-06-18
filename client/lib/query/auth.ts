"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { login as loginApi, getMe } from "@/lib/api/auth";
import { queryKeys } from "./query-keys";
import { getToken } from "@/lib/auth/token";
import type { LoginInput } from "@/lib/types/user";

export function useCurrentUser() {
  return useQuery({
    queryKey: queryKeys.auth.me,
    queryFn: getMe,
    enabled: !!getToken(),
    retry: false,
  });
}

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: LoginInput) => loginApi(input),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.auth.me, data.user);
    },
  });
}
