"use client";

import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { sidebarOptions } from "@/utils/sidebar-options";
import Image from "next/image";
import Logo from "../../../../public/assets/logo.png";
import { NavMain } from "./nav-main";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-4">
            <Image
              className="aspect-square max-w-12.5"
              src={Logo}
              alt="Logo da Match Sales"
            />

            <h1 className="font-light text-2xl">Match Sales</h1>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sidebarOptions} />
      </SidebarContent>
    </Sidebar>
  );
}
