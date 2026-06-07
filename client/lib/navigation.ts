import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Building2,
  GraduationCap,
  LayoutDashboard,
  UserCheck,
  Users,
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const navItems: NavItem[] = [
  { label: "لوحة التحكم", href: "/", icon: LayoutDashboard },
  { label: "الأقسام", href: "/departments", icon: Building2 },
  { label: "الطلاب", href: "/students", icon: Users },
  { label: "الأساتذة", href: "/instructors", icon: GraduationCap },
  { label: "المقررات", href: "/courses", icon: BookOpen },
  { label: "التسجيلات", href: "/enrollments", icon: UserCheck },
];

const pageTitles: Record<string, string> = {
  "/": "لوحة التحكم",
  "/departments": "الأقسام",
  "/students": "الطلاب",
  "/instructors": "الأساتذة",
  "/courses": "المقررات",
  "/enrollments": "التسجيلات",
};

export function getPageTitle(pathname: string): string {
  if (pageTitles[pathname]) return pageTitles[pathname];

  for (const [path, title] of Object.entries(pageTitles)) {
    if (path !== "/" && pathname.startsWith(path)) return title;
  }

  return "نظام إدارة الجامعة";
}
