import { api } from "./client";
import type {
  AuthResponse,
  LoginInput,
  RegisterInput,
  User,
} from "@/lib/types/user";

export function login(input: LoginInput) {
  return api<AuthResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function register(input: RegisterInput) {
  return api<AuthResponse>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function getMe() {
  return api<User>("/api/auth/me");
}
