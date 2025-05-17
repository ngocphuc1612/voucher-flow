"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PlusSquare,
  SearchCode,
  UploadCloud,
  Lightbulb,
  Icon,
} from "lucide-react";

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

interface NavItem {
  href: string;
  label: string;
  icon: Icon;
  matchSegments?: number;
}

const navItems: NavItem[] = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard, matchSegments: 1 },
  { href: "/vouchers/generate", label: "Generate Voucher", icon: PlusSquare },
  { href: "/vouchers/lookup", label: "Lookup Voucher", icon: SearchCode },
  { href: "/vouchers/upload", label: "Upload Vouchers", icon: UploadCloud },
  { href: "/distribution", label: "Distribution Strategy", icon: Lightbulb, matchSegments: 1 },
];

export function SidebarNav() {
  const pathname = usePathname();

  const isActive = (href: string, matchSegments?: number) => {
    if (href === "/") {
      return pathname === "/";
    }
    if (matchSegments) {
      const pathSegments = pathname.split("/").filter(Boolean);
      const hrefSegments = href.split("/").filter(Boolean);
      return hrefSegments.every((segment, i) => pathSegments[i] === segment) && pathSegments.length >= hrefSegments.length && pathSegments.length <= matchSegments + hrefSegments.length -1 ;
    }
    return pathname.startsWith(href);
  };

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.label}>
          <Link href={item.href} passHref legacyBehavior>
            <SidebarMenuButton
              asChild
              isActive={isActive(item.href, item.matchSegments)}
              className={cn(
                "justify-start w-full",
                isActive(item.href, item.matchSegments)
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
              tooltip={{ children: item.label, className: "group-data-[collapsible=icon]:block hidden" }}
            >
              <a>
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </a>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
