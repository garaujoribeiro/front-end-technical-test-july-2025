import { LucideIcon, User, UserLock } from "lucide-react";

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
  {
    title: "Usuários com Erro",
    url: "/users-error",
    icon: UserLock,
  },
];
