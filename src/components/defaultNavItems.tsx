// components/layout/defaultNavItems.tsx
import React from "react";
import {
  CalendarIcon,
  FolderIcon,
  HomeIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { NavItem } from "./sidebar";

export const defaultNavItems: NavItem[] = [
  {
    label: "Books",
    href: "/books",
    icon: <HomeIcon className="w-6 h-6" />,
  },
  {
    label: "Authors",
    href: "/authors",
    icon: <UserGroupIcon className="w-6 h-6" />,
  },
  {
    label: "Publishers",
    href: "/publishers",
    icon: <FolderIcon className="w-6 h-6" />,
  },
  {
    label: "Customers",
    href: "/customers",
    icon: <CalendarIcon className="w-6 h-6" />,
  },
];
