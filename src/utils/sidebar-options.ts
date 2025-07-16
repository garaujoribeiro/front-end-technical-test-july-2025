import { LucideIcon, User } from "lucide-react";

export interface SidebarOption {
  title: string;
  url: string;
  icon: LucideIcon;
}

export const sidebarOptions: SidebarOption[] = [
  {
    title: "Usuários",
    url: "/",
    icon: User,
  },
];
